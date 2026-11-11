// src/pages/CollegePackages/Components/OrderDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link } from "react-router";
import {
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  ArrowRight,
  Loader2,
  FileCheck,
  AlertCircle,
  Sparkles,
  Phone,
  Send,
  PhoneCall,
} from "lucide-react";
import {
  useCreateEssayOrder,
  useCreateFixedServiceOrder,
  useCreateMentorshipOrder,
  useCreateApplicationPackageOrder,
} from "../../../hooks/useNegusOrders";
import { useEssayQuote } from "../../../hooks/useNegusCatalog";
import { useSubmitPayment } from "../../../hooks/useNegusPayments";
import { fileToBase64 } from "../../../utils/fileToBase64";
import {
  SUPPORT_PHONE,
  SUPPORT_TELEGRAM_HANDLE,
  SUPPORT_TELEGRAM_URL,
} from "../../../config/supportContact";
import { useMe } from "../../../hooks/useAuth";

const AGREEMENTS = {
  essay: {
    title: "Standalone Service Terms & Guarantees",
    points: [
      "One essay per service request — multiple essays are billed individually.",
      "You may request one round of editing on the delivered draft.",
      "Full refund minus a 5% processing fee if cancelled within 48 hours, before work starts. 50% refund of the unworked portion after work starts but before the first draft. No refund once the QA-approved first draft is delivered.",
    ],
  },
  "fixed-service": {
    title: "Service Terms & Conditions",
    points: [
      "Full refund minus a 5% processing fee if cancelled within 48 hours, before work starts.",
      "No refund once the completed service has been delivered.",
    ],
  },
  mentorship: {
    title: "Mentorship Terms & Guidelines",
    points: [
      "Refunds are prorated based on sessions not yet held, minus a 10% administrative fee.",
      "The first (diagnostic) session is non-refundable once held.",
    ],
  },
  "application-package": {
    title: "Full Application Package Terms",
    points: [
      "The final college list is decided by the student.",
      "Round 1 is paid before the application starts, Round 2 during submission, and Round 3 after the visa is secured.",
      "Missing documents or 5+ days of non-response on your end don't obligate us to extend the delivery timeline or refund missed deadlines.",
      "Full refund minus a 5% processing fee if cancelled within 48 hours, before work starts. 50% refund of the unworked portion after work starts but before the first draft. No refund once the QA-approved first draft is delivered.",
    ],
  },
};

const getOrderKey = (intent) => {
  if (!intent) return null;
  if (intent.type === "essay") return "essay"; // one in-progress essay draft at a time
  if (intent.type === "fixed-service")
    return `fixed:${intent.payload.fixedServiceCode}`;
  if (intent.type === "mentorship")
    return `mentorship:${intent.payload.mentorshipPackageCode}`;
  if (intent.type === "application-package")
    return `application:${intent.payload.applicationPackageCode}`;
  return null;
};

const STEP_BADGE = {
  confirm: "Confirm Availability",
  details: "Step 1: Configuration & Terms",
  payment: "Step 2: Secure Payment",
  submitted: "Verification Pending",
  done: "Successfully Submitted",
};

