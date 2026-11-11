import { mentor as fallbackMentor } from "./MentorData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle } from "lucide-react";
import StarRating from "./StarRating";

const HeroSection = ({ onBookSession, mentor }) => {
  const m = mentor || fallbackMentor;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card shadow-premium border border-border/50 p-8 md:p-10">
      {/* Gradient accent at top */}
      <div className="absolute inset-x-0 top-0 h-1 gradient-primary" />

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <Avatar className="h-24 w-24 ring-4 primary/10 shadow-lg shrink-0">
          <AvatarImage src={m.avatar} alt={m.name} className="object-cover" />
          <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
            {m.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {m.name}
            </h1>
            {/* Available Badge */}
            {m.availability && (
              <span className="text-xs font-medium bg-green-200 text-green-800 px-2 py-1 rounded-full uppercase">
                Available
              </span>
            )}
          </div>

          <p className="text-muted-foreground mt-1 text-lg">
            {m.title} at{" "}
            <span className="font-medium text-foreground">{m.company}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <StarRating rating={m.rating} />
            <span className="text-sm font-medium text-foreground">
              {m.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({m.reviewCount} reviews)
            </span>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mt-4">
            {m.specializations.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200"
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              onClick={onBookSession}
              className="gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 rounded-xl px-6 h-11 font-semibold"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Book a Session
            </Button>
            <Button
              variant="outline"
              className="rounded-xl px-6 h-11 font-semibold border-border hover:bg-secondary transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
