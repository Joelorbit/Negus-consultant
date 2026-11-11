import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import MobileDock from "./components/MobileDock";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";
import ReactGA from "react-ga4";
import { RoleGuard } from "./components/RoleGuard";
import BuyCourseBanner from "./components/BuyCourseBanner";
import { useMe } from "./hooks/useAuth";
import ChatRoom from "./components/ChatRoom";
import { Component, lazy, Suspense, useEffect } from "react";

const lazyPage = (loader) => lazy(loader);

class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="route-error" role="alert">
        <div className="route-error-card">
          <span className="route-loading-mark" aria-hidden="true">N</span>
          <h1>That page could not render</h1>
          <p>Try the page again or return to the Negus home page.</p>
          <div className="route-error-actions">
            <button type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a href="/">Go home</a>
          </div>
        </div>
      </main>
    );
  }
}
const Login = lazyPage(() => import("./pages/Login/Login"));
const Register = lazyPage(() => import("./pages/Register/Register"));
const VerifyEmail = lazyPage(() => import("./pages/VerifyEmail/VerifyEmail"));
const Home = lazyPage(() => import("./pages/Home/Home"));
const Packages = lazyPage(
  () => import("./pages/admin/Dashboard/Packages/Packages"),
);
const Layout = lazyPage(() => import("./pages/admin/Dashboard/Layout"));
const DashboardOverview = lazyPage(
  () => import("./pages/admin/Dashboard/Overview/DashboardOverview"),
);
const PackageInstruction = lazyPage(
  () => import("./pages/Package/PackageInstruction"),
);
const Payments = lazyPage(
  () => import("./pages/admin/Dashboard/Payments/Payments"),
);
const Profile = lazyPage(() => import("./pages/Profile/Profile"));
const ChatWindow = lazyPage(
  () => import("./pages/Profile/Components/ChatWindow"),
);
const Mentors = lazyPage(
  () => import("./pages/admin/Dashboard/Mentors/Mentors"),
);
const Courses = lazyPage(
  () => import("./pages/admin/Dashboard/Courses/Courses"),
);
const MentorsPage = lazyPage(() => import("./pages/Mentors/Mentor"));
const MentorProfile = lazyPage(
  () => import("./pages/Mentors/components/MentorProfile"),
);
const ApplyMentor = lazyPage(() => import("./pages/Mentors/ApplyMentor"));
const MyConnections = lazyPage(() => import("./pages/Mentors/MyConnections"));
const AuthLayout = lazyPage(() => import("./auth/AuthLayout"));
const Course = lazyPage(() => import("./pages/Course/Course"));
const TestimonialsPage = lazyPage(
  () => import("./pages/Testimonials/Testimonials"),
);
const AboutUs = lazyPage(() => import("./pages/About/AboutUs"));
const Blog = lazyPage(() => import("./pages/admin/Dashboard/Blog/Blog"));
const BlogDetail = lazyPage(() =>
  import("./pages/admin/Dashboard/Blog/detail/BlogDetail").then((m) => ({
    default: m.BlogDetail,
  })),
);
const PackagesPage = lazyPage(() => import("./pages/Packages/Packages"));
const PackageMultiStepForm = lazyPage(
  () => import("./pages/Packages/wizard/PackageMultiForm"),
);
const Applications = lazyPage(
  () => import("./pages/admin/Dashboard/Applications/Applications"),
);
const MentorDetails = lazyPage(
  () => import("./pages/Testimonials/id/MentorDetails"),
);
const ContactMessages = lazyPage(
  () => import("./pages/admin/Dashboard/ContactMessages/ContactMessages"),
);
const Users = lazyPage(() => import("./pages/admin/Dashboard/Users/Users"));
const MemoryMonitor = lazyPage(
  () => import("./pages/admin/Dashboard/MemoryMonitor/MemoryMonitor"),
);
const MentorApplications = lazyPage(
  () => import("./pages/admin/Dashboard/MentorApplications/MentorApplications"),
);
const RoleManagement = lazyPage(
  () => import("./pages/admin/Dashboard/RoleManagement/RoleManagement"),
);
const EmailManagement = lazyPage(
  () => import("./pages/admin/Dashboard/Email/EmailManagement"),
);
const CourseForm = lazyPage(
  () => import("./pages/Packages/Components/CourseForm"),
);
const BlogsPage = lazyPage(() => import("./pages/Blogs/Blogs"));
const Files = lazyPage(() => import("./pages/Files/Files"));
const ReferralTree = lazyPage(
  () => import("./pages/admin/Dashboard/CoursesTree/CoursesTree"),
);
const NCourses = lazyPage(
  () => import("./pages/admin/Dashboard/NCourses/NCourses"),
);
const ChooseRole = lazyPage(() => import("./pages/Register/ChooseRole"));
const StudentBookings = lazyPage(
  () => import("./pages/Bookings/StudentBookings"),
);
const MentorBookings = lazyPage(
  () => import("./pages/Bookings/MentorBookings"),
);
const MentorBenefits = lazyPage(() => import("./pages/Mentors/MentorBenefits"));
const NotFound = lazyPage(() => import("./pages/NotFound"));

