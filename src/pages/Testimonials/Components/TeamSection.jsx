/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Facebook,
  Twitter,
  Linkedin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export const teamMembers = [
  {
    id: 0,
    name: "Leulseged",
    role: "Admitted to Sarah Lawrence,Georgetown & 4 other",
    department: "Sarah Lawrence College • Liberal Arts • USA",
    specialties: [
      "Scholarship",
      "Cross-Disciplinary Learning",
      "Community Engagement",
      "Intellectual Curiosity",
    ],
    experience: "Aspiring Liberal Arts Student",
    education: ["High School Graduate • Incoming Class of 2030"],
    email: "luel.tafere@example.com",
    phone: "+251 (000) 000-0000", // replaced fake US number with placeholder ETH
    bio: "Accepted to Sarah Lawrence College! The recognition reflects not only my academic efforts but also the value of my story, creativity, and resilience.",
    teachingPhilosophy:
      "When I got the news that I was accepted to Sarah Lawrence College, it felt surreal — a powerful mix of excitement, gratitude, and hope. This acceptance is more than just admission; it is recognition of my hard work, my dreams, and my potential to grow as part of a global community. I feel inspired and ready to embrace the opportunities ahead with confidence and determination.",
    achievements: [
      "Admitted to Sarah Lawrence College (Class of 2030) – Accepted through the Early Action application round, standing out among a highly competitive applicant pool.",
      "Recognized for Intellectual & Creative Strength – Commended by the admissions committee for pushing beyond conventional thinking and demonstrating originality.",
      "Cross-Disciplinary Potential – Selected as a student with the ability to bridge disciplines and think across fields of study.",
      "Community Engagement & Leadership – Distinguished for a strong concern for community, collaboration, and meaningful dialogue.",
      "Personal & Academic Excellence – Noted for compelling personal qualities, resilience, and overall academic achievements.",
    ],
    courses: ["Supplemental Essay course", "Personal Essay course"],
    officeHours: "N/A – Incoming student",
    image: "./team2.png",
  },
  {
    id: 2,
    name: "Nebiyu",
    role: "Admitted to NYU Abu Dhab",
    department: "New York University Abu Dhabi • Liberal Arts • Global Campus",
    specialties: ["Scholarship", "Essay Writing", "Research Skills"],
    experience: "Aspiring Global Scholar",
    education: ["High School Graduate • Incoming Class of 2029"],
    email: "nebiyu@example.com",
    phone: "+251 (000) 000-0000",
    bio: "Admitted to NYU Abu Dhabi! Recognized for exceptional intellectual ability, potential, and a strong commitment to exploring global challenges through a liberal arts education.",
    teachingPhilosophy:
      "Being accepted to NYU Abu Dhabi felt like stepping into a world of endless possibilities. The thought of joining a truly international community of scholars, where ideas cross boundaries and cultures, fills me with both pride and determination. This acceptance is more than an academic opportunity—it’s an invitation to grow as a global citizen, to challenge myself intellectually, and to contribute meaningfully to the world.",
    achievements: [
      "Admitted to New York University Abu Dhabi (Class of 2029) – Selected for exceptional intellectual ability and academic potential.",
      "Global Learning Environment – Joining a diverse student community from around the world, prepared to address global challenges.",
      "Cross-Cultural Engagement – Recognized for openness to dialogue, collaboration, and exploration across cultural boundaries.",
      "Liberal Arts Excellence – Valued for readiness to pursue a rigorous, interdisciplinary education.",
      "Academic Promise – Distinguished for strong academic achievements and ability to thrive in a competitive environment.",
    ],
    courses: ["One to One mentorship", "Online Resources"],
    officeHours: "N/A – Incoming student",
    image: "./testimonial.jpg",
  },
  {
    id: 3,
    name: "Abraham",
    role: "Admitted to NYU Shanghai",
    department: "New York University Shanghai • Liberal Arts • Global Campus",
    specialties: ["Scholarship", "Essay Writing", "Research Skills"],
    experience: "Aspiring International Scholar",
    education: ["High School Graduate • Incoming Class of 2028"],
    email: "abraham@example.com",
    phone: "+251 (000) 000-0000",
    bio: "Admitted to NYU Shanghai! Selected for intellectual ability, creativity, and potential to contribute meaningfully to the unique global learning environment of NYU Shanghai.",
    teachingPhilosophy:
      "The moment I received my NYU Shanghai acceptance, it felt like stepping into a truly global journey. Knowing that I’ll join a diverse community of students—half from China and half from the rest of the world—makes me feel inspired and motivated. This opportunity is not only about academics but also about cultural exchange, growth, and building a future where I can make a global impact.",
    achievements: [
      "Admitted to New York University Shanghai (Class of 2028) – Selected for outstanding intellectual ability and potential.",
      "Global Scholar Recognition – Joining a unique international cohort designed to address global challenges.",
      "Cross-Cultural Engagement – Recognized for readiness to collaborate across cultures and communities.",
      "Liberal Arts Excellence – Chosen for potential to excel in NYU’s interdisciplinary and global curriculum.",
      "Academic Promise – Distinguished for strong academic performance and intellectual drive.",
    ],
    courses: ["Common App", "Essay", "Scholarship"],
    officeHours: "N/A – Incoming student",
    image: "./team1.jpg",
  },
  {
    id: 3,
    name: "Leulseged",
    role: "Admitted to Sarah Lawrence,Georgetown & 4 other",
    department: "Sarah Lawrence College • Liberal Arts • USA",
    specialties: ["Scholarship", "Essay Writing", "Research Skills"],
    experience: "Aspiring Liberal Arts Student",
    education: ["High School Graduate • Incoming Class of 2029"],
    email: "luel.tafere@example.com",
    phone: "+251 (000) 000-0000", // replaced fake US number with placeholder ETH
    bio: "Accepted to Sarah Lawrence College! The recognition reflects not only my academic efforts but also the value of my story, creativity, and resilience.",
    teachingPhilosophy:
      "When I got the news that I was accepted to Sarah Lawrence College, it felt surreal — a powerful mix of excitement, gratitude, and hope. This acceptance is more than just admission; it is recognition of my hard work, my dreams, and my potential to grow as part of a global community. I feel inspired and ready to embrace the opportunities ahead with confidence and determination.",
    achievements: [
      "Admitted to Sarah Lawrence College (Class of 2029) – Accepted through the Early Action application round, standing out among a highly competitive applicant pool.",
      "Recognized for Intellectual & Creative Strength – Commended by the admissions committee for pushing beyond conventional thinking and demonstrating originality.",
      "Cross-Disciplinary Potential – Selected as a student with the ability to bridge disciplines and think across fields of study.",
      "Community Engagement & Leadership – Distinguished for a strong concern for community, collaboration, and meaningful dialogue.",
      "Personal & Academic Excellence – Noted for compelling personal qualities, resilience, and overall academic achievements.",
    ],
    courses: ["Supplemental Essay course", "Personal Essay course"],
    officeHours: "N/A – Incoming student",
    image: "./team2.png",
  },
  {
    id: 4,
    name: "Nebiyu",
    role: "Admitted to NYU Abu Dhab",
    department: "New York University Abu Dhabi • Liberal Arts • Global Campus",
    specialties: ["Scholarship", "Essay Writing", "Research Skills"],
    experience: "Aspiring Global Scholar",
    education: ["High School Graduate • Incoming Class of 2029"],
    email: "nebiyu@example.com",
    phone: "+251 (000) 000-0000",
    bio: "Admitted to NYU Abu Dhabi! Recognized for exceptional intellectual ability, potential, and a strong commitment to exploring global challenges through a liberal arts education.",
    teachingPhilosophy:
      "Being accepted to NYU Abu Dhabi felt like stepping into a world of endless possibilities. The thought of joining a truly international community of scholars, where ideas cross boundaries and cultures, fills me with both pride and determination. This acceptance is more than an academic opportunity—it’s an invitation to grow as a global citizen, to challenge myself intellectually, and to contribute meaningfully to the world.",
    achievements: [
      "Admitted to New York University Abu Dhabi (Class of 2029) – Selected for exceptional intellectual ability and academic potential.",
      "Global Learning Environment – Joining a diverse student community from around the world, prepared to address global challenges.",
      "Cross-Cultural Engagement – Recognized for openness to dialogue, collaboration, and exploration across cultural boundaries.",
      "Liberal Arts Excellence – Valued for readiness to pursue a rigorous, interdisciplinary education.",
      "Academic Promise – Distinguished for strong academic achievements and ability to thrive in a competitive environment.",
    ],
    courses: ["One to One mentorship", "Online Resources"],
    officeHours: "N/A – Incoming student",
    image: "./testimonial.jpg",
  },
  {
    id: 5,
    name: "Abraham",
    role: "Admitted to NYU Shanghai",
    department: "New York University Shanghai • Liberal Arts • Global Campus",
    specialties: ["Scholarship", "Essay Writing", "Research Skills"],
    experience: "Aspiring International Scholar",
    education: ["High School Graduate • Incoming Class of 2028"],
    email: "abraham@example.com",
    phone: "+251 (000) 000-0000",
    bio: "Admitted to NYU Shanghai! Selected for intellectual ability, creativity, and potential to contribute meaningfully to the unique global learning environment of NYU Shanghai.",
    teachingPhilosophy:
      "The moment I received my NYU Shanghai acceptance, it felt like stepping into a truly global journey. Knowing that I’ll join a diverse community of students—half from China and half from the rest of the world—makes me feel inspired and motivated. This opportunity is not only about academics but also about cultural exchange, growth, and building a future where I can make a global impact.",
    achievements: [
      "Admitted to New York University Shanghai (Class of 2028) – Selected for outstanding intellectual ability and potential.",
      "Global Scholar Recognition – Joining a unique international cohort designed to address global challenges.",
      "Cross-Cultural Engagement – Recognized for readiness to collaborate across cultures and communities.",
      "Liberal Arts Excellence – Chosen for potential to excel in NYU’s interdisciplinary and global curriculum.",
      "Academic Promise – Distinguished for strong academic performance and intellectual drive.",
    ],
    courses: ["Common App", "Essay", "Scholarship"],
    officeHours: "N/A – Incoming student",
    image: "./team1.jpg",
  },
];

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setCardsPerView(1);
      } else if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 992) {
        setCardsPerView(2);
      } else if (window.innerWidth < 1200) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cardsPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % teamMembers.length;
      cards.push(teamMembers[index]);
    }
    return cards;
  };

  return (
    <div className="relative py-24 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-yellow-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--green-soft)] text-[var(--ink-secondary)] text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Our Team
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Meet Some Of
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--gold-ink)] bg-clip-text text-transparent">
              {" "}
              Our Mentors
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our dedicated mentors are here to guide you on your scholarship
            journey with expertise and passion
          </p>
        </div>

        {/* Team Cards Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            {/* Render only visible cards and center them to keep items centered on small screens */}
            <div
              className={`flex gap-6 justify-center transition-all duration-500`}
            >
              {getVisibleCards().map((member, i) => (
                <div
                  key={`${member.id}-${i}`}
                  className="flex-shrink-0 mx-auto"
                  style={{
                    width: `calc(${100 / cardsPerView}% - ${
                      ((cardsPerView - 1) * 24) / cardsPerView
                    }px)`,
                  }}
                >
                  <NavLink to={`/testimonials/${member.id}`}>
                    <div className="group">
                      {/* Image Container */}
                      <div className="flex justify-center items-center relative">
                        <div className="relative group rounded-full overflow-hidden border-2 p-4 border-card hover:border-primary">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-60 h-60 object-cover rounded-full transition-transform duration-700 group-hover:scale-105 border border-gray-200"
                          />

                          {/* Hover border + shadow only inside circle */}
                          <div className="absolute inset-0 rounded-full ring-0 group-hover:ring-2 group-hover:ring-primary group-hover:shadow-lg transition-all duration-300"></div>

                          {/* Social Media Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                            <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2">
                              <div className="flex items-center justify-center z-10">
                                <button className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-all duration-300 group/btn">
                                  <Plus className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-45" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full p-0 border-2 hover:border-[var(--green)] hover:bg-[var(--green-soft)] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2 mx-4">
              {Array.from({
                length: Math.max(1, teamMembers.length - cardsPerView + 1),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className="w-9 h-9 grid place-items-center rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[var(--green)] w-3 h-3"
                        : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                    }`}
                  />
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full p-0 border-2 hover:border-[var(--green)] hover:bg-[var(--green-soft)] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

//---->scrollable hereo courses
//--->15 5 5
//--->spaciality essay and scholarshipp for mentor detail
//--->level only level
//---->2029 2030
//--->about the course he made
//--->why us packages link
//--->telegram user name for nigus contact
//email from hahu
//---->Finatical service to Finantial aid form assistance package
///--->about some of consultant
//---->abrham mulualem(co founder)
//email in each consultant
//--->Comparing and Choosing Common Essay Structures for this video description -> You can use both montaje and narative structures
///--->downloadable file for applicants
//general over view
//-------->logo->consultant
//-------->university name fo nebiyu
//-------->meet some of mentor
