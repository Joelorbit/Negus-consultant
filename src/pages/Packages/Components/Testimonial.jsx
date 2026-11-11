import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Melat",
      role: "Student",
      content:
        "I’m so excited to be admitted to Drexel University for Computer Science! The expert guidance helped me showcase my best self and achieve this dream.",
      rating: 5,
      initials: "MT",
    },
    {
      name: "Nathnael",
      role: "Student",
      content:
        "Even with little time left, Negus’s personalized mentorship helped me get waitlisted at the prestigious Williams College. Their guidance truly makes applications acceptance-worthy!",
      rating: 5,
      initials: "Nl",
    },
    {
      name: "Yohannes",
      role: "Student",
      content:
        "With Negus’s guidance, I secured conditional acceptance to Final International University, Cyprus with a 70% scholarship. Truly a life-changing opportunity!",
      rating: 5,
      initials: "YS",
    },
  ];

  return (
    <div className="mb-16">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          What Our Customers Say
        </h3>
        <p className="text-muted-foreground">
          Join thousands of satisfied customers who trust our service
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-card border border-border shadow-sm rounded-xl"
          >
            <CardContent className="p-6">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
