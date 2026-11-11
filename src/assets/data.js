//     id: string;
//     name: string;
//     email: string;
//     specialty: string[];
//     position: string;
//     hourlyRate: number;
//     availableDays: string[];
//     rating: number;
//     totalReviews: number;
//     profileImage: string;
//     bio: string;
//     experience: number;
//     education: string[];
//     languages: string[];
//     successRate: number;
//     studentsHelped: number;
//     reviews: Review[];
//   }

//   export interface Review {
//     id: string;
//     studentName: string;
//     rating: number;
//     comment: string;
//     date: string;
//     scholarship: string;
//   }

// ];

export const mentors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@scholarmentor.com",
    specialty: [
      "STEM Scholarships",
      "Graduate School Applications",
      "Research Grants",
    ],
    position: "Former MIT Admissions Officer",
    hourlyRate: 85,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    rating: 4.9,
    totalReviews: 127,
    profileImage:
      "https://images.pexels.com/photos/774909/pexels photo 774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "With over 10 years of experience in academic admissions and scholarship guidance, I've helped over 500 students secure funding for their education. My expertise lies in STEM scholarship applications and graduate school preparation.",
    experience: 10,
    education: ["PhD in Physics   MIT", "MS in Education   Harvard"],
    languages: ["English", "Spanish"],
    successRate: 94,
    studentsHelped: 523,
    reviews: [
      {
        id: "1",
        studentName: "Alex Chen",
        rating: 5,
        comment:
          "Dr. Johnson helped me secure a full scholarship to Stanford! Her guidance on my application essay was invaluable.",
        date: "2024 01 15",
        scholarship: "Stanford Merit Scholarship",
      },
      {
        id: "2",
        studentName: "Maria Rodriguez",
        rating: 5,
        comment:
          "Amazing mentor! She walked me through the entire process and I got the NSF Fellowship.",
        date: "2024 01 10",
        scholarship: "NSF Graduate Research Fellowship",
      },
    ],
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "michael.chen@scholarmentor.com",
    specialty: [
      "Business Scholarships",
      "MBA Applications",
      "Entrepreneurship Grants",
    ],
    position: "Former Harvard Business School Professor",
    hourlyRate: 120,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
    rating: 4.8,
    totalReviews: 89,
    profileImage:
      "https://images.pexels.com/photos/1222271/pexels photo 1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "As a former Harvard Business School professor and entrepreneur, I specialize in helping students navigate business school applications and secure funding for their entrepreneurial ventures.",
    experience: 15,
    education: ["MBA   Harvard Business School", "PhD in Economics   Yale"],
    languages: ["English", "Mandarin"],
    successRate: 91,
    studentsHelped: 387,
    reviews: [
      {
        id: "3",
        studentName: "Jennifer Williams",
        rating: 5,
        comment:
          "Prof. Chen's expertise in MBA applications is unmatched. I received scholarships from 3 top business schools!",
        date: "2024 01 20",
        scholarship: "Wharton MBA Scholarship",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@scholarmentor.com",
    specialty: [
      "Medical Scholarships",
      "Pre med Guidance",
      "Health Sciences Funding",
    ],
    position: "Medical School Admissions Consultant",
    hourlyRate: 95,
    availableDays: ["Tuesday", "Thursday", "Friday", "Sunday"],
    rating: 4.9,
    totalReviews: 156,
    profileImage:
      "https://images.pexels.com/photos/1239291/pexels photo 1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Dedicated to helping aspiring medical professionals achieve their dreams through strategic scholarship applications and pre med guidance. I've successfully guided students to secure over $2M in medical school funding.",
    experience: 8,
    education: ["MD   Johns Hopkins", "MPH   Columbia University"],
    languages: ["English", "Spanish", "Portuguese"],
    successRate: 96,
    studentsHelped: 412,
    reviews: [
      {
        id: "4",
        studentName: "David Park",
        rating: 5,
        comment:
          "Dr. Rodriguez helped me get into my dream medical school with a full scholarship. Her guidance was exceptional!",
        date: "2024 01 25",
        scholarship: "Full Medical School Scholarship",
      },
    ],
  },
  {
    id: "4",
    name: "James Thompson",
    email: "james.thompson@scholarmentor.com",
    specialty: [
      "Arts & Humanities",
      "Creative Writing Grants",
      "Study Abroad Scholarships",
    ],
    position: "Former Fulbright Scholar Advisor",
    hourlyRate: 75,
    availableDays: ["Monday", "Tuesday", "Friday", "Saturday"],
    rating: 4.7,
    totalReviews: 98,
    profileImage:
      "https://images.pexels.com/photos/1681010/pexels photo 1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "As a former Fulbright Scholar and advisor, I specialize in helping students secure funding for creative projects, study abroad programs, and humanities research.",
    experience: 12,
    education: ["MFA in Creative Writing   Iowa", "BA in Literature   Oxford"],
    languages: ["English", "French", "German"],
    successRate: 88,
    studentsHelped: 298,
    reviews: [
      {
        id: "5",
        studentName: "Sarah Kim",
        rating: 5,
        comment:
          "James helped me secure a Fulbright scholarship to study in France. His insights were invaluable!",
        date: "2024 01 18",
        scholarship: "Fulbright Research Grant",
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Lisa Wang",
    email: "lisa.wang@scholarmentor.com",
    specialty: [
      "Engineering Scholarships",
      "Tech Industry Grants",
      "Women in STEM",
    ],
    position: "Google Engineering Manager",
    hourlyRate: 110,
    availableDays: ["Wednesday", "Thursday", "Saturday", "Sunday"],
    rating: 4.8,
    totalReviews: 74,
    profileImage:
      "https://images.pexels.com/photos/1181519/pexels photo 1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Currently an Engineering Manager at Google with a passion for supporting the next generation of engineers, especially women in STEM. I've helped secure over $1.5M in engineering scholarships.",
    experience: 7,
    education: [
      "MS Computer Science   Stanford",
      "BS Engineering   UC Berkeley",
    ],
    languages: ["English", "Mandarin", "Korean"],
    successRate: 92,
    studentsHelped: 201,
    reviews: [
      {
        id: "6",
        studentName: "Ashley Martinez",
        rating: 5,
        comment:
          "Dr. Wang's mentorship was crucial in helping me get the Google Women Techmakers scholarship!",
        date: "2024 01 22",
        scholarship: "Google Women Techmakers Scholarship",
      },
    ],
  },
  {
    id: "6",
    name: "Robert Davis",
    email: "robert.davis@scholarmentor.com",
    specialty: [
      "Law School Scholarships",
      "Legal Writing",
      "Judicial Clerkships",
    ],
    position: "Former Federal Judge Law Clerk",
    hourlyRate: 90,
    availableDays: ["Monday", "Wednesday", "Thursday", "Sunday"],
    rating: 4.9,
    totalReviews: 112,
    profileImage:
      "https://images.pexels.com/photos/1043471/pexels photo 1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Former federal judge law clerk and current practicing attorney specializing in helping pre law students secure scholarships and prestigious clerkships.",
    experience: 9,
    education: ["JD   Yale Law School", "BA Political Science   Princeton"],
    languages: ["English"],
    successRate: 95,
    studentsHelped: 334,
    reviews: [
      {
        id: "7",
        studentName: "Michael Brown",
        rating: 5,
        comment:
          "Robert's guidance was instrumental in helping me secure a full scholarship to law school and a federal clerkship!",
        date: "2024 01 16",
        scholarship: "Full Law School Merit Scholarship",
      },
    ],
  },
];
export const videos = [
  {
    id: "intro to scholarships",
    title: "Introduction to Scholarships",
    description:
      "Learn how to apply for global scholarships with expert tips and real life examples.",
    thumbnail: "https://placehold.co/600x400", // Replace with actual image
    duration: "1h 45min",
    tags: ["Scholarships", "Study Abroad"],
    level: "Beginner", // corrected from difficulty
    instructor: {
      name: "Emily Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Scholarship Coach",
    },
    rating: 4.8,
    enrolledStudents: 4523,
    price: 0,
    progress: 30,
    videoUrl: "https://www.youtube.com/watch?v=Qw4w9WgXcQ", // Scholarship guide video
    youtubeId: "Qw4w9WgXcQ", // YouTube video ID
  },
  {
    id: "web dev crash course",
    title: "Web Development Crash Course",
    description:
      "Kickstart your career in web development with this fast paced beginner course.",
    thumbnail: "https://placehold.co/600x400?text=Web+Dev",
    duration: "2h 10min",
    tags: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    instructor: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Full Stack Developer",
    },
    rating: 4.6,
    enrolledStudents: 6230,
    price: 19.99,
    progress: 50,
    videoUrl: "https://www.youtube.com/watch?v=916GWv2Qs08", // Web development tutorial
    youtubeId: "916GWv2Qs08", // YouTube video ID
  },
  {
    id: "ai ml advanced",
    title: "Advanced AI & Machine Learning",
    description: "Master cutting edge AI concepts and machine learning models.",
    thumbnail: "https://placehold.co/600x400?text=AI+ML",
    duration: "3h 30min",
    tags: ["AI", "Deep Learning", "Neural Networks"],
    level: "Advanced",
    instructor: {
      name: "Dr. Alan Turing",
      avatar: "https://randomuser.me/api/portraits/men/99.jpg",
      title: "AI Researcher",
    },
    rating: 4.9,
    enrolledStudents: 2100,
    price: 49.99,
    progress: 10,
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk", // AI/ML tutorial
    youtubeId: "aircAruvnKk", // YouTube video ID
  },
  {
    id: "react fundamentals",
    title: "React Fundamentals for Beginners",
    description:
      "Learn React from scratch with hands on projects and real world examples.",
    thumbnail: "https://placehold.co/600x400?text=React",
    duration: "4h 15min",
    tags: ["React", "JavaScript", "Frontend"],
    level: "Intermediate",
    instructor: {
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      title: "React Developer",
    },
    rating: 4.7,
    enrolledStudents: 8900,
    price: 29.99,
    progress: 0,
    videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0", // React tutorial
    youtubeId: "Ke90Tje7VS0", // YouTube video ID
  },
  {
    id: "python data science",
    title: "Python for Data Science",
    description:
      "Master Python programming for data analysis, visualization, and machine learning.",
    thumbnail: "https://placehold.co/600x400?text=Python",
    duration: "5h 30min",
    tags: ["Python", "Data Science", "Pandas", "NumPy"],
    level: "Intermediate",
    instructor: {
      name: "Dr. Alex Kumar",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      title: "Data Scientist",
    },
    rating: 4.9,
    enrolledStudents: 15600,
    price: 39.99,
    progress: 0,
    videoUrl: "https://www.youtube.com/watch?v=WGJJIrtnfpk", // Python tutorial
    youtubeId: "WGJJIrtnfpk", // YouTube video ID
  },
];

export const categories = [
  {
    id: "all",
    name: "All",
    icon: "🌐",
    count: 120,
  },
  {
    id: "webdev",
    name: "Web Development",
    icon: "💻",
    count: 34,
  },
  {
    id: "design",
    name: "Design",
    icon: "🎨",
    count: 18,
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📈",
    count: 27,
  },
  {
    id: "business",
    name: "Business",
    icon: "💼",
    count: 21,
  },
  {
    id: "ai",
    name: "AI & ML",
    icon: "🧠",
    count: 20,
  },
];
export const MAINPACKAGES = [
  {
    id: "1",
    name: "Mentorship & Guidance",
    icon: "Users",
    color: "from blue 500 to blue 600",
    borderColor: "border blue 500",
    bgColor: "bg blue 50",
    textColor: "text blue 900",
    originalPrice: "6,000",
    price: "4,000",
    currency: "Birr",
    period: "One time",
    discount: null,
    description: "Perfect for independent students who want expert guidance",
    features: [
      { name: "Weekly or on demand mentorship", included: true },
      { name: "Common App walkthrough", included: true },
      { name: "Essay topic brainstorming", included: true },
      { name: "Final feedback on self written essays", included: true },
      { name: "Personal statement writing", included: false },
      { name: "Supplemental essay writing", included: false },
      { name: "Financial aid guidance", included: false },
      { name: "Application submission support", included: false },
    ],
  },
  {
    id: "2",
    name: "Essay Writing Package",
    icon: "FileText",
    color: "from purple 500 to purple 600",
    borderColor: "border purple 500",
    bgColor: "bg purple 50",
    textColor: "text purple 900",
    price: "2,000",
    originalPrice: "3,000",
    currency: "Birr",
    period: "Starting from",
    discount: "Popular Choice",
    description: "Expert written essays tailored to your voice and story",
    features: [
      { name: "Personal statement writing (2,000 Birr)", included: true },
      { name: "Supplemental essays", included: true },
      { name: "Tailored responses for specific prompts", included: true },
      { name: "Revisions based on feedback", included: true },
      { name: "Delivered in editable format", included: true },
      { name: "Application strategy consultation", included: false },
      { name: "Financial aid guidance", included: false },
      { name: "Common App setup", included: false },
    ],
    popular: true,
  },
  {
    id: "3",
    name: "Full Application Support",
    icon: "Crown",
    color: "from amber 500 to amber 600",
    borderColor: "border amber 500",
    bgColor: "bg amber 50",
    textColor: "text amber 900",
    price: "25,000",
    originalPrice: "29,999",
    currency: "Birr",
    period: "3 part payment",
    discount: "Best Value",
    description:
      "Complete end to end assistance with your university applications",
    features: [
      {
        name: "Strategy consultation + full application plan",
        included: true,
      },
      {
        name: "Common App setup & submission (up to 3 universities)",
        included: true,
      },
      {
        name: "Personal statement & supplemental essay writing",
        included: true,
      },
      { name: "Financial aid guidance (incl. CSS Profile)", included: true },
      {
        name: "Application tracking portal + regular updates",
        included: true,
      },
      { name: "Recommendation letter evaluation", included: true },
      { name: "Visa approval support", included: true },
      { name: "Dedicated support throughout process", included: true },
    ],
  },
];
// export const MAINPACKAGES = [
//   {
//     id: "starter",
//     name: "Starter",
//     icon: "Star",
//     price: 29,
//     originalPrice: 39,
//     period: "/month",
//     description: "Perfect for individuals getting started",
//     features: [
//       { name: "Up to 5 projects", included: true },
//       { name: "Basic support", included: true },
//       { name: "2GB storage", included: true },
//       { name: "Standard templates", included: true },
//       { name: "Email support", included: true },
//       { name: "Priority support", included: false },
//       { name: "Advanced analytics", included: false },
//       { name: "Custom integrations", included: false },
//     ],
//   },
//   {
//     id: "pro",
//     name: "Professional",
//     icon: "Crown",
//     discount: "20% OFF",
//     price: 79,
//     originalPrice: 99,
//     period: "/month",
//     popular: true,
//     description: "Best for growing businesses and teams",
//     features: [
//       { name: "Unlimited projects", included: true },
//       { name: "Priority support", included: true },
//       { name: "50GB storage", included: true },
//       { name: "Premium templates", included: true },
//       { name: "Email & chat support", included: true },
//       { name: "Advanced analytics", included: true },
//       { name: "Team collaboration", included: true },
//       { name: "Custom integrations", included: false },
//     ],
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     icon: "Zap",
//     discount: "25% OFF",
//     price: 199,
//     originalPrice: 249,
//     period: "/month",
//     description: "For large organizations with custom needs",
//     features: [
//       { name: "Unlimited everything", included: true },
//       { name: "24/7 phone support", included: true },
//       { name: "Unlimited storage", included: true },
//       { name: "Custom templates", included: true },
//       { name: "Dedicated account manager", included: true },
//       { name: "Advanced analytics", included: true },
//       { name: "Team collaboration", included: true },
//       { name: "Custom integrations", included: true },
//     ],
//   },
// ];

export const ADDITIONALSERVICES = [
  {
    name: "Essay Editing & Feedback",
    services: [
      { name: "Personal Essay Editing", price: "1,000 Birr" },
      { name: "Supplemental Essay Editing", price: "500 Birr" },
      { name: "Feedback Only (Personal Essay)", price: "500 Birr" },
      { name: "Feedback Only (Supplemental)", price: "250 Birr" },
    ],
  },
  {
    name: "Common App Only Package",
    services: [
      { name: "Account setup & walkthrough", price: "1,000 Birr" },
      { name: "Section by section guidance", price: "Included" },
      { name: "Final review before submission", price: "Included" },
    ],
  },
  {
    name: "Financial Services",
    services: [
      { name: "CSS Profile Support", price: "500 Birr" },
      { name: "ISFAA Support", price: "500 Birr" },
    ],
  },
];
export const testimonialsData = [
  {
    id: 1,
    studentName: "Abrham",
    university: "New York University",
    program: "Computer Engineering   English",
    image: "/test6.jpg",
    testimonial:
      "Thanks to the guidance I received, I successfully secured my spot at New York University for Computer Engineering! The support throughout the application process made everything smooth and stress free.",
    degree: "Bachelor",
    year: "2024 2025",
    country: "New York",
    status: "Accepted",
  },

  {
    id: 1,
    studentName: "Ahmed",
    university: "Istanbul Beykent University",
    program: "Computer Engineering   English",
    image: "/test3.jpg",
    testimonial:
      "I'm thrilled to share that I've been accepted to Istanbul Beykent University for Computer Engineering! The consultancy helped me navigate the application process smoothly.",
    degree: "Bachelor",
    year: "2024 2025",
    country: "Turkey",
    status: "Accepted",
  },
  {
    id: 2,
    studentName: "Yohannes",
    university: "Final International University",
    program: "Software Engineering",
    image: "/test2.jpg",
    testimonial:
      "Received conditional acceptance to Final International University with a 70% scholarship! The guidance I received was invaluable in securing this opportunity.",
    degree: "Bachelor",
    year: "2024 2025",
    country: "Cyprus",
    status: "Conditional Acceptance",
  },
  {
    id: 3,
    studentName: "Leulseged",
    university: "Sarah Lawrence College,Georgetown & 4 other",
    program: "Liberal Arts",
    image: " /test4.jpg ",
    testimonial:
      "Accepted to Sarah Lawrence College! The personalized approach and attention to detail in my application made all the difference.",
    degree: "Bachelor",
    year: "2025",
    country: "USA",
    status: "Accepted",
  },
  {
    id: 4,
    studentName: "Nathnael",
    university: "Williams College",
    program: "Liberal Arts",
    image: "/test5.jpg ",
    testimonial:
      "Placed on the waiting list at Williams College   one of the most competitive liberal arts colleges in the US. The consultancy helped me craft a compelling application.",
    degree: "Bachelor",
    year: "2029",
    country: "USA",
    status: "Waiting List",
  },
  {
    id: 5,
    studentName: "Melat",
    university: "Drexel University",
    program: "Computer Science",
    image: "/test1.jpg",
    testimonial:
      "Congratulations! Admitted to Drexel University for Computer Science. The expert guidance helped me present my best self in the application.",
    degree: "BS in Computer Science",
    year: "2025 2026",
    country: "USA",
    status: "Accepted",
  },
  {
    id: 6,
    studentName: "Nebiyu",
    university: "New york univercity 2029",
    program: "Computer Science",
    image: "/test7.jpg",
    testimonial: "Congratulations! on behalf of admissions commitee.",
    degree: "Computer Science",
    year: "2029",
    country: "USA",
    status: "Accepted",
  },
  {
    id: 7,
    studentName: "Abrham Sinshaw",
    university: "Howard University",
    program: "Computer Science",
    image: "/test8.jpg",
    testimonial:
      "You've done it! Congratulations, we are pleased to offer you admission into Howard University for the Fall 2024 semester. You have been admitted into our Computer Science program.",
    degree: "Bachelor",
    year: "2024",
    country: "USA",
    status: "Accepted",
  },
  {
    id: 8,
    studentName: "Melat",
    university: "Illinois College",
    program: "Liberal Arts",
    image: "/test9.jpg",
    testimonial:
      "Congratulations! On behalf of the Illinois College community, it is my pleasure to welcome you as a new student beginning fall 2025. We are confident that you will make a significant contribution to the tradition of excellence that began at Illinois College in 1829.",
    degree: "Bachelor",
    year: "2025",
    country: "USA",
    status: "Accepted",
  },
  {
    id: 9,
    studentName: "Leulseged",
    university: "Hult International Business School",
    program: "Bachelor of Business Administration",
    image: "/test10.jpg",
    testimonial:
      "Congratulations on your conditional acceptance to our Bachelor of Business Administration program! We received exceptionally strong applications for our September term, but your demonstration of the Hult DNA proved to our Admissions Committee that you're exactly the type of student we want to have in our global community.",
    degree: "Bachelor",
    year: "2025",
    country: "Multiple Campuses",
    status: "Conditionally Accepted",
  },
];

export const sampleResources = [
  {
    id: "0",
    title: "All 13 Necessary Books",
    description:
      "Detailed insights into scholarships, eligibility requirements, and strategies to maximize your chances of winning financial aid.",
    category: "Scholarship Guides",
    tags: ["Scholarship", "Funding", "Opportunities"],
    format: "PDF",
    size: "600 MB",
    price: 0,
    isFree: true,
    thumbnail: "./pdf_books.png", // cover image from your file
    isPurchased: false,
    path: "https://t.me/NEGUSCONSULTANTS/529",
  },
  {
    id: "1",
    title:
      "The Ultimate Scholarship Playbook: Strategies to Fund Your Education",
    description:
      "Detailed insights into scholarships, eligibility requirements, and strategies to maximize your chances of winning financial aid.",
    category: "Scholarship Guides",
    tags: ["Scholarship", "Funding", "Opportunities"],
    format: "HTML",
    size: "22 KB",
    isFree: false,
    thumbnail: "./Best-Scholarship-Application-Strategies.jpg",
    isPurchased: false,
    path: "./web1.html",
    fileUrl: "/web1.html",
    content: `<b>The Ultimate College Application Guide
Your pathway to admissions success
Prepared for Challenge winner students
</b>

Outline
</br>
<ol>
<li>1. College Application Process</li>
<li>2. Activities List</li>
<li>3. Honors Section</li>
<li>4. Common App Personal Essay</li>
<li>5. Supplemental Essays</li>
<li>6. Letters of Recommendation</li>
<li>7. Application Timelines</li>
<li>8. Financial Aid</li>
</ol>
</br>

<b>College Application Process</b>
The Common Application (Common App) is an online portal that lets students apply to many colleges with one standardized application.
The Common App now serves over 1,000 member institutions (public, private, and international), helping ~1.4 million students submit around 9 million applications in 2023–24.
</br>

<b>The Activities List</b>
The Activities List gives admissions officers a clear look at what you’ve done outside the classroom — your passions, leadership, and impact.
</br>
Core Principles for a Strong Activities List
</br>
  ✓ Prioritize: List your most significant activities first.</br>
  ✓ Be Specific: Use concrete details and numbers to quantify involvement.</br>
  ✓ Use Action Verbs: Start each entry with a strong, active verb.</br>
  ✓ Maintain Tense: Use present tense for ongoing activities and past tense for completed ones.</br>

Crafting the Perfect Description</br>
Use concise, bullet like phrasing to fit within 150 characters.</br>

<b>Example</b>: Debate Club President</br>
<b>Weak</b>: “I was the president of the debate club. I organized meetings and helped new members.”</br>
<b>Strong</b>: “Led weekly meetings for 30+ members. Organized regional tournament, coached new debaters; won ‘Best Club’ award.”</br>

<b>Example</b>: Volunteering</br>
<b>Weak</b>: “I helped at the local animal shelter. I fed the animals and cleaned cages.”</br>
<b>Strong</b>: “Organized fundraising event for shelter, raising over $5,000. Cared for 25+ animals weekly; trained new volunteers.”</br>

<b>Example</b>: Part Time Job</br>
<b>Weak</b>: “Worked at a coffee shop for two years.”</br>
<b>Strong</b>: “Managed daily cash flow and inventory for busy café. Trained 4 new employees; developed loyalty program boosting sales 15%.”</br>


<b>The Honors Section</b></br>
This section highlights your top awards, scholarships, and recognitions (up to five entries).</br>

Key Principles</br>

  ✓ Be Selective and Prioritize: Focus on significant awards.</br>
  ✓ Explain and Clarify: Briefly explain the award’s meaning and spell out acronyms.</br>
  ✓ Quantify Your Achievement: Use numbers to show scope or ranking.</br>
  ✓ Combine Similar Honors: Group related awards to save space.</br>

<b>Example Honors Listing</b></br>
“Gold Medal – Congressional Award (community service) – 400+ volunteer hours; Science Olympiad State Champion – Robotics (1st place, 50 schools).”</br>


<b>Common App Personal Essay</b></br>
The Common App offers seven prompts for a 650 word essay to show your growth, values, and personality.</br>

<b>Understanding the Prompts</b>
</br>
<ol>
  <li>1. Background, identity, interest, or talent – Explain what makes you unique.</li>
  <li>2. Lessons from obstacles – Focus on resilience and learning.</li>
  <li>3. Challenging a belief or idea – Showcase your critical thinking.</li>
  <li>4. Reflect on something someone has done for you – Emphasize gratitude and empathy.</li>
  <li>5. Describe a problem you’ve solved – Demonstrate creativity and initiative.</li>
  <li>6. An accomplishment or realization – Highlight growth and new understanding.</li>
  <li>7. Any topic – Share a unique personal story revealing your values or character.</li>

</ol>
<b>A Classic Essay Structure</b></br>

  ✓ Hook: Capture attention with a vivid start.</br>
  ✓ Context: Provide quick background.</br>
  ✓ Catalyst/Challenge: Describe the central event or issue.</br>
  ✓ Outcome & Growth: Explain how you changed or what you learned.</br>
  ✓ Reflection: Connect lessons to future goals or values.</br>


<b>Supplemental Essays</b></br>
These essays show how you’ll contribute to a specific college.</br>

“Why This College?” Essays</br>

  ✓ Avoid generic statements about rankings or location.</br>
  ✓ Include researched details about majors, professors, or programs.</br>

<b>Example</b></br>
<b>Vague</b>: “I want to attend ABC University because of its great engineering program.”</br>
<b>Strong</b>: “My fascination with sustainable design led me to Dr. Sharma’s course on self healing concrete at ABC University…”</br>

Academic Interests Essays
</br>
<ol>
  <li>1. Origin Story – How your interest began.</li>
  <li>2. Deepening – How you pursued it through activities or research.</li>
  <li>3. College Connection – Tie it to the school’s resources or faculty.</li>
</ol>
Community, Diversity, and Values Prompts
</br>
<ol>
  <li>1. Personal Anecdote – Start with a specific story about identity or experience.</li>
  <li>2. Connection – Show how it changed your perspective.</li>
  <li>3. Contribution – Explain how you’ll add to the campus community.</li>
</ol>

<b>Letters of Recommendation</b></br>
These letters add depth to your academic and personal profile.</br>

Choosing the Right Recommenders</br>

  ✓ Teacher Recommendations (2): Pick teachers who know you well, ideally from different subjects.</br>
  ✓ Counselor Recommendation (1): Offers holistic context on your performance and growth.</br>
  ✓ Other Recommender (Optional): Coaches, mentors, or employers can add valuable perspectives.</br>

<b>How to Request a Recommendation</b>
</br>
  <ol>
  <li>1. Ask in person and confirm willingness.</li>
  <li>2. Provide a “Brag Sheet” — resume, activity list, and college deadlines.</li>
  <li>3. Give 2–4 weeks’ notice.</li>
  <li>4. Send a thank you note after submission.</li>
</ol>

<b>Application Timelines</b></br>

  ✓ Early Action (EA): Non binding, apply early, get results by Dec–Jan.</br>
  ✓ Early Decision (ED): Binding; boosts odds but limits flexibility.</br>
  ✓ Regular Decision (RD): Apply Jan–Feb, hear by Mar–Apr.</br>
  ✓ Rolling Admission: Continuous review; apply early for best results.</br>


<b>Financial Aid</b></br>

  ✓ Need Based Aid: Based on family financial situation (FAFSA).</br>
  ✓ Merit Based Aid: Based on achievements or talent.</br>
  ✓ Need Blind vs. Need Aware: Determines if financial status affects admission.</br>
  ✓ FAFSA, CSS Profile, ISFAA: Key forms for aid (U.S. and international).</br>
  ✓ “Meets Full Need”: College covers 100% of demonstrated need (may include loans).</br>

© 2025 Negus Consultants
Designed with ❤️ for students
Contact us and work with us on your application
Join our channel
`,
  },
  {
    id: "2",
    title: "Crafting Impact: How to Master the Common App Activities Section",
    description:
      "Comprehensive guide to building a powerful Common App activities list with examples, mistakes to avoid, and strategic tips.",
    category: "Application Guides",
    tags: ["Common App", "Activities", "University Application"],
    format: "HTML",
    size: "33 KB",
    isFree: false,
    thumbnail: "./common_app.png",
    isPurchased: false,
    path: "./web2.html",
    fileUrl: "/web2.html",
    content: `<b>Mastering the Common App Activities Section</b>
</br>
A comprehensive guide to leveraging your extracurriculars, responsibilities, and unique experiences to craft a powerful narrative for admissions.


<b> Overview</b>

<ol>
  <li>1. Importance</li>
  <li>2. Building</li>
  <li>3. Description</li>
  <li>4. Mistakes</li>
  <li>5. Examples</li>
  <li>6. Conclusion</li>
</ol>

<b> The Strategic Importance of Your Activities List</b>

The Activities section is not a simple checklist. It is a pivotal part of the holistic admissions review, offering a unique window into your character, passions, and potential contributions beyond academic metrics.

<b> Beyond Grades: What Admissions Officers Seek</b>

Admissions officers aim to understand who you are outside the classroom. This section adds *persona* to your application, revealing strengths and qualities that numbers alone cannot show. A well crafted list demonstrates how you’ll uniquely enhance the college community.
</br>
<ol>
  <li>1. Provides insight into your unique pursuits, interests, and passions.</li>
  <li>2. Reveals personal strengths that grades and scores cannot capture.</li>
  <li>3. Showcases your potential positive impact on campus life.</li>
</ol>

<b>Defining "Activity": Broadening Your Scope</b>

An extracurricular activity on the Common App is broadly defined. Think expansively — it’s not limited to school sponsored organizations.

Examples of valid activities include:

<ol>
  <li>1. School clubs</li>
  <li>2. Paid jobs</li>
  <li>3. Sports teams</li>
  <li>4. Internships</li>
  <li>5. Volunteering</li>
  <li>6. Personal hobbies</li>
  <li>7. Creative projects</li>
  <li>8. Research</li>
</ol>

<b>The Power of Context: Explaining Unique Circumstances</b>  

The Activities section provides a vital space to describe *other responsibilities and circumstances* that have shaped your life — especially family responsibilities. These demonstrate maturity and resilience.

Including these helps admissions officers contextualize your academic and extracurricular record, transforming perceived limitations into strengths.  
If more space is needed, use the “Additional Information” section of the Common App.


<b>Building Your Activities List: Selection and Prioritization</b>

Strategic selection and thoughtful ordering are crucial to an impactful Activities List. Focus on *quality*, not quantity.

<b>Quality Over Quantity</b>

You may list up to ten activities, but it’s not required. Prioritize experiences that best convey your personal story and reflect genuine interests. A shorter, focused list often makes a stronger impression.

<b>Selecting Your Most Impactful Experiences</b>

Choose activities with significant time commitment, leadership, or achievement. Show evidence of self awareness and personal growth.

<b>Strategic Ordering</b>

Place your most impressive and relevant activities at the top — especially those aligned with your intended major or that required major dedication.

<b>Combining Similar Activities</b>

Group related activities (e.g., “Animal Hospital Volunteer” + “Pet Sitter”) into one entry to save space while highlighting consistent interest.


<b> Mastering the Art of Description: Making Every Character Count</b>

<b> The Character Limits</b>

The Common App’s character limits test your precision. Every word must serve a purpose and demonstrate your impact.

<b> Action Verbs: The Engine of Descriptions</b>

Begin each description with a strong action verb for clarity and energy.

Examples of effective verbs include:  
Implemented, Collaborated, Designed, Coached, Led, Coordinated, Researched, Managed, Organized, Created, Developed, Tutored, Fundraised, Performed.

<b> Quantifying Your Impact</b>

Add measurable results wherever possible — numbers give weight and credibility.

Examples:
<ol>
  <li>1. Instead of “Raised money,” write “Raised $3,000 for local shelters.” </li>
  <li>2. “Tutored 10 students weekly, improving grades by 20%.” </li>
  <li>3. “Managed team of 15,” or “Volunteered 100+ hours.”</li>
</ol>
<b> Showcasing Leadership and Initiative</b>

Leadership is not just a title — it’s initiative and influence. Demonstrate leadership through action oriented phrasing.
<ol>
  <li>1. Guiding/Directing: Led a project or team to achieve measurable results.  </li>
  <li>2. Organizing/Coordinating: Organized events or programs for specific purposes.  </li>
  <li>3. Initiating/Developing: Created or implemented new systems, strategies, or programs.  </li>
</ol>

<b>Consistency, Jargon, and Personality</b>

<b>Consistency in Tense & Punctuation</b>

Use present tense for ongoing activities and past tense for completed ones. Keep punctuation consistent throughout to reflect attention to detail.

<b>Navigating Abbreviations and Jargon</b>

Use abbreviations sparingly and only when clear (e.g., “VP”). Avoid unexplained acronyms or overly technical terms.

<b>Injecting Personality and Authenticity</b>

Your Activities section is not just about achievements — it’s about *you*. Infuse personality and authenticity through wording that reflects genuine passion, curiosity, and initiative.


<b>Common Mistakes to Avoid</b>

<ol>
  <li>1. Vagueness: Avoid broad phrases like “Helped with events.” Be specific and action focused.  </li>
  <li>2. Understating Impact: Emphasize leadership and measurable outcomes.  </li>
  <li>3. Overusing Jargon: Use simple, universal language; explain technical terms if needed.  </li>
  <li>4. Exaggerating Hours: Be truthful — admissions teams recognize realistic commitments.  </li>
  <li>5. Repetition: Avoid repeating roles or details. Each description should add new value.</li>
</ol>

<b>Examples and Transformations</b>

<b>Weak vs. Strong Example 1 — Fundraising</b>

  Weak: “Raised money for charity.”  
  Strong: “Led team to raise $5K for local shelters via community bake sales and auctions.”

<b>Weak vs. Strong Example 2 — Tutoring</b>

  Weak: “Helped students with math.”  
  Strong: “Tutored 10 students weekly, improving grades by an average of 20%.”

<b>Weak vs. Strong Example 3 — Leadership</b>

  Weak: “Worked on school newspaper.”  
  Strong: “As editor, revamped layout, doubled readership, trained 5 new writers.”


<b>Conclusion and Recommendations</b>

The Activities section is a strategic storytelling opportunity. With a thoughtful approach, it can become one of the strongest parts of your application.

<b>Key Takeaways</b>
<ol>
  <li>1. Start Early and Reflect Deeply — brainstorm, draft, and refine over time.  </li>
  <li>2. Prioritize Quality Over Quantity — choose experiences that truly matter.  </li>
  <li>3. Master Concise Communication — use strong verbs and quantifiable impact.  </li>
  <li>4. Embrace Unique Circumstances — frame responsibilities as growth stories.  </li>
  <li>5. Infuse Authenticity and Personality — let your individuality shine through.  </li>
</ol>
<b>Final Recommendation</b>

Proofread carefully, revise regularly, and ensure your application tells a cohesive story without redundancy.

The most successful applicants transform a plain list into a compelling personal narrative — a showcase of their unique brand and contribution.


© 2025 Negus Consultants  
Designed with ❤️ for students  
Contact us and collaborate on your application  
Join our channel
`,
  },
];