// Your newly integrated components & pages:
const ScholarshipsPage = lazyPage(
  () => import("./pages/Scholarships/Scholarships"),
);
const ScholarshipDetailPage = lazyPage(
  () => import("./pages/Scholarships/ScholarshipDetail"),
);
const Scholarships = lazyPage(
  () => import("./pages/admin/Dashboard/Scholarships/Scholarships"),
);
const CollegePackages = lazyPage(
  () => import("./pages/CollegePackages/CollegePackages"),
);
const CollegeOrders = lazyPage(
  () => import("./pages/admin/Dashboard/CollegeOrders/CollegeOrders"),
);
const CollegePayments = lazyPage(
  () => import("./pages/admin/Dashboard/CollegePayments/CollegePayments"),
);
const TrainingPage = lazyPage(() => import("./pages/Training/Training"));
const TrainingDetailPage = lazyPage(
  () => import("./pages/Training/TrainingDetail"),
);
const SatIeltsPage = lazyPage(() => import("./pages/SatIelts/SatIelts"));
const FreeToolsPage = lazyPage(() => import("./pages/FreeTools/FreeTools"));
const FreeTourPage = lazyPage(() => import("./pages/FreeTour/FreeTour"));

const navbarRoutesToHide = [
  "/login",
  "/register",
  "/profile/messages",
  "/mentor/messages",
  "/app",
  "/dashboard",
];
const footerRoutesToHide = [
  "/login",
  "/register",
  "/profile/messages",
  "/mentor/messages",
  "/app",
  "/dashboard",
];

