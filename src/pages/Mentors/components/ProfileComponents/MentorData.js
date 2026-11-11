export const mentor = {
  name: "Dr. Sarah Chen",
  title: "Principal Engineer",
  company: "Stripe",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  rating: 4.9,
  reviewCount: 127,
  bio: "I'm a Principal Engineer at Stripe with 12+ years of experience building scalable distributed systems. I'm passionate about helping engineers grow their careers, navigate complex technical decisions, and develop leadership skills. My mentoring style focuses on practical, actionable guidance tailored to your specific situation.",
  specializations: [
    "System Design",
    "Career Growth",
    "Leadership",
    "Distributed Systems",
    "API Design",
  ],
  languages: ["English", "Mandarin", "French"],
  highlights: [
    "Led architecture of Stripe's payment processing pipeline",
    "Grew team from 4 to 30 engineers",
    "Published author on distributed systems",
    "Speaker at QCon, Strange Loop, and KubeCon",
  ],
  stats: {
    sessionsCompleted: 842,
    yearsExperience: 12,
    studentsMentored: 156,
    rating: 4.9,
  },
  education: [
    {
      institution: "MIT",
      degree: "Ph.D. Computer Science",
      year: "2014",
      focus: "Distributed Systems",
    },
    {
      institution: "Stanford University",
      degree: "B.S. Computer Science",
      year: "2009",
      focus: "Software Engineering",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      date: "Jan 28, 2026",
      text: "Sarah helped me prepare for my system design interview at Google. Her structured approach and deep technical knowledge were invaluable. I got the offer!",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      date: "Jan 15, 2026",
      text: "Incredible mentor. Sarah gave me clarity on my career path and actionable steps to transition from IC to engineering manager. Highly recommend.",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      rating: 4,
      date: "Dec 20, 2025",
      text: "Very knowledgeable about API design patterns. The session was well-structured and I walked away with concrete improvements for my project.",
    },
  ],
  availability: [
    {
      day: "Monday",
      available: true,
      slots: ["9:00 AM", "11:00 AM", "2:00 PM"],
    },
    {
      day: "Tuesday",
      available: true,
      slots: ["10:00 AM", "1:00 PM", "4:00 PM"],
    },
    { day: "Wednesday", available: false, slots: [] },
    { day: "Thursday", available: true, slots: ["9:00 AM", "3:00 PM"] },
    {
      day: "Friday",
      available: true,
      slots: ["10:00 AM", "2:00 PM", "5:00 PM"],
    },
    { day: "Saturday", available: false, slots: [] },
    { day: "Sunday", available: false, slots: [] },
  ],
  socials: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  sessionRate: "$120",
  sessionDuration: "60 min",
};
