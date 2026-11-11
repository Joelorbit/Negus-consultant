import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getEmbedUrl } from "../../utils/yotubeUrl";

const formatRate = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `${amount} ${currency}`;
  }
};

const MentorsCard = ({ mentor }) => {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card className="group hover:shadow-lg transition-all border-[var(--line)] bg-[var(--white)] overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left side: Avatar & Quick Info */}
              <div className="p-6 flex flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--green-subtle)] w-full md:w-56">
                <div className="relative flex-shrink-0">
                  {mentor.profile_image ? (
                    <img
                      className="w-20 h-20 rounded-2xl object-cover border border-[var(--line-strong)]"
                      src={mentor.profile_image}
                      alt={`${mentor.first_name} ${mentor.last_name}`}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-[var(--ink)] text-[var(--yellow)] flex items-center justify-center text-2xl font-bold font-['Lexend'] border border-[var(--line-strong)]">
                      {mentor.first_name?.[0] || "N"}
                      {mentor.last_name?.[0] || ""}
                    </div>
                  )}

                  <div className="absolute -bottom-1 -right-1 bg-[var(--white)] p-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[var(--yellow)] fill-[var(--ink)]" />
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-1.5 text-center w-full">
                  {Number(mentor.rating) > 0 ? (
                    <div className="flex items-center gap-1 text-[var(--yellow)]">
                      <Star className="w-4 h-4 fill-[var(--yellow)]" />
                      <span className="text-sm font-bold text-[var(--ink)]">
                        {Number(mentor.rating).toFixed(1)}
                      </span>
                      <span className="text-xs text-[var(--ink-muted)] font-normal">
                        ({mentor.reviews || 0})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-[var(--ink-muted)]">
                      New mentor
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-[var(--ink-muted)] text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mentor.session_duration || 60} min / session</span>
                  </div>
                </div>
              </div>

              {/* Right side: Detailed Info */}
              <div className="flex-1 p-6 space-y-3.5">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--yellow)] transition-colors font-['Lexend']">
                      {mentor.first_name} {mentor.last_name}
                    </h2>
                    <p className="text-sm font-medium text-[var(--ink-secondary)] leading-snug max-w-lg mt-1">
                      {mentor.headline}
                    </p>
                    <p className="text-xs text-[var(--ink-muted)] mt-1">
                      {mentor.title && <>{mentor.title} · </>}
                      {mentor.organization || "Independent mentor"}
                      {mentor.years_of_experience != null &&
                        ` · ${mentor.years_of_experience} years experience`}
                    </p>
                    {mentor.languages?.length > 0 && (
                      <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                        Languages: {mentor.languages.join(", ")}
                      </p>
                    )}
                  </div>
                  {mentor.hourly_rate && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--ink)] font-['Lexend'] flex items-center justify-end">
                        {formatRate(mentor.hourly_rate, mentor.currency)}
                        <span className="text-sm font-normal text-[var(--ink-muted)] ml-1">
                          /hr
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--ink-muted)]">
                  <span className="flex items-center gap-1.5 font-medium text-[var(--ink)]">
                    <GraduationCap className="w-4 h-4 text-[var(--yellow)]" />
                    {mentor.specialties?.[0] || mentor.title || "Scholarship guidance"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {mentor.country || "Remote sessions"}
                  </span>
                </div>

                <p className="text-sm text-[var(--ink-secondary)] line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentor.skills?.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--green-subtle)] text-[var(--ink-secondary)] border border-[var(--line)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.specialties?.slice(0, 2).map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--yellow-soft)] text-[var(--ink)] border border-[var(--line)] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-[var(--line)]">
                  <span className="text-xs text-[var(--ink-muted)]">
                    Verified Negus Mentor
                  </span>

                  <NavLink
                    to={`/mentor/${mentor.id}`}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[var(--ink)] px-4 text-xs font-bold text-[var(--paper)] transition-colors hover:bg-[var(--ink-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)]"
                  >
                    <span>Book Session</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </NavLink>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>

      {mentor.introduction_video_url && (
        <HoverCardContent
          side="right"
          align="start"
          className="w-80 p-0 overflow-hidden shadow-xl border-[var(--line)] bg-[var(--white)] rounded-xl"
        >
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(mentor.introduction_video_url)}
              title={`${mentor.first_name}'s introduction video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-3">
            <h4 className="font-bold text-sm text-[var(--ink)] font-['Lexend']">
              {mentor.first_name} {mentor.last_name}
            </h4>
            <p className="text-xs text-[var(--ink-muted)] line-clamp-1">
              Introduction Video
            </p>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default MentorsCard;
