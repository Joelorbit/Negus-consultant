export const Hero = ({ totalResources, freeResources }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img
          src="/hero-education.jfif"
          alt="Students studying together"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 61, 43, 0.58) 0%, rgba(18, 61, 43, 0.78) 100%)",
          }}
        ></div>
      </div>
      <div
        className="relative py-16 md:py-24"
        style={{ width: "min(100% - 48px, 1160px)", marginInline: "auto" }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 760 }}>
          <h1
            className="line-clamp-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5.4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fffdf6",
              marginBottom: 16,
            }}
          >
            Notes & Scholarship Books
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 19px)",
              lineHeight: 1.6,
              color: "rgba(255, 253, 246, 0.94)",
              marginBottom: 32,
            }}
          >
            Free guides and premium collections that support every course video.
          </p>

          {/* Quick Stats */}
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: 24, color: "rgba(255, 253, 246, 0.96)" }}
          >
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {freeResources} Free Resources
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {totalResources} Total Resources
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
