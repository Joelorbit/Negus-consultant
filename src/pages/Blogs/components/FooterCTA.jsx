import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { NavLink } from "react-router";

const FooterCTA = () => {
  return (
    <section className="py-24 bg-secondary/40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

      {/* Floating stars */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + i * 12}%`,
            }}
          >
            <Star className="h-5 w-5 text-accent/50 drop-shadow-sm" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight"
          >
            Let’s Win Your
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-md">
              Scholarship Together
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to transform your academic dreams into reality? Our expert
            team is here to guide you every step of the way.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* Primary Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <NavLink to="/packages">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 h-auto group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Today
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </motion.div>
                </Button>
              </NavLink>
            </motion.div>

            {/* Secondary Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <NavLink to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md"
                >
                  Schedule Consultation
                </Button>
              </NavLink>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { number: "30+", label: "Scholarships Won" },
              { number: "98%", label: "Success Rate" },
              { number: "15+", label: "Course Tutorials" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 drop-shadow-sm">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>

                {/* Divider line between stats (desktop only) */}
                {index !== 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-primary/40 to-accent/40" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
