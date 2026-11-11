import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  BookOpen,
  Users,
  Award,
  Clock,
  Lightbulb,
  TrendingUp,
  Shield,
} from "lucide-react";

const tips = [
  {
    icon: Target,
    title: "Set Clear Goals",
    description:
      "Define your academic and career objectives early to stay focused and motivated throughout your journey.",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Research Thoroughly",
    description:
      "Understand admission requirements, deadlines, and scholarship criteria for each program you're considering.",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Build Networks",
    description:
      "Connect with alumni, professors, and peers who can provide valuable insights and opportunities.",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "Showcase Achievements",
    description:
      "Highlight your unique experiences, skills, and accomplishments in compelling application materials.",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "Start Early",
    description:
      "Begin your application process at least 12-18 months before your intended start date.",
    color: "text-primary",
  },
  {
    icon: Lightbulb,
    title: "Stay Creative",
    description:
      "Think outside the box when writing essays and presenting your story to stand out from other applicants.",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor your application status and follow up appropriately to demonstrate continued interest.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Prepare Backups",
    description:
      "Apply to multiple programs and have contingency plans to ensure you have options.",
    color: "text-accent",
  },
];

const TipsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Quick Success <span className="text-gradient">Tips</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bite-sized wisdom to accelerate your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="h-full card-gradient border border-border/50 shadow-card hover:shadow-soft transition-all duration-500 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="mb-4"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.6 },
                      }}
                    >
                      <div
                        className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10
             flex items-center justify-center mb-4 group-hover:shadow-soft transition-all duration-300"
                      >
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {tip.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="relative mt-16">
          <motion.div
            className="absolute left-1/4 top-0 w-2 h-2 bg-accent rounded-full"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-1/4 top-0 w-1 h-1 bg-primary rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute left-1/2 top-0 w-1.5 h-1.5 bg-accent rounded-full"
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
