import React, { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Globe2,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  FileText,
  Clock,
  Send,
  HelpCircle,
  PhoneCall,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useScholarshipById,
  useScholarshipComments,
  useScholarshipLikes,
  useToggleScholarshipLike,
  useAddScholarshipComment,
  useScholarships,
} from "../../hooks/useScholarships";
import { useMe } from "../../hooks/useAuth";
import "../public-pages.css";

export default function ScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useMe();

  const { data: scholarship, isLoading, isError } = useScholarshipById(id);
  const { data: comments = [] } = useScholarshipComments(id);
  const { data: likesInfo } = useScholarshipLikes(id);
  const { mutate: toggleLike, isPending: likePending } = useToggleScholarshipLike();
  const { mutate: addComment, isPending: commentPending } = useAddScholarshipComment();

  // Related scholarships
  const { data: allScholarshipsData } = useScholarships(1);
  const relatedScholarships = (allScholarshipsData?.scholarships || [])
    .filter((s) => s.id !== id)
    .slice(0, 3);

  const [commentText, setCommentText] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success("Scholarship link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleLike = () => {
    if (!user) {
      toast.error("Please login to like scholarships");
      return;
    }
    toggleLike({ id });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) {
      toast.error("Please log in to ask questions");
      return;
    }
    addComment(
      { id, content: commentText.trim() },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Question posted! Our admissions team will review it.");
        },
        onError: () => {
          toast.error("Failed to post comment.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <main className="public-page min-h-[70vh] flex flex-col items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Loading Scholarship Dossier…
          </p>
        </div>
      </main>
    );
  }

  if (isError || !scholarship) {
    return (
      <main className="public-page min-h-[70vh] flex flex-col items-center justify-center py-24">
        <div className="max-w-md text-center space-y-4 p-8 rounded-3xl border border-border bg-card shadow-sm">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Scholarship Not Found</h2>
          <p className="text-sm text-muted-foreground">
            The scholarship listing you requested might have expired, been updated, or moved to another link.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={() => navigate("/scholarships")} className="rounded-xl font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scholarships
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const {
    title,
    description,
    image_url,
    deadline,
    link,
    university,
    country,
    degree_level,
    funding_type,
    coverage = [
      "100% Full Tuition Waiver",
      "Comprehensive Monthly Living Allowance",
      "Roundtrip International Airfare",
      "Full Public / Private Health Insurance",
      "Academic Book & Research Grant",
    ],
    eligibility = [
      "Open to high-achieving international applicants including Ethiopian citizens",
      "Minimum required academic performance (Top 10% or equivalent GPA > 3.6)",
      "Demonstrated track record of leadership, community engagement, or research",
      "English proficiency through official testing (IELTS/TOEFL) or institutional medium-of-instruction waiver",
    ],
    documents = [
      "Official Certified Academic Transcripts & Graduation Diplomas",
      "Tailored Statement of Purpose / Motivation Letter",
      "2-3 Letters of Recommendation from Teachers or Academic Supervisors",
      "Curriculum Vitae (CV) highlighting leadership, honors & research",
      "Valid International Passport",
    ],
  } = scholarship;

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Open / Rolling Submission";

  const isLiked = likesInfo?.liked ?? false;
  const currentLikes = likesInfo?.likesCount ?? (scholarship.likes_count || 0);

  return (
    <main className="public-page scholarship-detail-page">
      {/* ---------------- Breadcrumb Navigation ---------------- */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl py-3.5 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="hover:text-foreground">Home</NavLink>
            <span>/</span>
            <NavLink to="/scholarships" className="hover:text-foreground">Scholarships</NavLink>
            <span>/</span>
            <span className="text-foreground truncate max-w-xs sm:max-w-md">{title}</span>
          </div>

          <NavLink
            to="/scholarships"
            className="hidden sm:inline-flex items-center gap-1.5 text-primary hover:underline font-bold"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </NavLink>
        </div>
      </div>

      {/* ---------------- Hero Section ---------------- */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Image Banner */}
            <div className="w-full lg:w-96 shrink-0 aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-lg relative bg-muted">
              <img
                src={image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80"}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Verified Award
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Globe2 className="h-3.5 w-3.5 text-yellow-400" />
                  {country || "International"}
                </span>
                <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px]">
                  {degree_level || "Undergraduate & Graduate"}
                </span>
              </div>
            </div>

            {/* Title & Key Attributes */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  {funding_type || "Fully Funded (100% Ride)"}
                </span>
                {university && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    <Building2 className="h-3.5 w-3.5" />
                    {university}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-display leading-[1.15]">
                {title}
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>

              {/* Fast Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/60 px-3.5 py-1.5 rounded-full border border-border/60">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Application Deadline: <strong>{formattedDeadline}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    disabled={likePending}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      isLiked
                        ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400"
                        : "border-border/70 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{currentLikes} {currentLikes === 1 ? "Like" : "Likes"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-border/70 text-muted-foreground hover:bg-muted"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedLink ? "Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4-Stat Strip ---------------- */}
      <div className="border-b border-border/60 bg-muted/30 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-1 scholarship-card-item">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Funding Level</span>
              <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">100% Full Ride</p>
              <p className="text-[11px] text-muted-foreground">Tuition + Stipend + Flights</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-1 scholarship-card-item">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Level</span>
              <p className="text-base font-extrabold text-foreground">{degree_level || "Postgraduate"}</p>
              <p className="text-[11px] text-muted-foreground">All qualified majors</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-1 scholarship-card-item">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Host Region</span>
              <p className="text-base font-extrabold text-foreground">{country || "Global"}</p>
              <p className="text-[11px] text-muted-foreground">International Students Eligible</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-1 scholarship-card-item">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Application Cycle</span>
              <p className="text-base font-extrabold text-primary">{formattedDeadline.split(",")[0]}</p>
              <p className="text-[11px] text-muted-foreground">Check official portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Main Body & Sidebar ---------------- */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Complete Coverage & Financial Benefits */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  💰
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  Comprehensive Coverage & Benefits
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recipients of the {title} receive comprehensive institutional and governmental financial coverage designed to eliminate barriers to world-class higher education:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {coverage.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{item}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Fully covered under award terms</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Eligibility Criteria */}
            <section className="space-y-4 border-t border-border/60 pt-8">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  🎓
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  Eligibility Criteria & Academic Prerequisites
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Before beginning your application, verify that your profile meets the following core benchmark standards:
              </p>

              <ul className="space-y-3 pt-2">
                {eligibility.map((criterion, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Required Application Materials */}
            <section className="space-y-4 border-t border-border/60 pt-8">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  📑
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  Required Application Dossier
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ensure you have prepared and certified the following documents before the deadline:
              </p>

              <div className="space-y-2.5 pt-2">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Step-by-Step How to Apply */}
            <section className="space-y-4 border-t border-border/60 pt-8">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  🚀
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  Step-by-Step Application Guide
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">Review Department & Faculty Specializations</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Confirm your degree track, target university faculty, and identify professors whose research aligns with your career goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">Craft Your Personal Statement & Essays</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Admissions committees look for distinct purpose and resilience. Have your drafts reviewed by an experienced mentor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">Submit via Official Application Portal</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Complete all biographical fields, upload certified academic PDFs, and ensure your recommenders submit before the cutoff date.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Q&A Community Discussion Forum */}
            <section className="space-y-6 border-t border-border/60 pt-8" id="qa-forum">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    Scholar Discussion & Q&A ({comments.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ask questions about GPA eligibility, deadlines, essays, or visa details.
                  </p>
                </div>
              </div>

              {/* Thread */}
              <div className="space-y-3">
                {comments.length > 0 ? (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl bg-card border border-border/80 p-5 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                            {c.first_name ? c.first_name[0].toUpperCase() : "S"}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground">{c.first_name} {c.last_name}</p>
                            <p className="text-[10px] text-muted-foreground">Scholar Applicant</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : "Recently"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 pl-10 leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-muted/20">
                    <p className="text-sm text-muted-foreground italic">
                      No questions submitted yet. Be the first to start the discussion!
                    </p>
                  </div>
                )}
              </div>

              {/* Post Question Form */}
              <form onSubmit={handlePostComment} className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Ask a Question About This Scholarship
                </h4>
                <Textarea
                  placeholder="Ask anything about eligibility, GPA, deadlines, or essays for this scholarship..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="rounded-xl border-border bg-background p-3.5 text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary min-h-[90px]"
                />
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs text-muted-foreground">
                    Answered by Negus counselors & verified scholars
                  </span>
                  <Button
                    type="submit"
                    disabled={commentPending || !commentText.trim()}
                    className="rounded-xl px-5 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="h-3 w-3 mr-1.5" />
                    {commentPending ? "Submitting…" : "Post Question"}
                  </Button>
                </div>
              </form>
            </section>
          </div>

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Primary Action Card */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-md space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Applications Open
                </span>
                <p className="text-lg font-bold text-foreground">Ready to Apply?</p>
                <p className="text-xs text-muted-foreground">
                  Official submissions are processed through the university foundation portal.
                </p>
              </div>

              <div className="space-y-3">
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full rounded-xl py-6 font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                      Go to Official Portal
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}

                <NavLink to="/packages" className="block w-full">
                  <Button variant="outline" className="w-full rounded-xl py-6 font-bold text-sm border-border hover:bg-muted">
                    Get Application Coaching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </NavLink>
              </div>

              <div className="pt-3 border-t border-border/60 text-center">
                <p className="text-xs text-muted-foreground">
                  Deadline: <strong>{formattedDeadline}</strong>
                </p>
              </div>
            </div>

            {/* Direct Advisor Help Card */}
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Need Quick Advice?</h4>
                  <p className="text-xs text-muted-foreground">Talk directly to a Negus Counselor</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have questions regarding the CSS Profile, ISFAA, or your GPA eligibility for this award? Speak directly with our admissions desk.
              </p>
              <a
                href="https://t.me/negushelpcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                Chat on Telegram <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Similar Scholarships */}
            {relatedScholarships.length > 0 && (
              <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-4">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2 font-display">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Similar Opportunities
                </h4>
                <div className="space-y-3">
                  {relatedScholarships.map((rel) => (
                    <NavLink
                      key={rel.id}
                      to={`/scholarships/${rel.id}`}
                      className="group/rel block rounded-2xl border border-border/60 p-3.5 hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/40"
                    >
                      <p className="text-xs font-bold text-foreground group-hover/rel:text-primary transition-colors line-clamp-1">
                        {rel.title}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1.5">
                        <span>{rel.country || "International"}</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {rel.funding_type?.includes("Full") ? "Fully Funded" : "Merit Award"}
                        </span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
