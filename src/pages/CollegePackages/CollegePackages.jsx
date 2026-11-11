// src/pages/CollegePackages/CollegePackages.jsx
import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Users,
  FileText,
  Clock,
  ShieldCheck,
  ArrowRight,
  Zap,
  HelpCircle,
  BookOpen,
  ArrowDown,
  Download,
  Check,
  Send,
  Building2,
  DollarSign,
} from "lucide-react";
import {
  useFixedServices,
  useEssayPricingRates,
  useMentorshipPackages,
  useApplicationPackages,
} from "../../hooks/useNegusCatalog";
import { usePackages } from "../../hooks/usePackages";
import {
  mockCatalogFixedServices,
  mockCatalogEssayRates,
  mockCatalogMentorshipPackages,
  mockCatalogApplicationPackages,
  mockPackagesList,
} from "../../mock/mockData";
import { PackageCard } from "../Packages/Components/PackagesCard";
import { Testimonials } from "../Packages/Components/Testimonial";
import { PricingFAQ } from "../Packages/Components/PricingFAQ";
import OrderDialog from "./Components/OrderDialog";
import { teamMembers } from "../Testimonials/Components/TeamSection";
import "../public-pages.css";

const ROUND_LABELS = {
  before_application_started: "Round 1 · Before Application Starts",
  during_application_submission: "Round 2 · During Submission",
  after_visa_secured: "Round 3 · After Visa Secured (Pay only if won!)",
};