export default function OrderDialog({ intent, onOpenChange }) {
  const { data: user, isLoading: isUserLoading } = useMe();
  const [step, setStep] = useState("confirm"); // "confirm" | "details" | "payment" | "submitted" | "done"
  const [essayForm, setEssayForm] = useState({
    serviceType: "writing",
    turnaroundDays: 4,
    wordCount: 650,
    essayTitle: "",
  });
  const [collegeListText, setCollegeListText] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  // in-progress orders that survive the dialog being closed, keyed by item
  const [ordersByKey, setOrdersByKey] = useState({});
  // items the user has already clicked "I already checked" for, this session
  const [confirmedKeys, setConfirmedKeys] = useState({});

  const createEssay = useCreateEssayOrder();
  const createFixed = useCreateFixedServiceOrder();
  const createMentorship = useCreateMentorshipOrder();
  const createApplication = useCreateApplicationPackageOrder();
  const submitPayment = useSubmitPayment();

  const { data: quote } = useEssayQuote({
    serviceType: essayForm.serviceType,
    turnaroundDays: essayForm.turnaroundDays,
    wordCount: essayForm.wordCount,
  });

  // whenever the dialog opens for an item, resume it from cache instead of always starting over
  useEffect(() => {
    if (!intent) return; // closing shouldn't wipe progress
    setScreenshotFile(null);
    setAgreed(false);

    const key = getOrderKey(intent);
    const cached = key ? ordersByKey[key] : null;
    if (cached) {
      setInvoice(cached.invoice);
      setStep(
        cached.invoice.status === "payment_submitted" ? "submitted" : "payment",
      );
    } else if (key && confirmedKeys[key]) {
      setInvoice(null);
      setStep("details");
    } else {
      setInvoice(null);
      setStep("confirm");
    }
  }, [intent]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!intent) return null;

  if (!isUserLoading && !user) {
    return (
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Create an account or sign in before placing an order. Your package
            details will be ready when you return.
          </p>
          <DialogFooter className="gap-2 sm:justify-start">
            <Link
              to="/login"
              state={{ from: "/packages" }}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              state={{ from: "/packages" }}
              className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Create account
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const agreement = AGREEMENTS[intent.type];

  const handleConfirmChecked = () => {
    const key = getOrderKey(intent);
    setConfirmedKeys((prev) => ({ ...prev, [key]: true }));
    setStep("details");
  };

  const handleCreateOrder = async () => {
    if (!contactPhone.trim()) {
      return toast.error("Add a phone number so we can reach you.");
    }
    try {
      const key = getOrderKey(intent);
      const shared = { contactPhone, agreedToTerms: agreed };
      let result;
      if (intent.type === "essay") {
        result = await createEssay.mutateAsync({
          ...essayForm,
          ...shared,
        });
      } else if (intent.type === "fixed-service") {
        result = await createFixed.mutateAsync({
          ...intent.payload,
          ...shared,
        });
      } else if (intent.type === "mentorship") {
        result = await createMentorship.mutateAsync({
          ...intent.payload,
          ...shared,
        });
      } else if (intent.type === "application-package") {
        const collegeList = collegeListText
          .split("\n")
          .map((c) => c.trim())
          .filter(Boolean);
        result = await createApplication.mutateAsync({
          ...intent.payload,
          collegeList,
          ...shared,
        });
      }
      setOrdersByKey((prev) => ({ ...prev, [key]: result }));
      setInvoice(result.invoice);
      setStep("payment");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please sign in or create an account before placing an order.");
        return;
      }
      toast.error(err.response?.data?.errors?.[0] || "Couldn't create the order. Try again.");
    }
  };

  const handleSubmitPayment = async () => {
    if (!screenshotFile)
      return toast.error("Attach a screenshot of your payment first.");
    try {
      const key = getOrderKey(intent);
      const base64Data = await fileToBase64(screenshotFile);
      await submitPayment.mutateAsync({
        invoiceId: invoice.id,
        amountClaimed: invoice.amount_etb,
        data: base64Data,
      });
      setOrdersByKey((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          invoice: { ...prev[key].invoice, status: "payment_submitted" },
        },
      }));
      setStep("done");
      toast.success("Payment submitted — we'll verify it shortly.");
    } catch (err) {
      toast.error(
        err.response?.data?.errors?.[0] ||
          "Couldn't submit the payment. Try again.",
      );
    }
  };

  const handleStartOver = () => {
    const key = getOrderKey(intent);
    setOrdersByKey((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setInvoice(null);
    setStep("details");
    setAgreed(false);
  };

  const isCreating =
    createEssay.isPending ||
    createFixed.isPending ||
    createMentorship.isPending ||
    createApplication.isPending;

  return (
    <Dialog open={!!intent} onOpenChange={onOpenChange}>
      <DialogContent className="negus-order-dialog sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl p-6 shadow-2xl">
        <style>{`
          .negus-order-dialog {
            --dialog-ink: #123d2b;
            --dialog-muted: #56745f;
            --dialog-paper: #fffdf6;
            --dialog-soft: #f3f5f2;
            --dialog-gold: #d1bd82;
            border: 1px solid rgba(18, 61, 43, .16);
            background: var(--dialog-paper);
            color: var(--dialog-ink);
            font-family: var(--font-body, "Outfit", sans-serif);
          }
          .negus-order-dialog [data-slot="dialog-title"] {
            color: var(--dialog-ink);
            font-family: var(--font-display, "Lexend", sans-serif);
            font-size: clamp(20px, 3vw, 26px);
            letter-spacing: -.035em;
          }
          .negus-order-dialog [data-slot="dialog-description"] { color: var(--dialog-muted); }
          .negus-order-dialog .text-slate-900,
          .negus-order-dialog .text-foreground { color: var(--dialog-ink); }
          .negus-order-dialog .text-muted-foreground { color: var(--dialog-muted); }
          .negus-order-dialog .text-primary { color: var(--dialog-ink); }
          .negus-order-dialog .bg-primary { background: var(--dialog-ink); }
          .negus-order-dialog .bg-primary\\/5 { background: var(--dialog-soft); }
          .negus-order-dialog .bg-slate-50,
          .negus-order-dialog .bg-slate-50\\/50,
          .negus-order-dialog .bg-slate-50\\/70 { background: var(--dialog-soft); }
          .negus-order-dialog .border-primary\\/20,
          .negus-order-dialog .border-primary\\/30 { border-color: rgba(18, 61, 43, .2); }
          .negus-order-dialog .border-border\\/60,
          .negus-order-dialog .border-border\\/80 { border-color: rgba(18, 61, 43, .14); }
          .negus-order-dialog input,
          .negus-order-dialog textarea,
          .negus-order-dialog select {
            border-color: rgba(18, 61, 43, .18);
            background: #fff;
            color: var(--dialog-ink);
          }
          .negus-order-dialog input:focus,
          .negus-order-dialog textarea:focus,
          .negus-order-dialog select:focus {
            border-color: var(--dialog-ink);
            box-shadow: 0 0 0 3px rgba(18, 61, 43, .12);
            outline: none;
          }
          .negus-order-dialog button:not([data-state]) {
            font-family: var(--font-display, "Lexend", sans-serif);
          }
          .negus-order-dialog .bg-primary.text-primary-foreground,
          .negus-order-dialog button.bg-primary {
            background: var(--dialog-ink);
            color: #fff;
          }
          .negus-order-dialog .bg-primary.text-primary-foreground:hover,
          .negus-order-dialog button.bg-primary:hover { background: #19523b; }
          .negus-order-dialog .file\\:bg-primary::file-selector-button {
            background: var(--dialog-ink);
            color: #fff;
          }
          .negus-order-dialog .negus-terms-card {
            padding: 18px;
            border: 1px solid rgba(18, 61, 43, .14);
            border-radius: 16px;
            background: var(--dialog-soft);
          }
          .negus-order-dialog .negus-terms-title {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin: 0;
            color: var(--dialog-ink);
            font-size: 13px;
            font-weight: 800;
            letter-spacing: .04em;
            line-height: 1.45;
            text-transform: uppercase;
          }
          .negus-order-dialog .negus-terms-list {
            display: grid;
            gap: 10px;
            margin: 14px 0 0;
            padding: 0;
            list-style: none;
            color: var(--dialog-muted);
            font-size: 14px;
            line-height: 1.65;
          }
          .negus-order-dialog .negus-terms-list li {
            display: grid;
            grid-template-columns: 16px minmax(0, 1fr);
            gap: 8px;
            align-items: start;
          }
          .negus-order-dialog .negus-terms-list li > span:first-child {
            color: var(--dialog-ink);
            font-weight: 800;
          }
          .negus-order-dialog .negus-terms-agreement {
            display: grid;
            grid-template-columns: 20px minmax(0, 1fr);
            gap: 10px;
            align-items: start;
            padding-top: 14px;
            color: var(--dialog-ink);
            font-size: 14px;
            font-weight: 600;
            line-height: 1.6;
          }
          .negus-order-dialog .negus-terms-agreement button {
            margin-top: 2px;
          }
          @media (max-width: 640px) {
            .negus-order-dialog {
              width: calc(100vw - 24px);
              max-width: calc(100vw - 24px);
              padding: 20px;
              border-radius: 20px;
            }
            .negus-order-dialog .grid-cols-2 { grid-template-columns: 1fr; }
            .negus-order-dialog [data-slot="dialog-footer"] {
              flex-direction: column-reverse;
              align-items: stretch;
            }
            .negus-order-dialog [data-slot="dialog-footer"] > * { width: 100%; }
          }
        `}</style>
        {/* Header with visual indicator */}
        <DialogHeader className="space-y-2 pb-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-0.5 text-xs font-semibold text-primary border-primary/30 bg-primary/5"
            >
              {STEP_BADGE[step]}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {intent.label}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Sign in or create your Negus account before continuing so your order,
            invoice, and payment proof stay connected to your profile.
          </p>
        </DialogHeader>

        <Separator className="my-2" />

        {/* ---------------- STEP 0: CONFIRM AVAILABILITY ---------------- */}
        {step === "confirm" && (
          <div className="space-y-5 pt-2">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-border/60 text-sm text-muted-foreground">
              Packages can fill up or change — before you continue, confirm with
              our team that{" "}
              <strong className="text-foreground">{intent.label}</strong> is
              currently available.
            </div>

            <div className="space-y-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
              <a
                href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:underline"
              >
                <PhoneCall className="h-4 w-4 text-primary" /> {SUPPORT_PHONE}
              </a>
              <a
                href={SUPPORT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:underline"
              >
                <Send className="h-4 w-4 text-primary" /> @
                {SUPPORT_TELEGRAM_HANDLE}
              </a>
            </div>

            <DialogFooter className="pt-2 flex-row gap-2 sm:justify-between">
              <Button
                variant="ghost"
                className="rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Not yet
              </Button>
              <Button
                className="rounded-xl font-bold shadow-md"
                onClick={handleConfirmChecked}
              >
                <span>I already checked continue</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* ---------------- STEP 1: DETAILS ---------------- */}
        {step === "details" && (
          <div className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Phone Number
              </Label>
              <Input
                type="tel"
                className="rounded-xl"
                placeholder="09xx xxx xxx"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            {intent.type === "essay" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Service Type
                    </Label>
                    <select
                      className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      value={essayForm.serviceType}
                      onChange={(e) =>
                        setEssayForm((f) => ({
                          ...f,
                          serviceType: e.target.value,
                        }))
                      }
                    >
                      <option value="writing">Writing</option>
                      <option value="editing">Editing</option>
                      <option value="reviewing">Reviewing</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Turnaround
                    </Label>
                    <select
                      className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      value={essayForm.turnaroundDays}
                      onChange={(e) =>
                        setEssayForm((f) => ({
                          ...f,
                          turnaroundDays: Number(e.target.value),
                        }))
                      }
                    >
                      <option value={4}>4 days</option>
                      <option value={5}>5 days</option>
                      {essayForm.serviceType !== "reviewing" && (
                        <option value={6}>6 days</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Word Count
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    className="rounded-xl"
                    value={essayForm.wordCount}
                    onChange={(e) =>
                      setEssayForm((f) => ({
                        ...f,
                        wordCount: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Essay Title (Optional)
                  </Label>
                  <Input
                    className="rounded-xl"
                    placeholder="e.g., Common App Personal Statement"
                    value={essayForm.essayTitle}
                    onChange={(e) =>
                      setEssayForm((f) => ({
                        ...f,
                        essayTitle: e.target.value,
                      }))
                    }
                  />
                </div>

                {quote && (
                  <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4 border border-primary/20">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estimated Price
                    </span>
                    <span className="text-xl font-black text-primary">
                      {quote.price.toLocaleString()} ETB
                    </span>
                  </div>
                )}
              </div>
            )}

            {intent.type === "fixed-service" && (
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-border/60 text-sm text-muted-foreground">
                You are about to initiate an order for{" "}
                <strong className="text-foreground">{intent.label}</strong>.
                Click continue below to generate your secure payment invoice.
              </div>
            )}

            {intent.type === "mentorship" && (
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-border/60 text-sm text-muted-foreground">
                Enrollment in{" "}
                <strong className="text-foreground">{intent.label}</strong>.
                Your assigned mentor will reach out immediately upon payment
                verification to schedule your diagnostic session.
              </div>
            )}

            {intent.type === "application-package" && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Colleges you're applying to (One per line, optional for now)
                </Label>
                <textarea
                  className="min-h-28 w-full rounded-xl border border-input bg-background p-3 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={collegeListText}
                  onChange={(e) => setCollegeListText(e.target.value)}
                  placeholder={"University of Toronto\nMcGill University\nUBC"}
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
                  <span>
                    Only Round 1 is due now. Subsequent rounds unlock as your
                    application progresses.
                  </span>
                </p>
              </div>
            )}

            {/* Terms & Agreement Card */}
            {agreement && (
              <div className="negus-terms-card space-y-3">
                <p className="negus-terms-title">
                  <AlertCircle className="h-3.5 w-3.5 text-primary" />
                  {agreement.title}
                </p>
                <ul className="negus-terms-list">
                  {agreement.points.map((point, i) => (
                    <li key={i}>
                      <span>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <label className="negus-terms-agreement cursor-pointer">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className="rounded-md"
                  />
                  <span>I have read and agree to these service terms and cancellation policies.</span>
                </label>
              </div>
            )}

            <DialogFooter className="pt-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <a
                  href="/login"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[rgba(18,61,43,.2)] px-4 text-sm font-bold text-[var(--ink)] hover:bg-[var(--green-subtle)]"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--ink)] px-4 text-sm font-bold text-white hover:bg-[#19523b]"
                >
                  Create account
                </a>
              </div>
              <Button
                className="w-full rounded-xl py-6 font-bold shadow-md"
                onClick={handleCreateOrder}
                disabled={isCreating || !agreed}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Invoice...
                  </>
                ) : (
                  <>
                    <span>Continue to Payment</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* ---------------- STEP 2: PAYMENT ---------------- */}
        {step === "payment" && invoice && (
          <div className="space-y-5 pt-2">
            <div className="rounded-xl bg-primary/5 p-5 border border-primary/20 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Payment Invoice Details
              </p>
              <p className="text-sm font-medium text-foreground">
                {invoice.description}
              </p>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-3xl font-black text-primary">
                  {Number(invoice.amount_etb).toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  ETB
                </span>
              </div>
            </div>

            {/* Bank Transfer Details with 1-Click Copy */}
            <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center justify-between">
                <span>Direct Bank Transfer Accounts</span>
                <span className="text-[10px] text-muted-foreground font-normal">Click account number to copy</span>
              </p>

              <div className="space-y-2 text-xs">
                {/* CBE */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/60">
                  <div>
                    <span className="font-bold text-foreground">Commercial Bank of Ethiopia (CBE)</span>
                    <p className="text-[11px] text-muted-foreground">Kidus Basazinew / Negus Consultants</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText("1000508218765");
                      toast.success("CBE Account Number copied: 1000508218765");
                    }}
                    className="font-mono font-bold text-primary hover:underline bg-primary/10 px-2 py-1 rounded"
                  >
                    1000508218765 📋
                  </button>
                </div>

                {/* Telebirr */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border/60">
                  <div>
                    <span className="font-bold text-foreground">Telebirr</span>
                    <p className="text-[11px] text-muted-foreground">Negus Consultants Desk</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText("0943041418");
                      toast.success("Telebirr number copied: 0943041418");
                    }}
                    className="font-mono font-bold text-primary hover:underline bg-primary/10 px-2 py-1 rounded"
                  >
                    0943041418 📋
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Upload Payment Screenshot / Receipt
              </Label>
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-slate-50/50 p-6 text-center hover:bg-slate-50 dark:bg-slate-900/30 transition-colors">
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs font-medium text-foreground mb-1">
                  {screenshotFile
                    ? screenshotFile.name
                    : "Drag and drop or browse to upload receipt"}
                </p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  PNG, JPG, or WEBP up to 10MB
                </p>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="max-w-xs text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                  onChange={(e) =>
                    setScreenshotFile(e.target.files?.[0] ?? null)
                  }
                />
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartOver}
                className="text-muted-foreground hover:text-foreground"
              >
                Start Over
              </Button>
              <Button
                className="rounded-xl px-6 font-bold shadow-md"
                onClick={handleSubmitPayment}
                disabled={submitPayment.isPending || !screenshotFile}
              >
                {submitPayment.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <span>Submit Payment</span>
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* ---------------- STEP 3: SUBMITTED ---------------- */}
        {step === "submitted" && (
          <div className="space-y-5 text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-2">
              <FileCheck className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Payment Already Submitted</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You already submitted a payment for this order — it is currently
                pending verification. Check your profile for status updates, or
                start over if that submission was a mistake.
              </p>
            </div>
            <DialogFooter className="sm:justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleStartOver}
                className="rounded-xl"
              >
                Start Over
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-xl font-bold px-6"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* ---------------- STEP 4: DONE ---------------- */}
        {step === "done" && (
          <div className="space-y-5 text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">
                Payment Successfully Submitted!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your payment proof has been uploaded and is pending
                verification. You'll be able to track its progress directly from
                your profile dashboard once confirmed.
              </p>
            </div>
            <DialogFooter className="sm:justify-center pt-4">
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-xl font-bold px-8 py-5"
              >
                Done & Return
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
