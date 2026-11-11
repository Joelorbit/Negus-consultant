import { useEffect, useState } from "react";
import {
  useMyMentorProfile,
  useUpsertMentorProfile,
} from "../../hooks/useMentorApplications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Briefcase,
  DollarSign,
  Tags,
  Calendar,
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Coins,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_TIMEZONES } from "@/constants/timezones";

const MentorProfileEditor = () => {
  const { data, isLoading } = useMyMentorProfile();
  const save = useUpsertMentorProfile();

  const [form, setForm] = useState({
    headline: "",
    bio: "",
    title: "",
    organization: "",
    country: "",
    years_of_experience: "",
    hourly_rate: "",
    currency: "ETB",
    languages_csv: "",
    timezone: "Africa/Addis_Ababa",
    skills_csv: "",
    availability_json: "",
    introduction_video_url: "",
    visibility: true,
  });

  useEffect(() => {
    if (data?.data) {
      const p = data.data;

      setForm({
        title: p.title || "",
        organization: p.organization || "",
        country: p.country || "",
        headline: p.headline || "",
        bio: p.bio || "",
        years_of_experience: p.years_of_experience || "",
        hourly_rate: p.hourly_rate || "",
        currency: p.currency || "ETB",

        // specialties is TEXT[] or VARCHAR[]
        skills_csv: Array.isArray(p.specialties)
          ? p.specialties.join(", ")
          : "",

        // languages is TEXT[]
        languages_csv: Array.isArray(p.languages) ? p.languages.join(", ") : "",

        availability_json: p.availability
          ? JSON.stringify(p.availability, null, 2)
          : "",

        timezone: p.timezone || "Africa/Addis_Ababa",
        visibility: p.visibility ?? true,
        introduction_video_url: p.introduction_video_url || "",
      });
    }
  }, [data]);

  const handleSave = () => {
    const specialties = form.skills_csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const languages = form.languages_csv
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    const payload = {
      title: form.title || null,
      organization: form.organization || null,
      headline: form.headline || null,
      bio: form.bio || null,
      years_of_experience: form.years_of_experience
        ? Number(form.years_of_experience)
        : null,
      specialties,
      hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
      currency: form.currency || "ETB",
      availability: form.availability_json
        ? JSON.parse(form.availability_json)
        : null,
      languages,
      introduction_video_url: form.introduction_video_url || null,
      country: form.country || null,
      timezone: form.timezone,
      visibility: !!form.visibility,
    };

    save.mutate(payload);
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Loading profile settings...
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentor Settings</h1>
          <p className="text-muted-foreground">
            Manage your public presence and consultation preferences.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border">
          <div className="flex flex-col items-end">
            <Label
              htmlFor="visibility-toggle"
              className="text-xs font-bold uppercase text-muted-foreground tracking-wider"
            >
              Profile Status
            </Label>
            <span className="text-sm font-medium">
              {form.visibility ? "Public" : "Hidden"}
            </span>
          </div>
          <Switch
            id="visibility-toggle"
            checked={form.visibility}
            onCheckedChange={(checked) =>
              setForm({ ...form, visibility: checked })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-none ring-1 ring-gray-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Professional Identity
              </CardTitle>
              <CardDescription>
                Tell students about your expertise and background.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Professional Headline</Label>
                <Input
                  placeholder="e.g. Ivy League Admissions Consultant & STEM Specialist"
                  value={form.headline}
                  onChange={(e) =>
                    setForm({ ...form, headline: e.target.value })
                  }
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g. Senior Admissions Mentor"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input
                  placeholder="Harvard, ALA, Freelance"
                  value={form.organization}
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select
                  value={form.country}
                  onValueChange={(value) =>
                    setForm({ ...form, country: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_TIMEZONES.map((c) => (
                      <SelectItem key={c.timezone} value={c.country}>
                        {c.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input
                  type="number"
                  placeholder="5"
                  value={form.years_of_experience}
                  onChange={(e) =>
                    setForm({ ...form, years_of_experience: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Languages</Label>
                <Input
                  placeholder="English, Amharic"
                  value={form.languages_csv}
                  onChange={(e) =>
                    setForm({ ...form, languages_csv: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Biography</Label>
                <Textarea
                  placeholder="Share your journey, successes, and how you help students..."
                  rows={6}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Introduction Video (YouTube URL)</Label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={form.introduction_video_url}
                  onChange={(e) =>
                    setForm({ ...form, introduction_video_url: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Add a short intro video link — students will see this on your
                  public profile.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Skills{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (Comma separated)
                  </span>
                </Label>
                <Input
                  placeholder="Essay Writing, SAT Prep, Career Coaching..."
                  value={form.skills_csv}
                  onChange={(e) =>
                    setForm({ ...form, skills_csv: e.target.value })
                  }
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.skills_csv
                    .split(",")
                    .filter((s) => s.trim())
                    .map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none ring-1 ring-gray-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Availability &
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Hourly Rate (Birr)</Label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      className="pl-9"
                      placeholder="50"
                      value={form.hourly_rate}
                      onChange={(e) =>
                        setForm({ ...form, hourly_rate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Consultation Type</Label>
                  <div className="flex gap-2">
                    <Badge className="bg-green-50 text-green-700 border-green-100 uppercase text-xs">
                      1-on-1 Sessions
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-xs">
                      Video Call
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Availability (local time)</Label>
                <p className="text-xs text-muted-foreground">
                  Select the days and time window when you usually accept
                  sessions. Students will only be able to book within these
                  hours.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => {
                          const current = form.availability_json
                            ? (() => {
                                try {
                                  return JSON.parse(form.availability_json);
                                } catch {
                                  return {};
                                }
                              })()
                            : {};
                          const days = current.days || [];
                          const isSelected = days.includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const base = current.days || [];
                                const nextDays = isSelected
                                  ? base.filter((d) => d !== day)
                                  : [...base, day];
                                const next = {
                                  ...current,
                                  days: nextDays,
                                };
                                setForm({
                                  ...form,
                                  availability_json: JSON.stringify(next),
                                });
                              }}
                              className={
                                "px-2 py-1 text-xs rounded-md border " +
                                (isSelected
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-muted text-muted-foreground border-border")
                              }
                            >
                              {day}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Range</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={(() => {
                          if (!form.availability_json) return "";
                          try {
                            const parsed = JSON.parse(form.availability_json);
                            return parsed.from || "";
                          } catch {
                            return "";
                          }
                        })()}
                        onChange={(e) => {
                          let parsed = {};
                          try {
                            parsed = form.availability_json
                              ? JSON.parse(form.availability_json)
                              : {};
                          } catch {
                            parsed = {};
                          }
                          const next = { ...parsed, from: e.target.value };
                          setForm({
                            ...form,
                            availability_json: JSON.stringify(next),
                          });
                        }}
                      />
                      <span className="text-xs text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={(() => {
                          if (!form.availability_json) return "";
                          try {
                            const parsed = JSON.parse(form.availability_json);
                            return parsed.to || "";
                          } catch {
                            return "";
                          }
                        })()}
                        onChange={(e) => {
                          let parsed = {};
                          try {
                            parsed = form.availability_json
                              ? JSON.parse(form.availability_json)
                              : {};
                          } catch {
                            parsed = {};
                          }
                          const next = { ...parsed, to: e.target.value };
                          setForm({
                            ...form,
                            availability_json: JSON.stringify(next),
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t flex justify-between py-4">
              <div className="flex items-center gap-2">
                {save.isSuccess && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium animate-in fade-in slide-in-from-left-2">
                    <CheckCircle2 className="w-4 h-4" /> Changes saved
                  </span>
                )}
                {save.isError && (
                  <span className="flex items-center gap-1 text-sm text-destructive font-medium">
                    <AlertCircle className="w-4 h-4" /> Save failed
                  </span>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={save.isLoading}
                className="min-w-[120px] shadow-md"
              >
                {save.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Preview/Tips */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Globe className="w-4 h-4" /> Profile Visibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs opacity-90 leading-relaxed">
                Your profile is currently{" "}
                <strong>{form.visibility ? "Visible" : "Hidden"}</strong>.
                {form.visibility
                  ? " Students can find you in the marketplace and book sessions."
                  : " Only you can see this profile. Turn on visibility to start receiving bookings."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Success Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3 text-muted-foreground">
              <li className="list-none flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                Highlight specific scholarships you've won.
              </li>
              <li className="list-none flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                Mentors with bios over 200 words get 40% more bookings.
              </li>
              <li className="list-none flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                Add skills like "IELTS" or "Visa Guidance".
              </li>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileEditor;
