import {
  defaultMockUser,
  mockUsersList,
  mockPackagesList,
  mockCourseCategories,
  mockCoursesList,
  mockMentorsList,
  mockBlogsList,
  mockCommentsList,
  mockBookingsList,
  mockSubscriptionsList,
  mockApplicationsList,
  mockMentorApplicationsList,
  mockMentorDocumentsList,
  mockNetworkCoursesList,
  mockCourseTreeData,
  mockPaymentsList,
  mockContactMessagesList,
  mockMemoryStats,
  mockEmailStats,
  mockScholarshipsList,
  mockScholarshipComments,
  mockCatalogFixedServices,
  mockCatalogEssayRates,
  mockCatalogMentorshipPackages,
  mockCatalogApplicationPackages,
  mockCollegeOrdersList,
  mockCollegePaymentsList,
} from "./mockData.js";

const STORAGE_KEY_PREFIX = "negus_mock_";

function getStorageItem(key, defaultValue) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Mock storage read error:", err);
  }
  return defaultValue;
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn("Mock storage write error:", err);
  }
}

// Ensure default session exists in localStorage so the user can immediately experience the app
export function initMockStorage() {
  if (typeof window === "undefined") return;

  try {
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      localStorage.setItem("token", "mock-negus-jwt-token-verified");
      setStorageItem("user", defaultMockUser);
    } else {
      const storedUser = getStorageItem("user", null);
      if (!storedUser) {
        setStorageItem("user", defaultMockUser);
      }
    }

    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}packages`)) {
      setStorageItem("packages", mockPackagesList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}courses`)) {
      setStorageItem("courses", mockCoursesList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}mentors`)) {
      setStorageItem("mentors", mockMentorsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}blogs`)) {
      setStorageItem("blogs", mockBlogsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}comments`)) {
      setStorageItem("comments", mockCommentsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}applications`)) {
      setStorageItem("applications", mockApplicationsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}bookings`)) {
      setStorageItem("bookings", mockBookingsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}scholarships`)) {
      setStorageItem("scholarships", mockScholarshipsList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}college_orders`)) {
      setStorageItem("college_orders", mockCollegeOrdersList);
    }
    if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}college_payments`)) {
      setStorageItem("college_payments", mockCollegePaymentsList);
    }
  } catch (err) {
    console.warn("initMockStorage error:", err);
  }
}

// Helper to check if mock mode is active
export function isMockEnabled() {
  // Always true for standalone frontend deployment unless explicitly disabled via VITE_ENABLE_MOCK=false
  if (import.meta.env.VITE_ENABLE_MOCK === "false") {
    return false;
  }
  return true;
}

