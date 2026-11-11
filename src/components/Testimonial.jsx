import React from "react";
import { Button } from "./ui/button";
import { ShinyButton } from "./ShinyButton";
import { NavLink } from "react-router";

const Testimonial = () => {
  return (
    <div className="bg-background py-16 flex flex-col justify-center items-center px-4">
      <div className="space-y-3 text-center max-w-xl mx-auto">
        <h1 className="text-5xl font-bold text-primary">Testimonial</h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
          Hear what our amazing users have to say about us
        </p>
      </div>
      <div className="flex justify-center items-center mt-12 w-full max-w-4xl">
        <div className="relative rounded-2xl overflow-hidden shadow-lg w-full flex flex-col md:flex-row bg-card border border-border transition-transform duration-300 hover:scale-105 cursor-default">
          {/* Left Content Box */}
          <div className="flex-1 flex items-center justify-center px-12 py-16 bg-gradient-to-b from-primary/70 to-primary/80 relative">
            {/* Large Quote Mark */}
            <div className="absolute top-6 left-6 text-[140px] text-primary/20 font-serif select-none pointer-events-none">
              &ldquo;
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 max-w-sm text-center">
              <p className="text-xs text-white font-semibold mb-1 tracking-wide">
                🔷 TESTIMONIAL
              </p>
              <h2 className="text-xl font-bold text-white mb-1">
                Nebiyu Beweket
              </h2>
              <p className="text-sm text-white mb-4">
                Admitted Student, NYU Abu Dhabi
              </p>
              <p className="text-white/90 text-2xl leading-relaxed mb-6 italic">
                “I was admitted to NYU Abu Dhabi. This opportunity reflects my
                hard work and the support I’ve had from mentors and family. I’m
                excited to join a global community at the crossroads of the
                world.”
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 text-primary-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current text-yellow-300"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.755 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <NavLink to="/packages">
                <Button
                  size="lg"
                  className="mt-6 bg-yellow-400 py-2 text-black font-semibold shadow-lg hover:scale-105 transition"
                >
                  Book Mentorship with Nebiyu
                </Button>
              </NavLink>
            </div>
          </div>

          {/* Right Image & Side Text */}
          <div className="relative flex-1">
            <img
              src="./testimonial.jpg"
              alt="Nick Weimann"
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-300/80 py-2 px-6 rotate-90 origin-top-right shadow-lg text-primary-foreground font-semibold text-sm tracking-wide select-none">
              WHAT THEY SAY ABOUT US?
            </div>
          </div>
        </div>
      </div>
      <ShinyButton href="/testimonials" className="mt-10 ">
        View More
      </ShinyButton>
    </div>
  );
};

export default Testimonial;
