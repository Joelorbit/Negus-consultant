import { useState } from "react";
import {
  useSubmitMentorApplication,
  useMyMentorApplication,
} from "../../hooks/useMentorApplications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, Link } from "react-router";
import {
  GraduationCap,
  UserCircle,
  Mail,
  School,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Info,
  Loader2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  DollarSign,
  Clock,
  Globe,
  Briefcase,
  Video,
  Award,
  MessageSquare,
  FileText,
  CheckCircle,
  Calendar,
  Upload,
  Phone,
} from "lucide-react";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  university: "",
  program: "",
  graduationYear: "",
  specialties: "",
  bio: "",
  whatsappPhone: "",
};

const INITIAL_AVAILABILITY = {
  days: "",
  from: "",
  to: "",
};

const ApplyMentor = () => {
  const [showBenefits, setShowBenefits] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [introVideo, setIntroVideo] = useState(null);
  const navigate = useNavigate();

  const token = (() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  })();

  const [form, setForm] = useState(INITIAL_FORM);
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY);
  const [documents, setDocuments] = useState([
    { type: "acceptance_letter", file: null },
    { type: "student_id", file: null },
  ]);
  const { data: existingApp } = useMyMentorApplication();
  const submit = useSubmitMentorApplication({
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleAvailabilityChange = (key) => (e) =>
    setAvailability({ ...availability, [key]: e.target.value });

  const handleFileChange = (index) => (e) => {
    const file = e.target.files?.[0] || null;
    const next = [...documents];
    next[index] = { ...next[index], file };
    setDocuments(next);
  };

  const handleSubmit = () => {
    const days = availability.days
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    const availabilityPayload = {
      days,
      slots:
        availability.from && availability.to
          ? [
              {
                from: availability.from,
                to: availability.to,
              },
            ]
          : [],
    };

    const documentsPayload = [...documents];
    if (introVideo) {
      documentsPayload.push({ type: "intro_video", file: introVideo });
    }

    submit.mutate({
      form,
      availability: availabilityPayload,
      documents: documentsPayload,
      whatsapp_phone: form.whatsappPhone || null,
    });
  };

  const hasActive =
    existingApp?.data &&
    ["pending", "under_review", "verification_scheduled"].includes(
      existingApp.data.status,
    );

  // Authentication Guard Design
  if (!token) {
    return (
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-['Outfit'] py-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto p-8 sm:p-10 rounded-3xl bg-[var(--white)] border border-[var(--line)] shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--yellow-soft)] text-[var(--gold-ink)] flex items-center justify-center mx-auto mb-5">
            <UserCircle className="w-8 h-8" />
          </div>
          <p className="public-eyebrow text-xs justify-center mb-2">MENTOR ONBOARDING</p>
          <h1 className="font-['Lexend'] text-2xl font-bold mb-3 tracking-tight text-[var(--ink)]">
            Join Our Mentor Network
          </h1>
          <p className="text-sm leading-relaxed text-[var(--ink-secondary)] mb-6">
            Share your scholarship journey and guide the next generation of scholars. Please sign in to submit your mentor application.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7 text-left">
            {[
              { title: "Mentor 1-on-1", desc: "Guide one ambitious student through applications." },
              { title: "Set your hours", desc: "Choose availability that fits your term schedule." },
              { title: "Build your profile", desc: "Grow verified mentoring experience with Negus." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <strong className="block font-['Lexend'] text-[13.5px] font-bold text-[var(--ink)] mb-1">{item.title}</strong>
                <span className="text-[12.5px] leading-relaxed text-[var(--ink-secondary)]">{item.desc}</span>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="w-full h-12 rounded-xl bg-[var(--ink)] text-[var(--paper)] font-['Lexend'] font-bold text-sm hover:bg-[var(--ink-secondary)]"
            onClick={() => navigate("/login", { state: { from: "/mentor/apply" } })}
          >
            Sign in to Apply <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="mt-5 text-[13px] text-[var(--ink-muted)]">
            Curious what mentors get?{" "}
            <Link to="/mentor/benefits" className="font-['Lexend'] font-bold text-[var(--ink-secondary)] hover:underline">
              See mentor benefits
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-['Outfit'] py-12 px-4 sm:px-6">
      <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }} className="space-y-8">
        {/* Centered Page Header */}
        <header className="text-center space-y-3 pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-['Lexend'] font-bold uppercase tracking-widest bg-[var(--yellow-soft)] text-[var(--ink)] border border-[var(--line)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold-ink)]" />
            <span>BECOME A SCHOLAR MENTOR</span>
          </div>
          <h1 className="font-['Lexend'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
            Become a Mentor
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink-secondary)] max-w-xl mx-auto leading-relaxed">
            Apply to share your expertise with ambitious Ethiopian students worldwide.
          </p>
        </header>

        {/* Active Application Notice Banner */}
        {hasActive && (
          <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--line)] bg-[var(--yellow-soft)] p-5 text-sm text-[var(--ink)] shadow-xs">
            <Info className="w-5 h-5 text-[var(--yellow)] shrink-0 mt-0.5" />
            <div>
              <p className="font-['Lexend'] font-bold mb-1">Active Application Found</p>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                Your application is currently{" "}
                <strong className="text-[var(--ink)] capitalize">{existingApp.data.status.replace("_", " ")}</strong>. You
                can refine your details below or upload updated verification documents.
              </p>
            </div>
          </div>
        )}

        {/* Collapsible Benefits & Role Details Card */}
        <div className="rounded-2xl bg-[var(--white)] border border-[var(--line)] shadow-sm overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowBenefits(!showBenefits)}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[var(--green-subtle)] transition-colors"
          >
            <div className="flex items-center gap-3 font-['Lexend'] font-bold text-sm sm:text-base text-[var(--ink)]">
              <span className="w-8 h-8 rounded-full bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <span>View Mentorship Benefits &amp; Role Details</span>
            </div>
            {showBenefits ? (
              <ChevronUp className="w-5 h-5 text-[var(--ink-muted)]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--ink-muted)]" />
            )}
          </button>

          {showBenefits && (
            <div className="p-6 sm:p-8 border-t border-[var(--line)] bg-[var(--paper)] space-y-8 animate-in slide-in-from-top-2 duration-300">
              {/* Requirements & Perks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[var(--white)] border border-[var(--line)] space-y-3">
                  <h4 className="font-['Lexend'] font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[var(--yellow)]" /> Mentor Requirements
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                    <li><strong>Scholarship Experience:</strong> Must have received a recognized scholarship (full or partial).</li>
                    <li><strong>Application Knowledge:</strong> Understand the scholarship process and able to guide students.</li>
                    <li><strong>Clear Communication:</strong> Able to explain ideas clearly and support students professionally.</li>
                    <li><strong>Verification Required:</strong> Provide proof of scholarship. Only verified mentors are accepted.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-[var(--white)] border border-[var(--line)] space-y-3">
                  <h4 className="font-['Lexend'] font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green)]" /> Perks of Joining
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                    <li><strong>Earn on your terms:</strong> Set your own schedule and earn competitive hourly rates.</li>
                    <li><strong>Flexible Schedule:</strong> Choose when to mentor based on your university availability.</li>
                    <li><strong>Global Reach:</strong> Connect with high-potential students aiming for elite institutions.</li>
                    <li><strong>Leadership Profile:</strong> Build valuable advising experience for your own CV.</li>
                  </ul>
                </div>
              </div>

              {/* 5 Why Become a Mentor Points */}
              <div className="space-y-4">
                <h4 className="font-['Lexend'] font-bold text-base text-[var(--ink)] flex items-center gap-2">
                  <span>🌟</span> Why Become a Mentor?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { num: "01", title: "Earn From Your Experience", desc: "Get hourly paid mentoring for guiding students. Start at $15/hour, and rates can grow with experience." },
                    { num: "02", title: "Work From Anywhere", desc: "All mentoring is fully online — all you need is a computer, internet connection, and dedication." },
                    { num: "03", title: "Build Your Professional Profile", desc: "Gain mentoring and leadership experience that strengthens your graduate CV and career opportunities." },
                    { num: "04", title: "Flexible & Scalable", desc: "Choose when to work and how many students to mentor. Your earning potential grows with your reviews." },
                    { num: "05", title: "Make Real Impact", desc: "Your direct mentorship can guide Ethiopian scholars to life-changing full-ride admissions." },
                  ].map((p) => (
                    <div key={p.num} className="p-4 rounded-xl bg-[var(--white)] border border-[var(--line)] shadow-xs">
                      <span className="font-['Lexend'] text-xs font-bold text-[var(--yellow)] block mb-1">{p.num}</span>
                      <strong className="font-['Lexend'] text-sm font-bold text-[var(--ink)] block mb-1">{p.title}</strong>
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Card 1: Basic Information */}
        <section className="rounded-3xl bg-[var(--white)] border border-[var(--line)] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[var(--line)] pb-5">
            <p className="public-eyebrow text-xs mb-1">STEP 1 OF 3</p>
            <h2 className="font-['Lexend'] text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-[var(--green)]" /> Basic Information
            </h2>
            <p className="text-sm text-[var(--ink-secondary)] mt-1">
              Tell us who you are, your academic credentials, and where you studied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Full Name *
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink-muted)]" />
                <Input
                  className="pl-10 h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="e.g. Eyuel Getachew"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink-muted)]" />
                <Input
                  type="email"
                  className="pl-10 h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@university.edu"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
              WhatsApp / Phone Number *
            </label>
            <p className="text-xs text-[var(--ink-muted)] mb-2">
              This number is used by admins for verification and will not be publicly listed on mentor profiles.
            </p>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink-muted)]" />
              <Input
                className="pl-10 h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={form.whatsappPhone}
                onChange={handleChange("whatsappPhone")}
                placeholder="+251 91 234 5678"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-[var(--line)]">
            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                University *
              </label>
              <div className="relative">
                <School className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink-muted)]" />
                <Input
                  className="pl-10 h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                  value={form.university}
                  onChange={handleChange("university")}
                  placeholder="e.g. Georgetown, NYU"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Program / Major *
              </label>
              <Input
                className="h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={form.program}
                onChange={handleChange("program")}
                placeholder="e.g. BS Computer Science"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Graduation Year *
              </label>
              <Input
                className="h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={form.graduationYear}
                onChange={handleChange("graduationYear")}
                placeholder="e.g. 2026"
                required
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-[var(--line)]">
            <div>
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Specialties &amp; Focus Areas *
              </label>
              <div className="relative">
                <Sparkles className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink-muted)]" />
                <Input
                  className="pl-10 h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                  value={form.specialties}
                  onChange={handleChange("specialties")}
                  placeholder="e.g. Digital SAT, Common App Essays, CSS Profile, Visa Interviews"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Mentor Bio &amp; Experience Overview *
              </label>
              <Textarea
                value={form.bio}
                onChange={handleChange("bio")}
                placeholder="Short professional description about your scholarship background, universities admitted to, and how you mentor students..."
                rows={4}
                className="w-full p-4 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)] resize-none"
              />
            </div>
          </div>

          {/* Price Setting Description Callout */}
          <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] space-y-3">
            <h4 className="font-['Lexend'] font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[var(--green)]" /> Price Setting Description
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--ink-secondary)] leading-relaxed">
              <p><strong>Starting Rate:</strong> All new mentors begin at $15/hour.</p>
              <p><strong>Hourly Payment:</strong> Mentors are paid for each session based on booked hours.</p>
              <p><strong>Performance Growth:</strong> Request rate increases as student ratings and reviews rise.</p>
              <p><strong>Flexible &amp; Scalable:</strong> Set your availability and grow income at your own pace.</p>
            </div>
          </div>
        </section>

        {/* Step Card 2: Availability for Verification Call */}
        <section className="rounded-3xl bg-[var(--white)] border border-[var(--line)] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[var(--line)] pb-5">
            <p className="public-eyebrow text-xs mb-1">STEP 2 OF 3</p>
            <h2 className="font-['Lexend'] text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--yellow)]" /> Availability for Verification Call
            </h2>
            <p className="text-sm text-[var(--ink-secondary)] mt-1">
              Share when you are generally free for a 15–30 min video onboarding call with our team.
            </p>
          </div>

          {/* Video Interview Description Box */}
          <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] space-y-3">
            <h4 className="font-['Lexend'] font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Video className="w-4 h-4 text-[var(--yellow)]" /> Video Interview Description
            </h4>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              As part of the selection process, we schedule a short video call (15–25 min) conducted online to:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-[var(--ink-secondary)] space-y-1 pl-2">
              <li>Verify your scholarship award and credentials</li>
              <li>Learn more about your strengths as a scholar mentor</li>
              <li>Understand how you can best support prospective applicants</li>
              <li>Explain how the Negus platform works and the next steps</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Available Days *
              </label>
              <Input
                className="h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={availability.days}
                onChange={handleAvailabilityChange("days")}
                placeholder="e.g. Mon, Wed, Sat"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Time From *
              </label>
              <Input
                type="time"
                className="h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={availability.from}
                onChange={handleAvailabilityChange("from")}
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-['Lexend'] font-bold uppercase tracking-wider text-[var(--ink)] mb-2">
                Time To *
              </label>
              <Input
                type="time"
                className="h-11 rounded-xl bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink)] text-sm focus:border-[var(--green)]"
                value={availability.to}
                onChange={handleAvailabilityChange("to")}
                required
              />
            </div>
          </div>
        </section>

        {/* Step Card 3: Verification Documents & Video Submission */}
        <section className="rounded-3xl bg-[var(--white)] border border-[var(--line)] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[var(--line)] pb-5">
            <p className="public-eyebrow text-xs mb-1">STEP 3 OF 3</p>
            <h2 className="font-['Lexend'] text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--green)]" /> Verification Documents &amp; Video Submission
            </h2>
            <p className="text-sm text-[var(--ink-secondary)] mt-1">
              Upload your student ID and/or university scholarship proof for one-time screening.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Acceptance Letter */}
            <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] space-y-3">
              <div className="flex items-center gap-2 font-['Lexend'] font-bold text-sm text-[var(--ink)]">
                <FileText className="w-4 h-4 text-[var(--green)]" />
                <span>Scholarship / Acceptance Proof</span>
              </div>
              <p className="text-xs text-[var(--ink-secondary)]">
                Upload your official scholarship letter or institutional award notification.
              </p>
              <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-[var(--line-strong)] hover:border-[var(--green)] cursor-pointer bg-[var(--white)] transition-colors text-center">
                <Upload className="w-6 h-6 text-[var(--ink-muted)] mb-1" />
                <span className="text-xs font-['Lexend'] font-bold text-[var(--ink)]">
                  {documents[0]?.file ? documents[0].file.name : "Choose letter or PDF"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange(0)}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* Student ID */}
            <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] space-y-3">
              <div className="flex items-center gap-2 font-['Lexend'] font-bold text-sm text-[var(--ink)]">
                <Briefcase className="w-4 h-4 text-[var(--yellow)]" />
                <span>Student ID / Enrollment Proof</span>
              </div>
              <p className="text-xs text-[var(--ink-secondary)]">
                Upload a photo of your active student ID or enrollment confirmation letter.
              </p>
              <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-[var(--line-strong)] hover:border-[var(--green)] cursor-pointer bg-[var(--white)] transition-colors text-center">
                <Upload className="w-6 h-6 text-[var(--ink-muted)] mb-1" />
                <span className="text-xs font-['Lexend'] font-bold text-[var(--ink)]">
                  {documents[1]?.file ? documents[1].file.name : "Choose ID file or image"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange(1)}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          {/* Mentor Expertise Questions (Video Submission) */}
          <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)] space-y-4">
            <div className="flex items-center gap-2 font-['Lexend'] font-bold text-base text-[var(--ink)]">
              <Video className="w-5 h-5 text-[var(--green)]" />
              <span>Mentor Expertise Questions (Video Submission)</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              Please submit a 2–5 minute video answering the following:
            </p>
            <ol className="list-decimal list-inside text-xs sm:text-sm text-[var(--ink-secondary)] space-y-2 pl-2 leading-relaxed">
              <li><strong>Scholarship Type:</strong> What type of scholarship did you receive and what did it cover? (Full, Partial, Tuition-only)</li>
              <li><strong>Application Strength:</strong> What were the strongest parts of your application? (Essay, Leadership, Grades, Interview, Test scores)</li>
              <li><strong>Mentoring Experience:</strong> Have you helped anyone apply for scholarships? Describe briefly.</li>
              <li><strong>Focus Areas:</strong> Which areas can you help students with the most? (Essay review, Interview prep, Finding scholarships, Application strategy, CV building)</li>
              <li><strong>Confidence:</strong> How confident are you in your ability to mentor students successfully? (1–5 scale)</li>
            </ol>
            <p className="text-xs text-[var(--ink-muted)] italic">
              Tips: Camera quality doesn’t matter. Speak clearly, stay confident, and answer all questions.
            </p>

            <label className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-[var(--line-strong)] hover:border-[var(--green)] cursor-pointer bg-[var(--white)] transition-colors text-center">
              <Video className="w-7 h-7 text-[var(--green)] mb-1" />
              <span className="text-xs font-['Lexend'] font-bold text-[var(--ink)]">
                {introVideo ? introVideo.name : "Upload Intro Video (MP4, MOV, WebM up to 50MB)"}
              </span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setIntroVideo(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
            </label>
            <p className="text-[12.5px] text-[var(--ink-muted)] text-center">
              This short video is used only for internal verification by admins and will not be shown publicly. Documents are securely stored and only used for verification.
            </p>
          </div>
        </section>

        {/* Selection Process & Submission Bar */}
        <section className="rounded-3xl bg-[var(--white)] border border-[var(--line)] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 font-['Lexend'] font-bold text-base text-[var(--ink)]">
            <CheckCircle className="w-5 h-5 text-[var(--green)]" />
            <span>Selection Process</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {[
              { step: "1", title: "Submit Application", desc: "Submit your details and verification files." },
              { step: "2", title: "Application Review", desc: "Admissions team screens credentials." },
              { step: "3", title: "Video Interview", desc: "Short 15–25 min call to verify experience." },
              { step: "4", title: "Approval & Onboarding", desc: "Set availability and start mentoring." },
            ].map((s) => (
              <div key={s.step} className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <span className="w-6 h-6 rounded-full bg-[var(--green-soft)] text-[var(--ink)] font-['Lexend'] font-bold text-xs flex items-center justify-center mb-2">
                  {s.step}
                </span>
                <strong className="block font-['Lexend'] font-bold text-[var(--ink)] mb-1">{s.title}</strong>
                <span className="text-[var(--ink-secondary)] leading-normal">{s.desc}</span>
              </div>
            ))}
          </div>

          {submit.isError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submit.error?.response?.data?.message || "Something went wrong while submitting. Please check your fields and try again."}</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-12 rounded-xl bg-[var(--ink)] text-[var(--paper)] font-['Lexend'] font-bold text-sm hover:bg-[var(--ink-secondary)] shadow-sm"
              onClick={handleSubmit}
              disabled={submit.isPending}
            >
              {submit.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting Application…
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </section>

        {/* What Happens Next Card & Quote Callout */}
        <div className="rounded-3xl bg-[var(--white)] border border-[var(--line)] p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-['Lexend'] font-bold text-lg text-[var(--ink)]">
            What happens next?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[var(--ink-secondary)]">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--green-soft)] text-[var(--green)] font-['Lexend'] font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p>Submit your profile, academic details, availability, and documents for review.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--green-soft)] text-[var(--green)] font-['Lexend'] font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p>Our team reviews your application and verified documents together.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--green-soft)] text-[var(--green)] font-['Lexend'] font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p>Complete a quick 15-min verification onboarding video call.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--line)] text-center">
            <p className="font-['Lexend'] text-sm sm:text-base font-semibold text-[var(--ink)] italic">
              &ldquo;Mentoring is the best way to give back while earning on your own schedule.&rdquo;
            </p>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-[var(--white)] border border-[var(--line)] text-[var(--ink)] rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="font-['Lexend'] text-2xl font-bold mb-3 text-[var(--ink)]">
                Application Submitted Successfully 🎉
              </h2>

              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-6">
                Your mentor application has been received and is now under review. You can track your approval status anytime in your profile.
              </p>

              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/profile");
                }}
                className="w-full h-12 rounded-xl bg-[var(--ink)] text-[var(--paper)] font-['Lexend'] font-bold text-sm hover:bg-[var(--ink-secondary)]"
              >
                Go to My Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplyMentor;
