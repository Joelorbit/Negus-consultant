import React, { useRef } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import TeamCard from "./TeamCard";

// Drop-in component. Tailwind CSS required. SwiperJS included via npm.
// npm i swiper lucide-react
// Optional: place inside a section on any page.

const TEAM = [
  {
    name: "Abrham Mulualem",
    role: "Mentor and Trainer",
    image: "./team1.jpg",
    hover:
      "https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team_2_1-hover.png",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Nebiyu Beweket ",
    role: "Mentor and Trainer",
    image: "./testimonial.jpg",
    hover:
      "https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team_2_2-hover.png",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },

  {
    name: "Leulseged Mateb",
    role: "CEO and Founder",
    image: "./team2.png",
    hover:
      "https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team_2_4-hover.png",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  // repeat to simulate 8 like the Elementor demo
  {
    name: "Kidus Basazinew",
    role: "Developer",
    image: "./team3.jpg",
    hover:
      "https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team_2_1-hover.png",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export default function TeamShowcase() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          className="opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="team-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 40 40"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
              <path
                d="M 0 40 L 40 40"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#team-grid)" />
        </svg>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header + Arrows */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur px-5 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Our Consultant
              </span>
            </div>
            <h2 className="mt-10 text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About Some
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Of Our Consultant
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Our consultants is composed of passionate professionals who care
              deeply about guiding you to success.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              className="slider-prev w-11 h-11 rounded-full border bg-background hover:bg-primary/10 hover:border-primary flex items-center justify-center transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              className="slider-next w-11 h-11 rounded-full border bg-background hover:bg-primary/10 hover:border-primary flex items-center justify-center transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // @ts-ignore - Swiper types
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="has-shadow"
        >
          {TEAM.map((m, idx) => (
            <SwiperSlide key={`${m.name}-${idx}`}>
              <TeamCard member={m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Decorative corner shapes */}
      <div className="pointer-events-none absolute left-2 top-5 hidden xl:block">
        <img
          src="https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team-bg-shape2-1.png"
          alt="shape"
          className="select-none"
        />
      </div>
      <div className="pointer-events-none absolute right-1 bottom-5 hidden xl:block">
        <img
          src="https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/team-bg-shape2-2.png"
          alt="shape"
          className="select-none"
        />
      </div>
    </section>
  );
}