export default function CollegePackages() {
  const [orderIntent, setOrderIntent] = useState(null); // { type, payload, label, amount }
  const [selectedPackage, setSelectedPackage] = useState(1);
  const navigate = useNavigate();

  const { data: fixedServicesRaw } = useFixedServices();
  const fixedServices = (fixedServicesRaw && fixedServicesRaw.length > 0) ? fixedServicesRaw : mockCatalogFixedServices;

  const { data: essayRatesRaw } = useEssayPricingRates();
  const essayRates = (essayRatesRaw && essayRatesRaw.length > 0) ? essayRatesRaw : mockCatalogEssayRates;

  const { data: mentorshipPackagesRaw, isLoading: loadingMentorship } = useMentorshipPackages();
  const mentorshipPackages = (mentorshipPackagesRaw && mentorshipPackagesRaw.length > 0) ? mentorshipPackagesRaw : mockCatalogMentorshipPackages;

  const { data: applicationPackagesRaw, isLoading: loadingApplication } = useApplicationPackages();
  const applicationPackages = (applicationPackagesRaw && applicationPackagesRaw.length > 0) ? applicationPackagesRaw : mockCatalogApplicationPackages;

  const { data: packages, isLoading: loadingCoursePkgs } = usePackages();
  const coursePackages = (packages?.data && packages.data.length > 0)
    ? packages.data.filter((pkg) => pkg.access_type || !pkg.type || pkg.type === "package")
    : mockPackagesList;

  const essayByType = (type) =>
    (essayRates ?? [])
      .filter((r) => r.service_type === type)
      .sort((a, b) => a.turnaround_days - b.turnaround_days);

  return (
    <main className="public-page packages-page">
      {/* ---------------- Hero Section ---------------- */}
      <section className="public-page-hero">
        <div className="public-page-hero-inner">
          <p className="public-eyebrow">
            <GraduationCap aria-hidden="true" /> TRANSPARENT, MILESTONE-BASED ADMISSIONS SUPPORT
          </p>
          <h1 className="public-page-title">
            Pick the level of guidance that fits your <em>ambition.</em>
          </h1>
          <p className="public-page-copy">
            From single essay polishes and CSS Profile guidance to full-cycle application management.
            Transparent milestone payments with zero hidden fees — pay the final round only after winning your visa.
          </p>

          <div className="public-page-actions">
            <a className="public-button public-button-primary" href="#package-catalog">
              Explore Packages <ArrowRight aria-hidden="true" />
            </a>
            <NavLink className="public-button public-button-secondary" to="/scholarships">
              Browse Scholarships
            </NavLink>
          </div>

          <div className="public-hero-note">
            <Check aria-hidden="true" /> Milestone Payments · Zero Hidden Fees · Pay Round 3 Only After Visa
          </div>
        </div>
      </section>

      {/* ---------------- 50% OFF Offer Banner ---------------- */}
      <section className="container mx-auto px-4 max-w-6xl pt-10">
        <aside className="public-offer-banner" aria-label="Negus Package Offer">
          <div className="public-offer-copy">
            <span className="public-offer-kicker">LIMITED ENROLLMENT COHORT</span>
            <h3>Make your dream university affordable.</h3>
            <p>
              Save up to 50% on eligible admissions packages and masterclasses. All prices listed in transparent Ethiopian Birr (ETB) with flexible round-by-round payment milestones.
            </p>
          </div>
          <div className="public-offer-stamp" aria-hidden="true">
            <strong>50%</strong>
            <span>OFF</span>
          </div>
        </aside>
      </section>

      {/* ---------------- Meet Some of Your Mentors ---------------- */}
      <section className="container mx-auto px-4 max-w-6xl pt-12 pb-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              World-Class Mentorship
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Meet Some of Your Mentors
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Learn directly from scholars who walked the exact same path and won full scholarships at NYU Shanghai, NYU Abu Dhabi, Sarah Lawrence, and beyond.
            </p>
          </div>
          <NavLink
            to="/mentors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            View All Mentors <ArrowRight className="h-3.5 w-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(teamMembers || []).slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="group relative rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg flex items-center gap-4"
            >
              <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
                  {mentor.name}
                </h3>
                <p className="text-xs font-medium text-primary line-clamp-1">
                  {mentor.role}
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {mentor.department}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(mentor.specialties || []).slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Main Content & Tabs ---------------- */}
      <section className="container mx-auto px-4 max-w-6xl py-10" id="package-catalog">
        <Tabs defaultValue="application" className="w-full space-y-12">
          {/* Custom Styled Tab List */}
          <div className="flex justify-center">
            <TabsList className="inline-flex h-auto flex-wrap items-center justify-center gap-2 rounded-2xl bg-muted/60 p-2 border border-border/80 shadow-sm">
              <TabsTrigger
                value="application"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span>Full Application Packages</span>
              </TabsTrigger>
              <TabsTrigger
                value="mentorship"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Users className="h-4 w-4 shrink-0" />
                <span>1-on-1 Mentorship</span>
              </TabsTrigger>
              <TabsTrigger
                value="standalone"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span>Standalone Services</span>
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>Course Packages</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ---------------- 1. Full Application Packages ---------------- */}
          <TabsContent value="application" className="focus-visible:outline-none space-y-10">
            {/* Visual Milestone Progression Info Card */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Zero Risk Guarantee
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display mt-1">
                    How Negus 3-Round Milestone Payments Work
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl">
                    We divide all comprehensive college admissions support into 3 transparent milestone rounds.
                    You do not pay for subsequent stages until each previous milestone is achieved.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Student-First Guarantee
                  </span>
                </div>
              </div>

              {/* 3 Step Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-extrabold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">Initial Step</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Before Application Starts</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Strategy kickoff, college shortlist selection, extracurricular audit, and scholarship targeting.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-extrabold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">Active Drafting</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">During Application Submission</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Common App completion, personal statement polishing, supplemental essays, and teacher recommendation guidance.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="h-7 w-7 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Only Upon Success</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">After Visa Is Secured</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You only pay the success milestone after receiving your I-20 and securing your approved visa stamp!
                  </p>
                </div>
              </div>
            </div>

            {/* Application Package Cards Grid */}
            {loadingApplication ? (
              <div className="grid gap-8 md:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-96 rounded-3xl border border-border bg-muted/30 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-3 items-stretch">
                {applicationPackages?.map((pkg, idx) => {
                  const isPopular = pkg.popular || idx === 1;

                  return (
                    <div
                      key={pkg.code}
                      className={`relative flex flex-col justify-between rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                        isPopular
                          ? "border-2 border-primary bg-card shadow-lg lg:-translate-y-2"
                          : "border border-border/80 bg-card hover:border-primary/40"
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground shadow-md">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                            {pkg.name}
                          </h3>
                          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            <span>Up to {pkg.max_colleges} colleges</span>
                            <span>·</span>
                            <span>{pkg.timeline_working_days} working days</span>
                          </div>
                        </div>

                        {/* Scope Highlights */}
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span className="text-foreground">
                              <strong>1 Personal Statement</strong> + up to {pkg.max_supplemental} supplementals
                            </span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span className="text-muted-foreground">
                              {pkg.supplemental_word_cap.toLocaleString()}-word supplemental cap
                            </span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span className="text-muted-foreground">
                              {pkg.recommendation_letters_label} support
                            </span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span className="text-muted-foreground">
                              CSS Profile & Institutional Aid guidance
                            </span>
                          </div>
                        </div>

                        <Separator className="bg-border/60" />

                        {/* Milestone Payment Breakdown */}
                        <div className="space-y-3">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                            Round-by-Round Payment Schedule
                          </p>
                          <div className="space-y-2 rounded-2xl bg-muted/40 p-4 border border-border/50 text-xs">
                            {pkg.rounds
                              ?.sort((a, b) => a.round_number - b.round_number)
                              .map((round) => (
                                <div
                                  key={round.id}
                                  className="flex items-center justify-between gap-2 py-1 border-b border-border/40 last:border-0"
                                >
                                  <span className="text-muted-foreground font-medium truncate">
                                    {ROUND_LABELS[round.trigger] || `Round ${round.round_number}`}
                                  </span>
                                  <span className="font-extrabold whitespace-nowrap text-foreground font-mono">
                                    {Number(round.amount_etb).toLocaleString()} ETB
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-8">
                        <Button
                          className={`w-full rounded-2xl py-6 font-bold text-sm transition-all shadow-md ${
                            isPopular
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border hover:bg-muted text-foreground"
                          }`}
                          variant={isPopular ? "default" : "outline"}
                          onClick={() =>
                            setOrderIntent({
                              type: "application-package",
                              label: pkg.name,
                              payload: { applicationPackageCode: pkg.code },
                            })
                          }
                        >
                          <span>Apply for {pkg.name.replace(" Application Package", "")}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ---------------- 2. Mentorship Packages ---------------- */}
          <TabsContent value="mentorship" className="focus-visible:outline-none space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                1-on-1 Admissions Mentorship Tiers
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Work directly with Ethiopian scholars who won full-ride scholarships at MIT, Columbia, Oxford, and NYU.
              </p>
            </div>

            {loadingMentorship ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-80 rounded-3xl border border-border bg-muted/30 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {mentorshipPackages?.map((pkg) => (
                  <Card
                    key={pkg.code}
                    className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold">
                          {pkg.duration_label}
                        </Badge>
                        <span className="text-xs font-bold text-muted-foreground">
                          {pkg.session_count} Sessions
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-foreground font-display">
                          {pkg.name}
                        </h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-foreground font-mono">
                            {Number(pkg.price_etb).toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">ETB</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground font-medium">
                          Cadence: {pkg.cadence_label}
                        </p>
                      </div>

                      {pkg.overview && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {pkg.overview}
                        </p>
                      )}

                      <Separator className="bg-border/60" />

                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {pkg.features?.slice(0, 5).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 space-y-2">
                      <Button
                        className="w-full rounded-2xl py-5 font-bold text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() =>
                          setOrderIntent({
                            type: "mentorship",
                            label: pkg.name,
                            payload: { mentorshipPackageCode: pkg.code },
                          })
                        }
                      >
                        Select {pkg.name.replace(" Mentorship", "").replace(" — Common App Application Mentorship", "").replace(" — Profile Development (Pre-Application)", "")}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ---------------- 3. Standalone Services & Essay Rates ---------------- */}
          <TabsContent value="standalone" className="space-y-10 focus-visible:outline-none">
            {/* Essay Pricing Rates Table */}
            <Card className="rounded-3xl border border-border/80 bg-card shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Pay Per Word · Tailored Turnaround
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground font-display mt-1">
                    Essay Writing, Editing & Reviewing Rates
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Transparent rates based on exact word counts and turnaround speed.
                  </p>
                </div>
                <Badge variant="outline" className="w-fit gap-1 bg-background text-xs font-bold">
                  <Zap className="h-3.5 w-3.5 text-amber-500" /> Fast Delivery
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pr-4 font-bold">Service Type</th>
                      <th className="pb-3 pr-4 font-bold">4-Day Express</th>
                      <th className="pb-3 pr-4 font-bold">5-Day Standard</th>
                      <th className="pb-3 pr-4 font-bold">6-Day Regular</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      ["writing", "Essay Writing (Drafting from interview)"],
                      ["editing", "Essay Editing (Heavy structural revision)"],
                      ["reviewing", "Essay Reviewing (Diagnostic feedback)"],
                    ].map(([type, label]) => (
                      <tr key={type} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4 font-bold text-foreground">{label}</td>
                        {[4, 5, 6].map((days) => {
                          const rate = essayByType(type).find((r) => r.turnaround_days === days);
                          return (
                            <td key={days} className="py-4 pr-4">
                              {rate ? (
                                <span className="inline-flex items-center gap-1 rounded-xl bg-muted px-3 py-1 text-xs font-bold text-foreground font-mono">
                                  {Number(rate.rate_per_word_etb)} ETB{" "}
                                  <span className="text-[10px] font-normal text-muted-foreground">/ word</span>
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  className="rounded-xl px-6 font-bold text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() =>
                    setOrderIntent({
                      type: "essay",
                      label: "Essay Service",
                    })
                  }
                >
                  Order Custom Essay Service <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>

            {/* Specialized Fixed Services */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground font-display">
                Specialized Application Support Services
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {fixedServices?.map((srv) => (
                  <Card
                    key={srv.code}
                    className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-sm hover:border-primary/40 transition-all"
                  >
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-foreground font-display">{srv.name}</h4>
                      <div className="text-2xl font-extrabold text-foreground font-mono">
                        {Number(srv.price_etb).toLocaleString()}{" "}
                        <span className="text-xs font-bold text-muted-foreground">ETB</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {srv.description || "One-on-one professional guidance and verification."}
                      </p>
                    </div>

                    <div className="pt-6">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl text-xs font-bold border-border hover:bg-muted"
                        onClick={() =>
                          setOrderIntent({
                            type: "fixed-service",
                            label: srv.name,
                            payload: { fixedServiceCode: srv.code },
                          })
                        }
                      >
                        Select Service
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ---------------- 4. Course Packages ---------------- */}
          <TabsContent value="courses" className="focus-visible:outline-none space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                Video Masterclasses & Self-Paced Toolkits
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Watch full comprehensive lecture modules covering Common App, CSS Profile, and winning scholarship stories.
              </p>
            </div>

            {loadingCoursePkgs ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-80 rounded-3xl border border-border bg-muted/30 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {coursePackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackage === pkg.id}
                    onNavigate={() => navigate(`/packages/full-course/${pkg.id}`)}
                    onSelect={() => setSelectedPackage(pkg.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* ---------------- Testimonials & FAQs ---------------- */}
      <section className="container mx-auto px-4 max-w-6xl py-12 border-t border-border/60">
        <Testimonials />
      </section>

      <section className="public-content public-package-faq">
        <PricingFAQ />
      </section>

      {/* ---------------- Order Dialog Modal ---------------- */}
      <OrderDialog
        intent={orderIntent}
        onOpenChange={(open) => !open && setOrderIntent(null)}
      />
    </main>
  );
}
