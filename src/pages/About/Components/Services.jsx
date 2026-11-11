// ServicesSection.tsx
import React, { useState } from "react";
import {
  Rocket,
  Users,
  Target,
  Heart,
  Shield,
  Zap,
  Award,
  Star,
} from "lucide-react";
import "./ServiceIcon.css"; // Import custom CSS for additional styles

const services = [
  {
    id: 1,
    icon: Target,
    title: "Our Mission",
    description:
      "To empower students with the knowledge, tools, and confidence to secure life-changing scholarships.",
  },
  {
    id: 2,
    icon: Shield,
    title: "Integrity",
    description:
      "We believe in honesty, transparency, and building trust with every student we serve.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Passion",
    description:
      "Our work is driven by a deep passion for education and equal opportunity.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Innovation",
    description:
      "We use the latest tools and methods to maximize your chances of success.",
  },
];

export default function ServicesSection() {
  const [hoveorangeId, setHoveorangeId] = useState(null);
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 ">
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="text-blue-600 font-medium uppercase tracking-wide">
          Our Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Our Service For You
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const isHoveorange = hoveorangeId === service.id;
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className={`relative py-8  rounded-4xl  transition-all   duration-300 shadow-lg ${
                isHoveorange ? "bg-blue-600" : "bg-card"
              }`}
              onMouseEnter={() => setHoveorangeId(service.id)}
              onMouseLeave={() => setHoveorangeId(null)}
            >
              {/* Box Shape Background */}
              <div className="absolute top-0">
                <svg
                  width="81"
                  height="80"
                  viewBox="0 0 81 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M81 0H30C13.4315 0 0 13.4315 0 30V80L15.027 65.1585C16.9293 63.2797 18 60.7174 18 58.0437V39C18 27.9543 26.9543 19 38 19H57.6567C60.2873 19 62.812 17.9634 64.6837 16.1148L81 0Z"
                    fill="currentColor"
                    className={isHoveorange ? "text-black" : "text-blue-600"}
                  ></path>
                </svg>
              </div>
              <div
                className={`absolute -top-8 left-10 ${
                  isHoveorange ? "bg-black" : "bg-blue-600"
                } rounded-full w-20 h-20 flex justify-center items-center border-4 border-background`}
              >
                <Icon
                  className={`w-8 h-8 icon-3d ${
                    isHoveorange ? "hovered orange text-white" : "text-white"
                  }`}
                />
                {/* <img
                  decoding="async"
                  src="https://wordpress.themeholy.com/fitkit/wp-content/uploads/2024/08/service_icon2-1.svg"
                  alt="service_icon2 1"
                  
                /> */}
              </div>
              {/* Content */}
              <div className="p-6 relative z-10 flex flex-col items-center text-center space-y-4">
                <h3 className="text-xl text-foreground font-semibold">
                  <a
                    href={service.link}
                    className={`${
                      isHoveorange ? "text-white" : "text-foreground"
                    }`}
                  >
                    {service.title}
                  </a>
                </h3>
                <p
                  className={`${
                    isHoveorange ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
