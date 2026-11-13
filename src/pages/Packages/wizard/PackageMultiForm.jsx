import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useMe } from "../../../hooks/useAuth";
import { useCreateApplication } from "../../../hooks/useApplication";
import { usePackageById } from "../../../hooks/usePackages";
import { toast } from "sonner";
import { smartNavigate } from "../../../utils/mobileNavigation";
import { getPackagePriceBreakdown } from "../../../utils/packagePricing";
import { usePackageOffer } from "../../../hooks/useNegusCatalog";

import PackageHeader from "./components/PackageHeader";
import PackageStepTracker from "./components/PackageStepTracker";
import PackageStep1Personal from "./components/PackageStep1Personal";
import PackageStep2Academic from "./components/PackageStep2Academic";
import PackageStep3Preferences from "./components/PackageStep3Preferences";
import PackageStep4Payment from "./components/PackageStep4Payment";
import PackageSuccessModal from "./components/PackageSuccessModal";

import { User, GraduationCap, Globe, CreditCard, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import "../../public-pages.css";

export default function PackageMultiStepForm() {
  const { id } = useParams();
  const { data: user } = useMe();
  const { mutate: createApplication, isPending: isSubmittingApp } = useCreateApplication();
  const { data: pkg } = usePackageById(id);
  const {
    data: packageOffer,
    isLoading: loadingPackageOffer,
    isError: packageOfferError,
  } = usePackageOffer();
  const discountPercent = Number(packageOffer?.discountPercent ?? 0);

  const [step, setStep] = useState(1);
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [matricFile, setMatricFile] = useState(null);
  const [copiedBankIndex, setCopiedBankIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const bankDetails = [
    { label: "Account Name", value: "Leulseged Mateb", copyValue: "Leulseged Mateb", icon: User },
    { label: "CBE Account", value: "1000508218765", copyValue: "1000508218765", icon: CreditCard },
    { label: "Telebirr", value: "0943041418 (Sishana)", copyValue: "0943041418", icon: CreditCard },
  ];

  const handleCopyAccount = (value, idx) => {
    navigator.clipboard.writeText(value);
    setCopiedBankIndex(idx);
    toast.success(`Copied: ${value}`);
    setTimeout(() => setCopiedBankIndex(null), 2500);
  };

  const [formData, setFormData] = useState({
    user_id: user?.id,
    package_id: id,
    phone: "",
    telegram: "",
    dob: "",
    referral: "",
    academicStatus: "",
    school: "",
    gpa: "",
    transcript: "",
    matricCertificate: "",
    examScore: "",
    classRank: "",
    tests: [],
    scores: "",
    topUniversities: "",
    familyContribution: "",
    screenshot_string: "",
  });

  const priceBreakdown = packageOffer
    ? getPackagePriceBreakdown(
        pkg?.data?.price,
        formData.referral,
        pkg?.data?.type !== "service",
        discountPercent,
      )
    : null;

  // Sync user and package IDs
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_id: user?.id ?? prev.user_id,
      package_id: id ?? prev.package_id,
    }));
  }, [user?.id, id]);

  // Auth gate
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to access this package application");
      const fromRoute = id ? `/packages/${id}` : "/packages";
      smartNavigate("/login", { state: { from: fromRoute } });
    }
  }, [id, token]);

  // Convert files
  useEffect(() => {
    if (transcriptFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, transcript: reader.result }));
      };
      reader.readAsDataURL(transcriptFile);
    }
  }, [transcriptFile]);

  useEffect(() => {
    if (matricFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, matricCertificate: reader.result }));
      };
      reader.readAsDataURL(matricFile);
    }
  }, [matricFile]);

  useEffect(() => {
    if (screenshot) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, screenshot_string: reader.result }));
      };
      reader.readAsDataURL(screenshot);
    } else {
      setFormData((prev) => ({ ...prev, screenshot_string: "" }));
    }
  }, [screenshot]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTest = (test) => {
    const current = formData.tests || [];
    if (current.includes(test)) {
      handleChange("tests", current.filter((t) => t !== test));
    } else {
      handleChange("tests", [...current, test]);
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (!user?.id) {
      newErrors.general = "Please log in to continue and submit your application.";
      setErrors(newErrors);
      return false;
    }

    if (currentStep === 1) {
      if (!formData.phone || String(formData.phone).trim().length < 7) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (!formData.telegram || String(formData.telegram).trim() === "") {
        newErrors.telegram = "Please provide your Telegram username.";
      }
      if (!formData.dob) {
        newErrors.dob = "Please select your date of birth.";
      }
    }

    if (currentStep === 2) {
      if (!formData.academicStatus || String(formData.academicStatus).trim() === "") {
        newErrors.academicStatus = "Please select your current academic status.";
      }
      if (!formData.school || String(formData.school).trim() === "") {
        newErrors.school = "Please enter your school or university name.";
      }
      if (!formData.gpa || String(formData.gpa).trim() === "") {
        newErrors.gpa = "Please enter your GPA.";
      }

      if (pkg?.data?.type === "package") {
        if (!formData.transcript && !transcriptFile) {
          newErrors.transcript = "Please upload your transcript.";
        }
        if (!formData.matricCertificate && !matricFile) {
          newErrors.matricCertificate = "Please upload your matric certificate.";
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.topUniversities || String(formData.topUniversities).trim() === "") {
        newErrors.topUniversities = "Please list your top university choices (comma separated).";
      }
    }

    if (currentStep === 4) {
      if (loadingPackageOffer || packageOfferError) {
        newErrors.general =
          "We couldn't verify the current cohort price. Please reload and try again before submitting.";
      }
      if (!formData.screenshot_string && !screenshot) {
        newErrors.screenshot_string = "Please upload your payment confirmation screenshot.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmitAll = () => {
    if (!validateStep(4)) return;

    if (step === 4) {
      const finalizeSubmit = (finalScreenshot) => {
        const payload = {
          ...formData,
          screenshot_string: finalScreenshot || formData.screenshot_string,
        };
        createApplication(payload, {
          onSuccess: () => {
            setIsSubmitted(true);
            setStep(1);
            setScreenshot(null);
            setErrors({});
            toast.success("Application submitted successfully!");
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to submit application. Please try again.");
          },
        });
      };

      if (screenshot && !formData.screenshot_string) {
        const reader = new FileReader();
        reader.onloadend = () => {
          finalizeSubmit(reader.result);
        };
        reader.readAsDataURL(screenshot);
      } else {
        finalizeSubmit(formData.screenshot_string);
      }
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User, description: "Contact details" },
    { number: 2, title: "Academic Background", icon: GraduationCap, description: "Educational journey" },
    { number: 3, title: "Preferences", icon: Globe, description: "University targets" },
    { number: 4, title: "Payment", icon: CreditCard, description: "Verification & submit" },
  ];

  if (isSubmitted) {
    return <PackageSuccessModal packageName={pkg?.data?.name} />;
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-['Outfit'] py-12 px-4 sm:px-6">
      <style>{`
        /* ── Shared field/label/input tokens ─────────────── */
        .pkgw-label { display: block; font-family: var(--font-display); font-size: 12.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--ink); margin-bottom: 9px; }
        .pkgw-helper { display: block; font-size: 12.5px; line-height: 1.55; color: var(--ink-muted); margin-top: 8px; }
        .pkgw-error { display: block; font-size: 12.5px; font-weight: 600; color: #b14438; margin-top: 8px; }
        .dark .pkgw-error { color: #f4a9a0; }
        .pkgw-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-ink); margin-bottom: 8px; }
        .pkgw-eyebrow::before { content: ''; width: 22px; height: 2px; background: currentColor; flex-shrink: 0; }

        .pkgw-inputwrap { position: relative; }
        .pkgw-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--ink-muted); pointer-events: none; }
        .pkgw-input { min-height: 48px; font-size: 15px; line-height: 1.4; border-radius: 12px; background: var(--paper); border: 1px solid var(--line-strong); color: var(--ink); }
        .pkgw-input::placeholder { color: var(--ink-muted); }
        .pkgw-input--pl { padding-left: 42px; }
        .pkgw-input--file { font-size: 13.5px; padding: 0 14px; background: var(--white); }
        .pkgw-input:focus, .pkgw-input:focus-visible { border-color: var(--ink-secondary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ink-secondary) 18%, transparent); }

        /* ── Layout shells ──────────────────────────────── */
        .pkgw-card { display: flex; flex-direction: column; gap: 28px; background: var(--white); border: 1px solid var(--line); border-radius: 26px; padding: 28px; box-shadow: var(--shadow-sm); }
        .pkgw-stepbody { max-width: 720px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .pkgw-fieldgroup { display: flex; flex-direction: column; gap: 22px; }
        .pkgw-field { display: flex; flex-direction: column; }
        .pkgw-grid2 { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .pkgw-stephead { border-bottom: 1px solid var(--line); padding-bottom: 20px; }
        .pkgw-steptitle { font-family: var(--font-display); font-weight: 800; letter-spacing: -.02em; font-size: clamp(24px, 2.8vw, 30px); color: var(--ink); margin: 6px 0 10px; line-height: 1.2; }
        .pkgw-stepintro { font-size: 14.5px; line-height: 1.65; color: var(--ink-secondary); margin: 0; }
        .pkgw-section { padding: 24px; border: 1px solid var(--line); border-radius: 20px; background: var(--paper); display: flex; flex-direction: column; gap: 18px; }
        .pkgw-section--tint { background: var(--green-subtle); }

        /* ── Choice cards ───────────────────────────────── */
        .pkgw-choice { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; min-height: 44px; padding: 14px 16px; border-radius: 14px; border: 1.5px solid var(--line); background: var(--paper); cursor: pointer; transition: border-color .18s ease, background .18s ease, box-shadow .18s ease; }
        .pkgw-choice:hover { border-color: var(--ink-secondary); }
        .pkgw-choice.is-selected { border-color: var(--ink); background: var(--green-subtle); box-shadow: var(--shadow-xs); }
        .pkgw-choice-body { display: flex; flex-direction: column; min-width: 0; }
        .pkgw-choice-title { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.35; }
        .pkgw-choice-sub { font-size: 12.5px; line-height: 1.5; color: var(--ink-muted); margin-top: 5px; }
        .pkgw-choice-radio { width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--line-strong); color: transparent; }
        .pkgw-choice.is-selected .pkgw-choice-radio { background: var(--ink); border-color: var(--ink); color: #fff; }

        /* ── Chips & pills ──────────────────────────────── */
        .pkgw-chiprow { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .pkgw-chip { min-height: 44px; padding: 12px 18px; border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 14px; font-weight: 700; border: 1.5px solid var(--line); background: var(--paper); color: var(--ink); cursor: pointer; transition: all .16s ease; }
        .pkgw-chip:hover { border-color: var(--ink-secondary); }
        .pkgw-chip.is-selected { background: var(--ink); border-color: var(--ink); color: #fff; }
        .dark .pkgw-chip.is-selected { color: #08130d; }
        .pkgw-scores { margin-top: 2px; }
        .pkgw-pillgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
        .pkgw-pill { min-height: 44px; padding: 12px 16px; border-radius: 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-family: var(--font-display); font-size: 13.5px; font-weight: 700; border: 1.5px solid var(--line); background: var(--paper); color: var(--ink); cursor: pointer; text-align: left; transition: all .16s ease; }
        .pkgw-pill:hover { border-color: var(--ink-secondary); }
        .pkgw-pill.is-selected { background: var(--ink); border-color: var(--ink); color: #fff; }
        .dark .pkgw-pill.is-selected { color: #08130d; }
        .pkgw-pill-label { min-width: 0; }

        /* ── Directory card (step 3) ────────────────────── */
        .pkgw-directory { display: flex; flex-direction: column; gap: 16px; padding: 22px; border-radius: 20px; border: 1px solid var(--line); background: var(--green-subtle); }
        .pkgw-directory-copy { display: flex; flex-direction: column; gap: 8px; }
        .pkgw-directory-title { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--ink); }
        .pkgw-directory-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--ink-secondary); flex-shrink: 0; }
        .pkgw-directory-sub { font-size: 13px; line-height: 1.6; color: var(--ink-secondary); margin: 0; }
        .pkgw-directory-link { min-height: 44px; padding: 0 20px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 12px; background: var(--ink); color: #fff; font-family: var(--font-display); font-size: 14px; font-weight: 700; flex-shrink: 0; transition: transform .16s ease, box-shadow .16s ease; }
        .dark .pkgw-directory-link { color: #08130d; }
        .pkgw-directory-link:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

        /* ── Price panel (step 4) ───────────────────────── */
        .pkgw-price { gap: 14px; }
        .pkgw-price-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 14px; color: var(--ink-secondary); }
        .pkgw-price-strong { font-weight: 700; color: var(--ink); }
        .pkgw-price-label { display: flex; align-items: center; gap: 8px; }
        .pkgw-price-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .pkgw-price-was { text-decoration: line-through; text-decoration-thickness: 1px; color: var(--ink-muted); font-variant-numeric: tabular-nums; }
        .pkgw-price-mono { font-variant-numeric: tabular-nums; white-space: nowrap; }
        .pkgw-price-total { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 16px; border-top: 1px solid var(--line-strong); font-family: var(--font-display); font-size: 15px; font-weight: 800; color: var(--ink); }
        .pkgw-price-amount { font-size: clamp(20px, 2.4vw, 24px); color: var(--gold-ink); }

        /* ── Account copy buttons ───────────────────────── */
        .pkgw-account-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .pkgw-account-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .pkgw-account { display: flex; flex-direction: column; justify-content: space-between; gap: 12px; min-height: 68px; padding: 14px 16px; border-radius: 14px; border: 1.5px solid var(--line-strong); background: var(--paper); cursor: pointer; text-align: left; width: 100%; transition: border-color .16s ease, background .16s ease, transform .12s ease; }
        .pkgw-account:hover { border-color: var(--ink); transform: translateY(-1px); }
        .pkgw-account.is-copied { border-color: var(--ink); background: var(--green-subtle); }
        .pkgw-account-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .pkgw-account-label { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; color: var(--ink-muted); }
        .pkgw-account-label svg { color: var(--ink-secondary); }
        .pkgw-account-copyicon { width: 16px; height: 16px; color: var(--ink-muted); }
        .pkgw-account-copied { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 700; color: var(--ink); }
        .pkgw-account-value { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--ink); font-variant-numeric: tabular-nums; letter-spacing: .01em; line-height: 1.4; word-break: break-all; }

        /* ── Dropzone wrapper + note ────────────────────── */
        .pkgw-dropzone { min-height: 140px; display: flex; flex-direction: column; }
        .pkgw-note { display: flex; align-items: flex-start; gap: 12px; padding: 16px 18px; border-radius: 14px; border: 1px solid var(--line); background: var(--paper); font-size: 13.5px; line-height: 1.6; color: var(--ink-secondary); }
        .pkgw-note svg { flex-shrink: 0; }

        /* ── Header ─────────────────────────────────────── */
        .pkgw-head { display: flex; flex-direction: column; gap: 24px; }
        .pkgw-head-toprow { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
        .pkgw-backlink { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 2px; font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--ink); background: transparent; border: none; border-bottom: 2px solid var(--ink); cursor: pointer; transition: color .16s ease, border-color .16s ease; }
        .pkgw-backlink:hover { color: var(--ink-secondary); border-color: var(--ink-secondary); }
        .pkgw-head-badge { display: inline-flex; align-items: center; gap: 8px; min-height: 34px; padding: 6px 14px; border-radius: 9999px; font-family: var(--font-display); font-size: 12.5px; font-weight: 700; background: var(--yellow-soft); color: var(--ink); border: 1px solid var(--line); }
        .pkgw-head-hero { text-align: center; display: flex; flex-direction: column; gap: 12px; }
        .pkgw-head-hero .pkgw-eyebrow { justify-content: center; }
        .pkgw-head-title { font-size: clamp(30px, 4.5vw, 48px); margin: 0; }
        .pkgw-head-lead { color: var(--ink-secondary); font-size: 16px; line-height: 1.65; max-width: 640px; margin: 0 auto; }
        .pkgw-directline { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--white); box-shadow: var(--shadow-sm); }
        .pkgw-directline-main { display: flex; align-items: center; gap: 14px; }
        .pkgw-directline-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--green-soft); color: var(--ink); }
        .pkgw-directline-title { display: block; font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--ink); }
        .pkgw-directline-num { display: block; font-size: 13.5px; color: var(--ink-secondary); font-variant-numeric: tabular-nums; margin-top: 2px; }
        .pkgw-directline-links { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .pkgw-directlink { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 12px; border-radius: 10px; font-size: 13.5px; font-weight: 700; color: var(--ink); border: 1px solid var(--line); transition: background .16s ease, border-color .16s ease; }
        .pkgw-directlink:hover { background: var(--green-subtle); border-color: var(--ink-secondary); }
        .pkgw-directlink--muted { color: var(--ink-secondary); }

        /* ── Step tracker ───────────────────────────────── */
        .pkgw-tracker { display: flex; flex-direction: column; gap: 16px; }
        .pkgw-tracker-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .pkgw-tracker-bar span { height: 6px; border-radius: 3px; background: var(--line); transition: background .24s ease; }
        .pkgw-tracker-bar span.is-active { background: var(--gold-ink); }
        .pkgw-tracker-tabs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .pkgw-tracker-tab { display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 12px 14px; border-radius: 16px; border: 1px solid var(--line); background: color-mix(in srgb, var(--white) 55%, transparent); opacity: .55; transition: all .2s ease; }
        .pkgw-tracker-tab.is-current { background: var(--white); border-color: var(--ink); opacity: 1; box-shadow: var(--shadow-xs); }
        .pkgw-tracker-tab.is-done { background: var(--white); opacity: 1; }
        .pkgw-tracker-num { width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 13px; font-weight: 800; background: var(--paper); color: var(--ink-muted); border: 1px solid var(--line); }
        .pkgw-tracker-tab.is-done .pkgw-tracker-num { background: var(--ink); border-color: var(--ink); color: #fff; }
        .pkgw-tracker-tab.is-current .pkgw-tracker-num { background: var(--yellow); border-color: var(--yellow); color: var(--ink); }
        .pkgw-tracker-text { display: flex; flex-direction: column; min-width: 0; }
        .pkgw-tracker-step { font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-muted); }
        .pkgw-tracker-title { font-family: var(--font-display); font-size: 13.5px; font-weight: 700; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── Card navigation ────────────────────────────── */
        .pkgw-banner { padding: 16px 18px; border-radius: 14px; border: 1px solid #e7c9c3; background: #fbeeea; color: #93342a; font-size: 14px; font-weight: 600; line-height: 1.5; }
        .pkgw-navwrap { max-width: 720px; width: 100%; margin: 0 auto; }
        .pkgw-navrow { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 24px; border-top: 1px solid var(--line); }
        .pkgw-cta { min-height: 52px; padding: 0 26px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 12px; background: var(--ink); color: #fff; border: 1px solid var(--ink); font-family: var(--font-display); font-size: 14.5px; font-weight: 700; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform .16s ease, box-shadow .16s ease, background .16s ease; }
        .dark .pkgw-cta { color: #08130d; }
        .pkgw-cta:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .pkgw-cta--submit { background: var(--ink-secondary); border-color: var(--ink-secondary); color: #fff; }
        .dark .pkgw-cta--submit { color: #08130d; }
        .pkgw-cta:disabled { opacity: .7; cursor: not-allowed; transform: none; box-shadow: none; }

        /* ── Responsive ─────────────────────────────────── */
        @media (min-width: 640px) {
          .pkgw-grid2 { grid-template-columns: 1fr 1fr; }
          .pkgw-card { padding: 34px; }
          .pkgw-pillgrid { grid-template-columns: repeat(4, 1fr); }
          .pkgw-account-grid { grid-template-columns: repeat(3, 1fr); }
          .pkgw-tracker-tabs { grid-template-columns: repeat(4, 1fr); }
          .pkgw-directory { flex-direction: row; align-items: center; justify-content: space-between; }
        }
        @media (max-width: 639px) {
          .pkgw-card { padding: 20px; }
          .pkgw-section { padding: 20px; }
          .pkgw-navrow { flex-direction: row; }
          .pkgw-cta { padding: 0 20px; font-size: 14px; }
        }
      `}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} className="space-y-8">
        
        {/* Modular Header */}
        <PackageHeader pkg={pkg} />

        {/* Modular Step Tracker */}
        <PackageStepTracker steps={steps} currentStep={step} />

        {/* General Error Banner */}
        {errors.general && (
          <div className="pkgw-banner">
            {errors.general}
          </div>
        )}

        {/* Main Card with Active Step Component */}
        <div className="pkgw-card">
          {step === 1 && (
            <PackageStep1Personal
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {step === 2 && (
            <PackageStep2Academic
              formData={formData}
              handleChange={handleChange}
              toggleTest={toggleTest}
              setTranscriptFile={setTranscriptFile}
              setMatricFile={setMatricFile}
              isPackageTrack={pkg?.data?.type === "package"}
              errors={errors}
            />
          )}

          {step === 3 && (
            <PackageStep3Preferences
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {step === 4 && (
            <PackageStep4Payment
              priceBreakdown={priceBreakdown}
              discountPercent={discountPercent}
              loadingPackageOffer={loadingPackageOffer}
              packageOfferError={packageOfferError}
              bankDetails={bankDetails}
              handleCopyAccount={handleCopyAccount}
              copiedBankIndex={copiedBankIndex}
              screenshot={screenshot}
              setScreenshot={setScreenshot}
              errors={errors}
            />
          )}

          {/* Form Navigation Controls */}
          <div className="pkgw-navwrap">
            <div className="pkgw-navrow">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="pkgw-backlink">
                  <ArrowLeft className="w-4 h-4" /> Previous Step
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button type="button" onClick={nextStep} className="pkgw-cta">
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  disabled={isSubmittingApp}
                  className="pkgw-cta pkgw-cta--submit"
                >
                  {isSubmittingApp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application…</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Submit Application</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
