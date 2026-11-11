import React, { useState } from "react";
import { Check, Sparkles, X, ZoomIn } from "lucide-react";

const TestimonialCard = (props) => {
  const data =
    props.testimonial && typeof props.testimonial === "object"
      ? props.testimonial
      : props;

  const {
    studentName = "Applicant",
    university = "University",
    program = "Undergraduate Degree",
    image = "",
    testimonial = "",
    degree = "Bachelor's",
    year = "2025",
    country = "USA",
    status = "Accepted",
  } = data;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col justify-between rounded-2xl bg-[var(--white)] border border-[var(--line)] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden text-left p-6">
        <div>
          {/* Card Top: Student Name + University + Status Pill */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)] tracking-tight">
                {studentName}
              </h3>
              <p className="font-['Lexend'] font-semibold text-xs text-[var(--gold-ink)] mt-0.5">
                {university}
              </p>
              <p className="text-[12.5px] text-[var(--ink-muted)] mt-0.5">
                {program} • {country}
              </p>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-['Lexend'] font-bold uppercase tracking-wider bg-[var(--green-soft)] text-[var(--ink)] border border-[var(--line)] whitespace-nowrap">
              <Check className="w-3 h-3" />
              <span>{status}</span>
            </span>
          </div>

          {/* Acceptance Letter Preview */}
          {image && (
            <div className="mb-4">
              {!imageError ? (
                <div
                  className="relative overflow-hidden rounded-xl bg-[var(--green-soft)] cursor-pointer group h-44 border border-[var(--line)]"
                  onClick={() => setIsModalOpen(true)}
                  title="Click to view letter"
                >
                  <img
                    src={image}
                    alt={`${university} acceptance letter for ${studentName}`}
                    className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-[var(--green-soft)] animate-pulse flex items-center justify-center text-xs text-[var(--ink-muted)]">
                      Loading letter…
                    </div>
                  )}
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[rgba(0,0,0,0.65)] text-white text-xs font-['Lexend'] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" /> View letter
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Testimonial Quote */}
          {testimonial && (
            <blockquote className="text-sm text-[var(--ink-secondary)] italic leading-relaxed mb-5 pl-3 border-l-2 border-[var(--yellow)]">
              &ldquo;{testimonial}&rdquo;
            </blockquote>
          )}
        </div>

        {/* Card Footer: Degree & Year Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--line)] text-[12px] font-['Lexend'] font-semibold text-[var(--ink-muted)]">
          <span className="px-2.5 py-1 rounded-full bg-[var(--paper)] border border-[var(--line)]">
            {degree}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[var(--paper)] border border-[var(--line)]">
            Class of {year}
          </span>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={image}
              alt={`${university} acceptance letter for ${studentName}`}
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/20"
            />
            <p className="text-white text-xs font-['Lexend'] font-semibold mt-3 text-center">
              {studentName} · {university} ({status})
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
