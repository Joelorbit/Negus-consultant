import { mentor } from "./MentorData";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ExternalLink,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

const MentorSidebar = ({ onBookSession }) => {
  return (
    <div className="space-y-5 lg:sticky lg:top-8">
      {/* Quick Stats */}
      <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Quick Stats
        </h3>
        <div className="space-y-3">
          {[
            {
              icon: BookOpen,
              label: "Sessions",
              value: mentor.stats.sessionsCompleted,
            },
            {
              icon: Users,
              label: "Students",
              value: mentor.stats.studentsMentored,
            },
            { icon: Award, label: "Rating", value: `${mentor.stats.rating}/5` },
            // `Icon` is used as a JSX element below; core no-unused-vars cannot see JSX tag usage.
            // eslint-disable-next-line no-unused-vars
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4" />
                {label}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Book CTA */}
      <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-foreground">
            {mentor.sessionRate}
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            / {mentor.sessionDuration}
          </span>
        </div>
        <Button
          onClick={onBookSession}
          className="w-full gradient-primary text-primary-foreground rounded-xl h-11 font-semibold hover:shadow-glow transition-all duration-300"
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          Book a Session
        </Button>
      </div>
      {/* Social Links */}
      <div className="rounded-2xl border border-border/50 shadow-premium p-6 bg-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Connect
        </h3>
        <div className="space-y-2">
          {Object.entries(mentor.socials).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 px-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              <span className="capitalize">{name}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MentorSidebar;