const App = () => {
  const { data: user } = useMe();
  const location = useLocation();

  const hideNavbar = navbarRoutesToHide.some((route) =>
    location.pathname.startsWith(route),
  );
  const hideFooter = footerRoutesToHide.some((route) =>
    location.pathname.startsWith(route),
  );
  const isCourseArea =
    location.pathname === "/courses" ||
    location.pathname.startsWith("/courses/") ||
    location.pathname === "/files";

  useEffect(() => {
    ReactGA.initialize("G-SDR9JNX304");
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <ThemeProvider defaultTheme="light">
      {!hideNavbar && <Navbar />}
      {isCourseArea && user?.subscription_status === false && (
        <BuyCourseBanner />
      )}
      <Suspense
        fallback={
          <div
            className="route-loading"
            role="status"
            aria-label="Loading page"
          >
            <span className="route-loading-mark">N</span>
            <span>Loading your next chapter…</span>
          </div>
        }
      >
        <RouteErrorBoundary resetKey={location.key || location.pathname}>
          <Routes>
          <Route path="/app" element={<AuthLayout />} />

          <Route index element={<Home />}></Route>
          <Route
            path="/payment/:id"
            element={
              <div className="public-package-flow">
                <PackageInstruction />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/messages/:id" element={<ChatWindow />} />
          <Route path="/mentor/messages/:id" element={<ChatWindow />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/mentor/apply" element={<ApplyMentor />} />
          <Route path="/mentor/connections" element={<MyConnections />} />
          <Route path="/mentor/benefits" element={<MentorBenefits />} />

          <Route path="/mentor/student" element={<StudentBookings />} />
          <Route path="/mentor/profile" element={<MentorBookings />} />
          <Route path="/mentor/chat-room" element={<ChatRoom />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/choose-role" element={<ChooseRole />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training/:id" element={<TrainingDetailPage />} />
          <Route path="/sat-ielts" element={<SatIeltsPage />} />
          <Route path="/free-tools" element={<FreeToolsPage />} />
          <Route path="/free-tour" element={<FreeTourPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonials/:id" element={<MentorDetails />} />

          <Route path="/packages" element={<CollegePackages />}></Route>
          <Route path="/packages/courses" element={<PackagesPage />}></Route>
          <Route
            path="/packages/:id"
            element={
              <div className="public-package-flow">
                <PackageMultiStepForm />
              </div>
            }
          />
          <Route
            path="/packages/full-course/:id"
            element={
              <div className="public-package-flow">
                <CourseForm />
              </div>
            }
          />

          <Route path="/files" element={<Files />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />

          <Route
            path="/dashboard/*"
            element={
              <RoleGuard allowedRoles={["admin", "semiadmin"]} fallbackPath="/">
                <Layout />
              </RoleGuard>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route
              path="scholarships"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <Scholarships />
                </RoleGuard>
              }
            />
            <Route
              path="packages"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <Packages />
                </RoleGuard>
              }
            />
            <Route
              path="payments"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <Payments />
                </RoleGuard>
              }
            />
            <Route
              path="college-payments"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <CollegePayments />
                </RoleGuard>
              }
            />
            <Route
              path="college-orders"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <CollegeOrders />
                </RoleGuard>
              }
            />
            <Route
              path="courses"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <Courses />
                </RoleGuard>
              }
            />
            <Route
              path="courses-tree"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <ReferralTree />
                </RoleGuard>
              }
            />
            <Route
              path="courses-n"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <NCourses />
                </RoleGuard>
              }
            />
            <Route
              path="applications"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <Applications />
                </RoleGuard>
              }
            />
            <Route
              path="mentor-applications"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <MentorApplications />
                </RoleGuard>
              }
            />
            <Route
              path="contact-messages"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <ContactMessages />
                </RoleGuard>
              }
            />
            <Route
              path="monitor"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <MemoryMonitor />
                </RoleGuard>
              }
            />
            <Route
              path="roles"
              element={
                <RoleGuard allowedRoles={["admin"]}>
                  <RoleManagement />
                </RoleGuard>
              }
            />
            <Route
              path="email"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <EmailManagement />
                </RoleGuard>
              }
            />

            <Route
              path="users"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <Users />
                </RoleGuard>
              }
            />
            <Route
              path="blog"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <Blog />
                </RoleGuard>
              }
            />
            <Route
              path="blog/:id"
              element={
                <RoleGuard allowedRoles={["admin", "semiadmin"]}>
                  <BlogDetail />
                </RoleGuard>
              }
            />
          </Route>

          <Route path="/blogs" element={<BlogsPage />} />
          <Route
            path="/blogs/:id"
            element={
              <div className="public-blog-detail">
                <BlogDetail />
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteErrorBoundary>
      </Suspense>

      {!hideFooter && <Footer />}
      {!hideNavbar && <MobileDock />}
      <Toaster richColors />
    </ThemeProvider>
  );
};

export default App;