// Core dispatcher for Axios and Fetch
export async function dispatchMockApi(method, rawUrl, body = null, params = {}) {
  // Normalize method
  const upperMethod = (method || "GET").toUpperCase();

  // Strip origin or /api prefix to get the endpoint path
  let path = rawUrl || "";
  try {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      const parsed = new URL(path);
      path = parsed.pathname;
    }
  } catch {
    // Keep path as is
  }

  // Remove leading /api if present
  path = path.replace(/^\/api\/?/, "/");
  if (!path.startsWith("/")) path = `/${path}`;

  // Strip query string for path matching
  const [cleanPath, queryString] = path.split("?");
  const queryParams = { ...params };
  if (queryString) {
    const sp = new URLSearchParams(queryString);
    for (const [k, v] of sp.entries()) {
      queryParams[k] = v;
    }
  }

  // Small network delay simulation (40-120ms) for ultra-realistic UI feedback
  await new Promise((r) => setTimeout(r, 60));

  // ----------------------------------------------------
  // 1. AUTH & USERS
  // ----------------------------------------------------
  if (cleanPath === "/users/me" && upperMethod === "GET") {
    const token = localStorage.getItem("token");
    if (!token) {
      const err = new Error("Unauthorized");
      err.response = { status: 401, data: { message: "Not authenticated" } };
      throw err;
    }
    const user = getStorageItem("user", defaultMockUser);
    return { data: user, status: 200 };
  }

  if (cleanPath === "/users/login" && upperMethod === "POST") {
    const email = body?.email || "abebe.bikila@gmail.com";
    const user = {
      ...defaultMockUser,
      email,
      first_name: email.split("@")[0].split(".")[0] || "Scholar",
    };
    const token = "mock-negus-jwt-token-verified";
    localStorage.setItem("token", token);
    setStorageItem("user", user);
    return {
      status: 200,
      data: {
        success: true,
        token,
        user,
      },
    };
  }

  if (cleanPath === "/users/register" && upperMethod === "POST") {
    const newUser = {
      id: `usr_${Date.now()}`,
      first_name: body?.first_name || "Scholar",
      last_name: body?.last_name || "Applicant",
      email: body?.email || "abebe.bikila@gmail.com",
      role: body?.role || "admin",
      profile_image: defaultMockUser.profile_image,
      subscription_status: true,
      subscription_end_date: "2030-12-31T23:59:59.000Z",
      is_verified: true,
      created_at: new Date().toISOString(),
    };
    const token = "mock-negus-jwt-token-verified";
    localStorage.setItem("token", token);
    setStorageItem("user", newUser);

    const allUsers = getStorageItem("users", mockUsersList);
    setStorageItem("users", [newUser, ...allUsers]);

    return {
      status: 201,
      data: {
        success: true,
        message: "Account created successfully! Welcome to Negus Consultants.",
        token,
        user: newUser,
      },
    };
  }

  if (cleanPath === "/users/google" && upperMethod === "POST") {
    const token = "mock-negus-jwt-token-verified";
    localStorage.setItem("token", token);
    setStorageItem("user", defaultMockUser);
    return {
      status: 200,
      data: {
        success: true,
        token,
        user: defaultMockUser,
      },
    };
  }

  if (cleanPath === "/users/verify-email" && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Email verified successfully! Welcome to Negus Consultants.",
      },
    };
  }

  if (cleanPath === "/users/resend-verification" && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Verification link sent successfully.",
      },
    };
  }

  if (cleanPath === "/users/logout" && upperMethod === "POST") {
    localStorage.removeItem("token");
    return {
      status: 200,
      data: {
        success: true,
        message: "Logged out successfully",
      },
    };
  }

  if (cleanPath.startsWith("/users/upload/") && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        data: body?.data || defaultMockUser.profile_image,
      },
    };
  }

  if (cleanPath === "/users/roles" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: ["admin", "semiadmin", "mentor", "student", "member"],
      },
    };
  }

  if (cleanPath === "/users" && upperMethod === "GET") {
    const users = getStorageItem("users", mockUsersList);
    return {
      status: 200,
      data: {
        success: true,
        data: users,
        users: users,
        total: users.length,
      },
    };
  }

  // ----------------------------------------------------
  // 2. PACKAGES
  // ----------------------------------------------------
  if (cleanPath === "/packages" && upperMethod === "GET") {
    const packages = getStorageItem("packages", mockPackagesList);
    return {
      status: 200,
      data: {
        success: true,
        data: packages,
      },
    };
  }

  if (cleanPath.startsWith("/packages/") && upperMethod === "GET") {
    const id = cleanPath.split("/")[2];
    const packages = getStorageItem("packages", mockPackagesList);
    const found = packages.find((p) => String(p.id) === String(id)) || packages[0];
    return {
      status: 200,
      data: {
        success: true,
        data: found,
      },
    };
  }

  if (cleanPath === "/packages" && upperMethod === "POST") {
    const packages = getStorageItem("packages", mockPackagesList);
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: body?.name || "New Package",
      price: Number(body?.price) || 4999,
      duration_days: Number(body?.duration_days) || 60,
      type: body?.type || "package",
      features: body?.features || ["Full admissions guidance", "Telegram support"],
      description: body?.description || "Comprehensive guidance package.",
      popular: false,
      icon: "GraduationCap",
    };
    const updated = [...packages, newPkg];
    setStorageItem("packages", updated);
    return {
      status: 201,
      data: {
        success: true,
        message: "Package created successfully",
        data: newPkg,
      },
    };
  }

  if (cleanPath.startsWith("/packages/") && upperMethod === "DELETE") {
    const id = cleanPath.split("/")[2];
    const packages = getStorageItem("packages", mockPackagesList);
    const filtered = packages.filter((p) => String(p.id) !== String(id));
    setStorageItem("packages", filtered);
    return {
      status: 200,
      data: {
        success: true,
        message: "Package deleted successfully",
      },
    };
  }

  // ----------------------------------------------------
  // 3. COURSES & VIDEOS
  // ----------------------------------------------------
  if (cleanPath === "/courses/categories" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockCourseCategories,
      },
    };
  }

  if (cleanPath === "/courses/public" && upperMethod === "GET") {
    let courses = getStorageItem("courses", mockCoursesList);
    const { category, level, sortBy } = queryParams;

    if (category && category !== "all") {
      courses = courses.filter(
        (c) =>
          c.category_id === category ||
          (c.category && c.category.toLowerCase() === category.toLowerCase())
      );
    }
    if (level) {
      courses = courses.filter(
        (c) => c.level && c.level.toLowerCase() === level.toLowerCase()
      );
    }
    if (sortBy === "price-low") {
      courses = [...courses].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      courses = [...courses].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      courses = [...courses].sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return {
      status: 200,
      data: {
        success: true,
        count: courses.length,
        data: courses,
      },
    };
  }

  if (cleanPath.startsWith("/courses/public/") && upperMethod === "GET") {
    const id = cleanPath.split("/")[3];
    const courses = getStorageItem("courses", mockCoursesList);
    const found = courses.find((c) => String(c.id) === String(id)) || courses[0];
    return {
      status: 200,
      data: {
        success: true,
        data: found,
      },
    };
  }

  if (cleanPath === "/courses" && upperMethod === "GET") {
    const courses = getStorageItem("courses", mockCoursesList);
    return {
      status: 200,
      data: {
        success: true,
        data: courses,
      },
    };
  }

  if (cleanPath === "/courses" && upperMethod === "POST") {
    const courses = getStorageItem("courses", mockCoursesList);
    const newCourse = {
      id: `crs_${Date.now()}`,
      title: body?.title || "New Course",
      description: body?.description || "Course description",
      thumbnail: body?.thumbnail || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
      duration: body?.duration || "2h 30min",
      tags: body?.tags || ["Scholarships"],
      level: body?.level || "Beginner",
      instructor_name: body?.instructor_name || "Negus Expert",
      instructor_avatar: defaultMockUser.profile_image,
      instructor_title: "Senior Admissions Coach",
      rating: 5.0,
      enrolled_students: 120,
      price: Number(body?.price) || 0,
      is_free: Number(body?.price || 0) === 0,
      progress: 0,
      video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      youtube_id: "Qw4w9WgXcQ",
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setStorageItem("courses", [newCourse, ...courses]);
    return {
      status: 201,
      data: {
        success: true,
        message: "Course created successfully",
        data: newCourse,
      },
    };
  }

  if (cleanPath === "/courses/network_courses" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        courses: mockNetworkCoursesList,
      },
    };
  }

  if (cleanPath.startsWith("/courses/") && upperMethod === "DELETE") {
    const id = cleanPath.split("/")[2];
    const courses = getStorageItem("courses", mockCoursesList);
    const filtered = courses.filter((c) => String(c.id) !== String(id));
    setStorageItem("courses", filtered);
    return {
      status: 200,
      data: { success: true, message: "Course deleted successfully" },
    };
  }

  if (cleanPath.startsWith("/courses/") && upperMethod === "PUT") {
    const id = cleanPath.split("/")[2];
    const courses = getStorageItem("courses", mockCoursesList);
    const updated = courses.map((c) => (String(c.id) === String(id) ? { ...c, ...body } : c));
    setStorageItem("courses", updated);
    return {
      status: 200,
      data: { success: true, data: { ...body, id } },
    };
  }

  if (cleanPath.startsWith("/courses/stream/")) {
    return {
      status: 200,
      data: {
        success: true,
        streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    };
  }

  if (cleanPath.startsWith("/video/metadata/")) {
    const videoId = cleanPath.split("/")[3];
    return {
      status: 200,
      data: {
        success: true,
        metadata: {
          id: videoId,
          title: "Admissions Masterclass Lesson",
          duration: 9900,
          streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
      },
    };
  }

  if (cleanPath.startsWith("/video/stream/")) {
    return {
      status: 200,
      data: {
        success: true,
        streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    };
  }

  if (cleanPath === "/video/memory-stats" && upperMethod === "GET") {
    return {
      status: 200,
      data: mockMemoryStats,
    };
  }

  // Course Comments
  if (cleanPath.includes("/comments") && cleanPath.includes("courses")) {
    const comments = getStorageItem("comments", mockCommentsList);
    if (upperMethod === "POST") {
      const newComment = {
        id: `cmt_${Date.now()}`,
        course_id: body?.course_id || "crs_01",
        user_name: defaultMockUser.first_name + " " + defaultMockUser.last_name,
        user_avatar: defaultMockUser.profile_image,
        comment: body?.comment || "Great lesson!",
        created_at: new Date().toISOString(),
      };
      setStorageItem("comments", [newComment, ...comments]);
      return {
        status: 201,
        data: { success: true, data: newComment },
      };
    }
    return {
      status: 200,
      data: comments,
    };
  }

  if (cleanPath === "/courses/network_courses" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        courses: [
          { id: "crs_01", title: "Global Scholarships Masterclass", name: "Global Scholarships Masterclass" },
          { id: "crs_02", title: "Writing Compelling SOPs", name: "Writing Compelling SOPs" },
        ],
      },
    };
  }

  if (cleanPath.startsWith("/payments/course_purchases/")) {
    return {
      status: 200,
      data: mockCourseTreeData,
    };
  }

  // ----------------------------------------------------
  // 4. MENTORS & BOOKINGS
  // ----------------------------------------------------
  if (cleanPath === "/mentors/profile/me" && upperMethod === "GET") {
    const profile = getStorageItem("mentor_my_profile", {
      title: "Senior Admissions Mentor",
      organization: "Harvard, ALA, Freelance",
      country: "Ethiopia",
      headline: "Ivy League Admissions Consultant & STEM Specialist",
      bio: "Full-ride scholarship recipient at MIT Electrical Engineering & Computer Science. Mentored 40+ Ethiopian students into top US and European universities.",
      years_of_experience: 5,
      hourly_rate: 35,
      currency: "ETB",
      specialties: ["MIT & Ivy League Admissions", "STEM SOPs", "Graduate Assistantships"],
      languages: ["English", "Amharic"],
      timezone: "Africa/Addis_Ababa",
      visibility: true,
      introduction_video_url: "https://www.youtube.com/watch?v=Qw4w9WgXcQ",
      availability: {
        days: ["Mon", "Wed", "Fri", "Sat"],
        start_time: "09:00",
        end_time: "17:00",
      },
    });
    return {
      status: 200,
      data: {
        success: true,
        data: profile,
      },
    };
  }

  if (cleanPath === "/mentors/profile" && upperMethod === "POST") {
    setStorageItem("mentor_my_profile", body);
    return {
      status: 200,
      data: {
        success: true,
        message: "Mentor profile updated successfully",
        data: body,
      },
    };
  }

  // Mentors Admin Operations
  if (cleanPath.startsWith("/mentors/admin/applications/") && cleanPath.endsWith("/documents") && upperMethod === "GET") {
    const parts = cleanPath.split("/");
    const appId = parts[4] || "mnt_app_01";
    const docs = mockMentorDocumentsList[appId] || mockMentorDocumentsList["mnt_app_01"] || [];
    return {
      status: 200,
      data: {
        success: true,
        data: docs,
      },
    };
  }

  if (cleanPath.startsWith("/mentors/admin/documents/") && upperMethod === "GET") {
    return {
      status: 200,
      data: new Blob(["Mock PDF document content for mentor verification"], { type: "application/pdf" }),
    };
  }

  if (cleanPath.startsWith("/mentors/admin/applications/") && cleanPath.endsWith("/schedule") && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Verification interview scheduled successfully.",
      },
    };
  }

  if (cleanPath.startsWith("/mentors/admin/applications/") && cleanPath.endsWith("/approve") && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Mentor application approved successfully.",
      },
    };
  }

  if (cleanPath.startsWith("/mentors/admin/applications/") && cleanPath.endsWith("/reject") && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Mentor application rejected.",
      },
    };
  }

  if (cleanPath === "/mentors/admin/applications" && upperMethod === "GET") {
    const apps = getStorageItem("mentor_applications", mockMentorApplicationsList);
    return {
      status: 200,
      data: {
        success: true,
        data: apps,
      },
    };
  }

  // Mentor Reviews
  if (cleanPath === "/mentors/reviews" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          { id: "rev_01", mentor_id: "mnt_01", student_name: "Dawit K.", rating: 5, comment: "Incredible SOP insights that directly helped me get into MIT!" },
          { id: "rev_02", mentor_id: "mnt_02", student_name: "Selam A.", rating: 5, comment: "Clear, methodical essay review. Highly recommend!" }
        ],
      },
    };
  }

  if (cleanPath.startsWith("/mentors/reviews/") && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: { id: "rev_01", mentor_id: "mnt_01", student_name: "Dawit K.", rating: 5, comment: "Incredible SOP insights!" },
      },
    };
  }

  if (cleanPath === "/mentors/reviews" && upperMethod === "POST") {
    return {
      status: 201,
      data: {
        success: true,
        message: "Review submitted successfully",
      },
    };
  }

  if (cleanPath === "/mentors" && upperMethod === "GET") {
    const mentors = getStorageItem("mentors", mockMentorsList);
    return {
      status: 200,
      data: {
        success: true,
        data: mentors,
        meta: {
          total: mentors.length,
          page: 1,
          per_page: 12,
        },
      },
    };
  }

  if (cleanPath === "/mentors" && upperMethod === "POST") {
    const mentors = getStorageItem("mentors", mockMentorsList);
    const newMentor = {
      id: `mnt_${Date.now()}`,
      first_name: body?.first_name || "New",
      last_name: body?.last_name || "Mentor",
      name: `${body?.first_name || "New"} ${body?.last_name || "Mentor"}`,
      email: body?.email || "mentor@gmail.com",
      position: body?.position || "Scholarship Advisor",
      specialties: body?.specialties || ["Admissions"],
      available_days: body?.available_days || ["Mon", "Wed"],
      hourly_rate: Number(body?.hourly_rate) || 25,
      rating: 5.0,
      profile_image: defaultMockUser.profile_image,
      is_active: true,
    };
    setStorageItem("mentors", [newMentor, ...mentors]);
    return {
      status: 201,
      data: {
        success: true,
        message: "Mentor created successfully",
        data: newMentor,
      },
    };
  }

  if (cleanPath.startsWith("/mentors/") && upperMethod === "DELETE") {
    const id = cleanPath.split("/")[2];
    const mentors = getStorageItem("mentors", mockMentorsList);
    const filtered = mentors.filter((m) => String(m.id) !== String(id));
    setStorageItem("mentors", filtered);
    return {
      status: 200,
      data: { success: true, message: "Mentor deleted successfully" },
    };
  }

  if (cleanPath.startsWith("/mentors/") && upperMethod === "PUT") {
    const id = cleanPath.split("/")[2];
    const mentors = getStorageItem("mentors", mockMentorsList);
    const updated = mentors.map((m) => (String(m.id) === String(id) ? { ...m, ...body } : m));
    setStorageItem("mentors", updated);
    return {
      status: 200,
      data: { success: true, message: "Mentor updated successfully", data: { ...body, id } },
    };
  }

  if (cleanPath.startsWith("/mentors/") && upperMethod === "GET" && !cleanPath.includes("/applications") && !cleanPath.includes("/admin")) {
    const id = cleanPath.split("/")[2];
    const mentors = getStorageItem("mentors", mockMentorsList);
    const found = mentors.find((m) => String(m.id) === String(id)) || mentors[0];
    return {
      status: 200,
      data: {
        success: true,
        data: found,
      },
    };
  }

  if (cleanPath === "/mentors/applications" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockMentorApplicationsList,
      },
    };
  }

  if (cleanPath === "/mentors/applications" && upperMethod === "POST") {
    return {
      status: 201,
      data: {
        success: true,
        message: "Mentor application submitted successfully!",
        data: {
          id: `map_${Date.now()}`,
          status: "submitted",
        },
      },
    };
  }

  if (cleanPath.includes("/mentors/applications/") && cleanPath.includes("/documents")) {
    return {
      status: 200,
      data: {
        success: true,
        message: "Documents uploaded successfully.",
      },
    };
  }

  if (cleanPath.startsWith("/mentors/applications/") && upperMethod === "PATCH") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Application status updated successfully.",
      },
    };
  }

  if (cleanPath === "/mentors/applications/status" || cleanPath === "/mentors/applications/user") {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          status: "approved",
          notes: "Profile verified.",
        },
      },
    };
  }

  if (cleanPath === "/mentor-bookings" || cleanPath === "/mentor-bookings/my-bookings") {
    const bookings = getStorageItem("bookings", mockBookingsList);
    if (upperMethod === "POST") {
      const newBooking = {
        id: `bk_${Date.now()}`,
        user_id: defaultMockUser.id,
        mentor_name: body?.mentor_name || "Kidus Assefa",
        booking_date: body?.date || "2026-11-20T14:00:00Z",
        time_slot: body?.time_slot || "2:00 PM - 3:00 PM",
        status: "confirmed",
        meeting_link: "https://meet.google.com/negus-scholar-demo",
      };
      setStorageItem("bookings", [newBooking, ...bookings]);
      return {
        status: 201,
        data: {
          success: true,
          message: "Booking confirmed! A calendar invite has been sent to your email.",
          data: newBooking,
        },
      };
    }
    return {
      status: 200,
      data: {
        success: true,
        data: bookings,
      },
    };
  }

  // ----------------------------------------------------
  // 5. BLOGS & ARTICLES
  // ----------------------------------------------------
  if (cleanPath === "/blogs" && upperMethod === "GET") {
    const blogs = getStorageItem("blogs", mockBlogsList);
    return {
      status: 200,
      data: {
        success: true,
        blogs,
      },
    };
  }

  if (cleanPath.startsWith("/blogs/") && upperMethod === "GET" && !cleanPath.includes("/comments")) {
    const id = cleanPath.split("/")[2];
    const blogs = getStorageItem("blogs", mockBlogsList);
    const found = blogs.find((b) => String(b.id) === String(id)) || blogs[0];
    return {
      status: 200,
      data: {
        success: true,
        blog: found,
      },
    };
  }

  if (cleanPath.startsWith("/blogs/") && cleanPath.includes("/comments") && upperMethod === "GET") {
    const comments = getStorageItem("comments", mockCommentsList);
    return {
      status: 200,
      data: {
        success: true,
        comments,
      },
    };
  }

  if (cleanPath === "/blogs/comments" && upperMethod === "POST") {
    const comments = getStorageItem("comments", mockCommentsList);
    const newComment = {
      id: `cmt_${Date.now()}`,
      blog_id: body?.blog_id || "blg_01",
      user_name: defaultMockUser.first_name + " " + defaultMockUser.last_name,
      user_avatar: defaultMockUser.profile_image,
      comment: body?.comment || body?.content || "Insightful read!",
      created_at: new Date().toISOString(),
    };
    setStorageItem("comments", [newComment, ...comments]);
    return {
      status: 201,
      data: {
        success: true,
        message: "Comment submitted",
        comment: newComment,
      },
    };
  }

  if (cleanPath === "/blogs" && upperMethod === "POST") {
    const blogs = getStorageItem("blogs", mockBlogsList);
    const newBlog = {
      id: `blg_${Date.now()}`,
      title: body?.title || "New Scholarship Insight",
      excerpt: body?.excerpt || "Practical guidance on admissions.",
      content: body?.content || "Full article content.",
      category: body?.category || "Scholarships",
      author_name: defaultMockUser.first_name + " " + defaultMockUser.last_name,
      author_avatar: defaultMockUser.profile_image,
      read_time: "5 min read",
      created_at: new Date().toISOString(),
      cover_image: body?.cover_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    };
    setStorageItem("blogs", [newBlog, ...blogs]);
    return {
      status: 201,
      data: {
        success: true,
        data: newBlog,
      },
    };
  }

  // ----------------------------------------------------
  // 6. SUBSCRIPTIONS, APPLICATIONS & PAYMENTS
  // ----------------------------------------------------
  if (cleanPath === "/subscriptions" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockSubscriptionsList,
      },
    };
  }

  if (cleanPath === "/subscriptions/referrals/tree" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            name: "Abebe Bikila",
            children: [
              { name: "Lidia Haile", value: 100 },
              { name: "Dawit Wolde", value: 150 },
            ],
          },
        ],
      },
    };
  }

  if (cleanPath === "/subscriptions/referrals" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: "ref_1",
            user_name: "Lidia Haile",
            referred_by: "Abebe Bikila",
            amount: 500,
            status: "pending",
            created_at: "2026-03-01T10:00:00Z",
          },
          {
            id: "ref_2",
            user_name: "Dawit Wolde",
            referred_by: "Abebe Bikila",
            amount: 750,
            status: "paid",
            created_at: "2026-02-15T12:00:00Z",
          },
        ],
      },
    };
  }

  if (cleanPath.includes("/subscriptions/referrals/") && cleanPath.endsWith("/pay")) {
    return {
      status: 200,
      data: {
        success: true,
        message: "Referral paid successfully!",
      },
    };
  }

  if (cleanPath.startsWith("/subscriptions/") && upperMethod === "DELETE") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Subscription deleted successfully.",
      },
    };
  }

  if (cleanPath.startsWith("/subscriptions/") && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockSubscriptionsList[0],
      },
    };
  }

  if (cleanPath.includes("/activate") && cleanPath.includes("subscriptions")) {
    return {
      status: 200,
      data: {
        success: true,
        message: "Subscription activated successfully!",
      },
    };
  }

  if (cleanPath === "/applications" && upperMethod === "GET") {
    const apps = getStorageItem("applications", mockApplicationsList);
    return {
      status: 200,
      data: {
        success: true,
        data: apps,
        applications: apps,
      },
    };
  }

  if (cleanPath.startsWith("/applications/") && upperMethod === "GET") {
    const id = cleanPath.split("/")[2];
    const apps = getStorageItem("applications", mockApplicationsList);
    const found = apps.find((a) => String(a.id) === String(id)) || apps[0];
    return {
      status: 200,
      data: {
        success: true,
        data: found,
        application: found,
      },
    };
  }

  if ((cleanPath === "/applications" || cleanPath.startsWith("/packages/")) && upperMethod === "POST") {
    const apps = getStorageItem("applications", mockApplicationsList);
    const newApp = {
      id: `app_${Date.now()}`,
      user_id: defaultMockUser.id,
      applicant_name: defaultMockUser.first_name + " " + defaultMockUser.last_name,
      applicant_email: defaultMockUser.email,
      package_id: body?.package_id || "pkg-full-course",
      package_name: body?.package_name || "Full Course",
      academic_status: body?.academicStatus || "Student",
      school: body?.school || "Addis Ababa University",
      gpa: body?.gpa || "3.9",
      status: "approved",
      created_at: new Date().toISOString(),
    };
    setStorageItem("applications", [newApp, ...apps]);
    return {
      status: 201,
      data: {
        success: true,
        message: "Application submitted successfully!",
        data: newApp,
      },
    };
  }

  if (cleanPath.startsWith("/payments") && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockPaymentsList,
      },
    };
  }

  if (cleanPath.startsWith("/payments/") && upperMethod === "POST") {
    return {
      status: 201,
      data: {
        success: true,
        message: "Payment proof submitted successfully! Verification in progress.",
      },
    };
  }

  if (cleanPath.startsWith("/payments/verify/")) {
    return {
      status: 200,
      data: {
        success: true,
        message: "Payment marked as verified.",
      },
    };
  }

  // ----------------------------------------------------
  // 7. CONTACT & SYSTEM
  // ----------------------------------------------------
  if (cleanPath === "/contact/stats" && upperMethod === "GET") {
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    const total = msgs.length;
    const unread = msgs.filter((m) => m.status === "unread").length;
    const read = msgs.filter((m) => m.status === "read").length;
    const replied = msgs.filter((m) => m.status === "replied").length;
    const archived = msgs.filter((m) => m.status === "archived").length;
    return {
      status: 200,
      data: {
        success: true,
        data: { total, unread, read, replied, archived },
      },
    };
  }

  if (cleanPath === "/contact" && upperMethod === "GET") {
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    return {
      status: 200,
      data: {
        success: true,
        data: msgs,
        messages: msgs,
        pagination: {
          page: 1,
          limit: 10,
          total: msgs.length,
          totalPages: Math.max(1, Math.ceil(msgs.length / 10)),
        },
      },
    };
  }

  if (cleanPath.startsWith("/contact/") && upperMethod === "PUT") {
    const id = cleanPath.split("/")[2];
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    const updated = msgs.map((m) => (String(m.id) === String(id) ? { ...m, ...body } : m));
    setStorageItem("contact_messages", updated);
    return {
      status: 200,
      data: {
        success: true,
        message: "Message status updated successfully",
      },
    };
  }

  if (cleanPath.startsWith("/contact/") && upperMethod === "DELETE") {
    const id = cleanPath.split("/")[2];
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    const filtered = msgs.filter((m) => String(m.id) !== String(id));
    setStorageItem("contact_messages", filtered);
    return {
      status: 200,
      data: {
        success: true,
        message: "Message deleted successfully",
      },
    };
  }

  if (cleanPath === "/contact" && upperMethod === "POST") {
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: body?.name || "Visitor",
      email: body?.email || "visitor@example.com",
      subject: body?.subject || "General Inquiry",
      message: body?.message || "Hello!",
      status: "unread",
      created_at: new Date().toISOString(),
    };
    setStorageItem("contact_messages", [newMsg, ...msgs]);
    return {
      status: 200,
      data: {
        success: true,
        message: "Your message has been sent successfully! Our team will reach out within 24 hours.",
      },
    };
  }

  if (cleanPath === "/contact-messages" && upperMethod === "GET") {
    const msgs = getStorageItem("contact_messages", mockContactMessagesList);
    return {
      status: 200,
      data: {
        success: true,
        data: msgs,
      },
    };
  }

  if (cleanPath.startsWith("/contact-messages/") && upperMethod === "DELETE") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Message deleted successfully.",
      },
    };
  }

  if (cleanPath === "/email/stats" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        data: mockEmailStats,
      },
    };
  }

  if (cleanPath.startsWith("/email/") && upperMethod === "POST") {
    return {
      status: 200,
      data: {
        success: true,
        message: "Email dispatched successfully.",
      },
    };
  }

  if (cleanPath === "/analytics/daily" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        data: [
          { date: "2026-11-01", activeUsers: 45, newUsers: 12, pageViews: 210, sessions: 80, device: "desktop", country: "Ethiopia" },
          { date: "2026-11-02", activeUsers: 58, newUsers: 15, pageViews: 260, sessions: 95, device: "mobile", country: "Ethiopia" },
          { date: "2026-11-03", activeUsers: 64, newUsers: 18, pageViews: 310, sessions: 110, device: "desktop", country: "United States" },
          { date: "2026-11-04", activeUsers: 72, newUsers: 22, pageViews: 390, sessions: 140, device: "mobile", country: "Germany" },
          { date: "2026-11-05", activeUsers: 80, newUsers: 25, pageViews: 450, sessions: 160, device: "desktop", country: "United Kingdom" },
          { date: "2026-11-06", activeUsers: 88, newUsers: 28, pageViews: 520, sessions: 185, device: "mobile", country: "Ethiopia" },
          { date: "2026-11-07", activeUsers: 95, newUsers: 30, pageViews: 610, sessions: 210, device: "desktop", country: "Canada" },
        ],
      },
    };
  }

  if (cleanPath === "/analytics/realtime" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        data: {
          activeUsers: 24,
          recentEvents: 78,
        },
      },
    };
  }

  if (cleanPath === "/analytics/aggregated" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        data: [
          { period: "Week 1", activeUsers: 320, newUsers: 85, pageViews: 1420 },
          { period: "Week 2", activeUsers: 410, newUsers: 110, pageViews: 1890 },
          { period: "Week 3", activeUsers: 480, newUsers: 125, pageViews: 2340 },
          { period: "Week 4", activeUsers: 540, newUsers: 142, pageViews: 2950 },
        ],
      },
    };
  }

  if (cleanPath.startsWith("/users/") && cleanPath.endsWith("/role") && upperMethod === "PATCH") {
    return {
      status: 200,
      data: {
        success: true,
        message: "User role updated successfully!",
      },
    };
  }

  if (cleanPath === "/analytics" && upperMethod === "GET") {
    return {
      status: 200,
      data: {
        success: true,
        totalUsers: 142,
        activeMentors: 16,
        revenue: "ETB 2,450,000",
        totalApplications: 38,
      },
    };
  }

  // ==================== SCHOLARSHIPS API ====================
  if (cleanPath === "/scholarships" && upperMethod === "GET") {
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const page = parseInt(queryParams.page || "1", 10);
    const limit = parseInt(queryParams.limit || "6", 10);
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);
    return {
      status: 200,
      data: {
        scholarships: paginated,
        pagination: {
          total: list.length,
          totalPages: Math.ceil(list.length / limit) || 1,
          currentPage: page,
          limit,
        },
      },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && cleanPath.endsWith("/comments") && upperMethod === "GET") {
    const sId = cleanPath.split("/")[2];
    const commentsMap = getStorageItem("scholarship_comments", mockScholarshipComments);
    const comments = commentsMap[sId] || [];
    return {
      status: 200,
      data: { comments },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && cleanPath.endsWith("/comments") && upperMethod === "POST") {
    const sId = cleanPath.split("/")[2];
    const commentsMap = getStorageItem("scholarship_comments", mockScholarshipComments);
    const existing = commentsMap[sId] || [];
    const currentUser = getStorageItem("user", defaultMockUser);
    const newComment = {
      id: `cm_${Date.now()}`,
      user_id: currentUser?.id || "usr_negus_001",
      scholarship_id: sId,
      first_name: currentUser?.first_name || "Scholar",
      last_name: currentUser?.last_name || "Applicant",
      content: body?.content || "",
      created_at: new Date().toISOString(),
    };
    commentsMap[sId] = [newComment, ...existing];
    setStorageItem("scholarship_comments", commentsMap);

    // update count in scholarships list
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const updated = list.map((s) => s.id === sId ? { ...s, comments_count: (s.comments_count || 0) + 1 } : s);
    setStorageItem("scholarships", updated);

    return {
      status: 201,
      data: { comment: newComment },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && cleanPath.endsWith("/likes") && upperMethod === "GET") {
    const sId = cleanPath.split("/")[2];
    const likesMap = getStorageItem("scholarship_likes", {});
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const scholarship = list.find((s) => s.id === sId);
    return {
      status: 200,
      data: {
        liked: Boolean(likesMap[sId]),
        likesCount: scholarship?.likes_count || 0,
      },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && cleanPath.endsWith("/like") && upperMethod === "POST") {
    const sId = cleanPath.split("/")[2];
    const likesMap = getStorageItem("scholarship_likes", {});
    const isLiked = !likesMap[sId];
    likesMap[sId] = isLiked;
    setStorageItem("scholarship_likes", likesMap);

    const list = getStorageItem("scholarships", mockScholarshipsList);
    let newCount = 0;
    const updated = list.map((s) => {
      if (s.id === sId) {
        newCount = Math.max(0, (s.likes_count || 0) + (isLiked ? 1 : -1));
        return { ...s, likes_count: newCount };
      }
      return s;
    });
    setStorageItem("scholarships", updated);

    return {
      status: 200,
      data: {
        liked: isLiked,
        likesCount: newCount,
      },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && upperMethod === "GET") {
    const sId = cleanPath.split("/")[2];
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const scholarship = list.find((s) => s.id === sId);
    if (!scholarship) {
      return { status: 404, data: { message: "Scholarship not found" } };
    }
    return {
      status: 200,
      data: { scholarship },
    };
  }

  if (cleanPath === "/scholarships" && upperMethod === "POST") {
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const newScholarship = {
      id: `sch_${Date.now()}`,
      title: body?.title || "Untitled Scholarship",
      description: body?.description || "",
      image_url: body?.image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80",
      link: body?.link || "",
      deadline: body?.deadline || "",
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      university: body?.university || "Global Institution",
      country: body?.country || "International",
      degree_level: body?.degree_level || "Undergraduate / Graduate",
      funding_type: body?.funding_type || "Fully Funded",
    };
    const updated = [newScholarship, ...list];
    setStorageItem("scholarships", updated);
    return {
      status: 201,
      data: { scholarship: newScholarship },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && upperMethod === "PUT") {
    const sId = cleanPath.split("/")[2];
    const list = getStorageItem("scholarships", mockScholarshipsList);
    let updatedItem = null;
    const updated = list.map((s) => {
      if (s.id === sId) {
        updatedItem = { ...s, ...body };
        return updatedItem;
      }
      return s;
    });
    setStorageItem("scholarships", updated);
    return {
      status: 200,
      data: { scholarship: updatedItem },
    };
  }

  if (cleanPath.startsWith("/scholarships/") && upperMethod === "DELETE") {
    const sId = cleanPath.split("/")[2];
    const list = getStorageItem("scholarships", mockScholarshipsList);
    const updated = list.filter((s) => s.id !== sId);
    setStorageItem("scholarships", updated);
    return {
      status: 200,
      data: { success: true, message: "Scholarship deleted" },
    };
  }

  // ==================== CATALOG API ====================
  if (cleanPath === "/catalog/fixed-services" && upperMethod === "GET") {
    return { status: 200, data: mockCatalogFixedServices };
  }

  if (cleanPath === "/catalog/essay-pricing-rates" && upperMethod === "GET") {
    return { status: 200, data: mockCatalogEssayRates };
  }

  if (cleanPath === "/catalog/essay-quote" && upperMethod === "GET") {
    const sType = queryParams.serviceType || "editing";
    const turnaround = parseInt(queryParams.turnaroundDays || "5", 10);
    const words = parseInt(queryParams.wordCount || "650", 10);
    const rateEntry = mockCatalogEssayRates.find((r) => r.service_type === sType && r.turnaround_days === turnaround) || mockCatalogEssayRates[0];
    const totalEtb = Math.round(words * (rateEntry?.rate_per_word_etb || 15));
    return {
      status: 200,
      data: {
        serviceType: sType,
        turnaroundDays: turnaround,
        wordCount: words,
        ratePerWordEtb: rateEntry?.rate_per_word_etb || 15,
        totalEtb,
      },
    };
  }

  if (cleanPath === "/catalog/mentorship-packages" && upperMethod === "GET") {
    return { status: 200, data: mockCatalogMentorshipPackages };
  }

  if (cleanPath === "/catalog/application-packages" && upperMethod === "GET") {
    return { status: 200, data: mockCatalogApplicationPackages };
  }

  // ==================== ORDERS API ====================
  if (cleanPath.startsWith("/orders/") && cleanPath.endsWith("/rounds") && upperMethod === "POST") {
    const oId = cleanPath.split("/")[2];
    const list = getStorageItem("college_orders", mockCollegeOrdersList);
    const order = list.find((o) => o.id === oId);
    if (!order) return { status: 404, data: { message: "Order not found" } };
    const roundNumber = body?.roundNumber || 2;
    const newInvoice = {
      id: `inv_${Date.now()}`,
      round_number: roundNumber,
      description: `Advantage Package — Round ${roundNumber}`,
      amount_etb: roundNumber === 2 ? 15700 : 250000,
      status: "pending_verification",
    };
    order.invoices = [...(order.invoices || []), newInvoice];
    setStorageItem("college_orders", list);
    return { status: 201, data: { invoice: newInvoice } };
  }

  if (cleanPath.startsWith("/orders/") && upperMethod === "GET") {
    const oId = cleanPath.split("/")[2];
    const list = getStorageItem("college_orders", mockCollegeOrdersList);
    const order = list.find((o) => o.id === oId);
    if (!order) return { status: 404, data: { message: "Order not found" } };
    return { status: 200, data: order };
  }

  if (cleanPath === "/orders" && upperMethod === "GET") {
    const statusFilter = queryParams.status;
    const list = getStorageItem("college_orders", mockCollegeOrdersList);
    const filtered = statusFilter ? list.filter((o) => o.status === statusFilter) : list;
    return { status: 200, data: filtered };
  }

  if (cleanPath === "/orders/mine" && upperMethod === "GET") {
    const list = getStorageItem("college_orders", mockCollegeOrdersList);
    return { status: 200, data: list };
  }

  if ((cleanPath === "/orders/essay" || cleanPath === "/orders/fixed-service" || cleanPath === "/orders/mentorship" || cleanPath === "/orders/application-package") && upperMethod === "POST") {
    const list = getStorageItem("college_orders", mockCollegeOrdersList);
    const currentUser = getStorageItem("user", defaultMockUser);
    const orderType = cleanPath.replace("/orders/", "").replace("-", "_");
    const newOrder = {
      id: `ord_${Date.now()}`,
      user_id: currentUser?.id || "usr_negus_001",
      user_name: `${currentUser?.first_name || "Applicant"} ${currentUser?.last_name || ""}`,
      user_email: currentUser?.email || "scholar@negus.com",
      contact_phone: body?.phone || "+251 91 123 4567",
      order_type: orderType,
      status: "pending_payment",
      created_at: new Date().toISOString(),
      invoices: [
        {
          id: `inv_${Date.now()}`,
          round_number: 1,
          description: `${body?.applicationPackageCode || body?.mentorshipPackageCode || body?.fixedServiceCode || "Service"} Order Initial Invoice`,
          amount_etb: body?.amount || 13500,
          status: "pending_verification",
        },
      ],
    };
    const updated = [newOrder, ...list];
    setStorageItem("college_orders", updated);
    return {
      status: 201,
      data: { order: newOrder, invoice: newOrder.invoices[0] },
    };
  }

  // ==================== PAYMENTS API ====================
  if (cleanPath === "/package-payments/pending" && upperMethod === "GET") {
    const list = getStorageItem("college_payments", mockCollegePaymentsList);
    return { status: 200, data: list.filter((p) => p.status === "pending") };
  }

  if (cleanPath.startsWith("/package-payments/") && cleanPath.endsWith("/verify") && upperMethod === "PATCH") {
    const pId = cleanPath.split("/")[2];
    const list = getStorageItem("college_payments", mockCollegePaymentsList);
    const updated = list.map((p) => p.id === pId ? { ...p, status: "verified" } : p);
    setStorageItem("college_payments", updated);
    return { status: 200, data: { success: true, message: "Payment verified successfully" } };
  }

  if (cleanPath.startsWith("/package-payments/") && cleanPath.endsWith("/reject") && upperMethod === "PATCH") {
    const pId = cleanPath.split("/")[2];
    const list = getStorageItem("college_payments", mockCollegePaymentsList);
    const updated = list.map((p) => p.id === pId ? { ...p, status: "rejected", reason: body?.reason } : p);
    setStorageItem("college_payments", updated);
    return { status: 200, data: { success: true, message: "Payment rejected" } };
  }

  if (cleanPath === "/package-payments" && upperMethod === "POST") {
    const list = getStorageItem("college_payments", mockCollegePaymentsList);
    const currentUser = getStorageItem("user", defaultMockUser);
    const newPayment = {
      id: `pay_${Date.now()}`,
      user_name: `${currentUser?.first_name || "Applicant"} ${currentUser?.last_name || ""}`,
      user_email: currentUser?.email || "scholar@negus.com",
      contact_phone: currentUser?.phone || "+251 91 123 4567",
      order_type: "application_package",
      invoice_description: `Invoice ${body?.invoiceId || "INV-001"}`,
      amount_claimed_etb: body?.amountClaimed || 13500,
      invoice_amount_etb: body?.amountClaimed || 13500,
      screenshot_url: body?.data || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
      submitted_at: new Date().toISOString(),
      status: "pending",
    };
    const updated = [newPayment, ...list];
    setStorageItem("college_payments", updated);
    return { status: 201, data: { success: true, payment: newPayment } };
  }

  // Default fallback for any unmatched endpoint
  return {
    status: 200,
    data: {
      success: true,
      data: [],
      message: "Operation completed successfully.",
    },
  };
}

// Custom Axios Adapter
export async function mockAxiosAdapter(config) {
  let body = config.data;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      // keep raw string
    }
  }

  try {
    const res = await dispatchMockApi(config.method, config.url, body, config.params);
    return {
      data: res.data,
      status: res.status || 200,
      statusText: "OK",
      headers: { "content-type": "application/json" },
      config,
      request: {},
    };
  } catch (err) {
    if (err.response) {
      return Promise.reject(err);
    }
    const errorResponse = {
      data: { message: err.message || "Request failed" },
      status: err.status || 500,
      statusText: "Error",
      headers: {},
      config,
    };
    const axiosErr = new Error(err.message || "Request failed");
    axiosErr.response = errorResponse;
    return Promise.reject(axiosErr);
  }
}

// Intercept window.fetch for direct fetch calls
export function patchWindowFetch() {
  if (typeof window === "undefined" || window.__negus_fetch_patched) return;
  window.__negus_fetch_patched = true;

  const originalFetch = window.fetch;
  window.fetch = async function (input, init = {}) {
    const urlString = typeof input === "string" ? input : input?.url || "";

    // Check if URL is an API call
    const isApiCall =
      urlString.startsWith("/api") ||
      urlString.includes("/api/") ||
      urlString.includes("/courses/stream") ||
      urlString.includes("/video/") ||
      urlString.includes("/contact");

    if (isMockEnabled() && isApiCall) {
      let body = init?.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          // keep string
        }
      }

      try {
        const res = await dispatchMockApi(init?.method || "GET", urlString, body);
        return new Response(JSON.stringify(res.data), {
          status: res.status || 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        const status = err.response?.status || 500;
        return new Response(JSON.stringify({ message: err.message || "Failed" }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return originalFetch.apply(this, arguments);
  };
}
