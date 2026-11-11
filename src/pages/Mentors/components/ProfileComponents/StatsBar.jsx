import { mentor as fallbackMentor } from "./MentorData";
import { Award, BookOpen, Clock, Users } from "lucide-react";
const StatsBar = ({ mentor }) => {
  const m = mentor || fallbackMentor;
  const stats = [
    {
      label: "Sessions",
      value: m.stats?.sessionsCompleted || 0,
      icon: BookOpen,
    },
    {
      label: "Years Exp.",
      value: m.stats?.yearsExperience || m.stats?.years || 0,
      icon: Clock,
    },
    { label: "Students", value: m.stats?.studentsMentored || 0, icon: Users },
    { label: "Rating", value: m.stats?.rating || m.rating || 0, icon: Award },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-card border border-border/50 shadow-premium p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5"
        >
          <stat.icon className="h-5 w-5 text-primary mb-2" />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {stat.value}
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
export default StatsBar;
