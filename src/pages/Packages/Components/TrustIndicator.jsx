import { Shield, Award, Users, Clock } from "lucide-react";

export const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level encryption",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Trusted by 10,000+ users",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer service",
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Results in 24-48 hours",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {indicators.map((indicator, index) => {
        const IconComponent = indicator.icon;
        return (
          <div key={index} className="text-center">
            <div
              className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "hsla(24, 95%, 53%, 0.1)" }} // light primary background
            >
              <IconComponent
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "hsl(24, 95%, 53%)",
                }}
              />
            </div>
            <h4 className="text-foreground text-sm font-semibold mb-1">
              {indicator.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {indicator.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
