import { useEffect, useState } from "react";
import {
  CheckCircle,
  Copy,
  Check,
  FileImage,
  CreditCard,
  Shield,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router";
import { useMe } from "../../hooks/useAuth";
import { usePackageById } from "../../hooks/usePackages";
import { Button } from "../../components/ui/button";
import { useSubmitPaymentProof } from "../../hooks/useSubmitPaymentProof";
import ScreenshotUploader from "./components/ScreenShotUploader";
import ProgresBar from "./components/ProgresBar";
import { getPackagePriceBreakdown } from "../../utils/packagePricing";
import { usePackageOffer } from "../../hooks/useNegusCatalog";
import { smartNavigate } from "../../utils/mobileNavigation";
import { toast } from "sonner";
import "../public-pages.css";

const steps = [
  { id: 1, title: "Sign Up & Login", icon: Shield },
  { id: 2, title: "Send Payment", icon: CreditCard },
  { id: 3, title: "Upload Screenshot", icon: FileImage },
];

const PaymentInstruction = () => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data, isLoading: loading, error } = usePackageById(id);
  const {
    data: packageOffer,
    isLoading: loadingPackageOffer,
    isError: packageOfferError,
  } = usePackageOffer();
  const discountPercent = Number(packageOffer?.discountPercent ?? 0);
  const priceBreakdown = packageOffer
    ? getPackagePriceBreakdown(
        data?.data?.price,
        "",
        data?.data?.type !== "service",
        discountPercent,
      )
    : null;
  const {
    mutate: submitPayment,
    isPending: isSubmitting,
  } = useSubmitPaymentProof();

  const [currentStep, setCurrentStep] = useState(2);
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in or create an account before paying.");
      smartNavigate("/login", { state: { from: `/payment/${id}` } });
    }
  }, [id]);

  const bankDetails = [
    { label: "Package", value: data?.data?.name },
    { label: "Bank Name", value: "Commercial Bank of Ethiopia (CBE)" },
    { label: "Account Name", value: "Leulseged Mateb" },
    { label: "Account Number", value: "1000508218765" },
    { label: "Telebirr", value: "0943041418 (Sishana)" },
  ];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingPackageOffer || packageOfferError || !priceBreakdown) {
      toast.error("Current cohort pricing could not be verified. Reload and try again.");
      return;
    }
    if (!user?.id) {
      toast.error("Please sign in or create an account before submitting payment.");
      smartNavigate("/login", { state: { from: `/payment/${id}` } });
      return;
    }
    if (!screenshot) {
      toast.error("Upload your payment screenshot first.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(screenshot);

    reader.onloadend = () => {
      const base64Screenshot = reader.result;

      const payload = {
        user_id: user?.id,
        package_id: id,
        start_date: new Date().toISOString().split("T")[0],
        amount: priceBreakdown?.total || 0,
        screenshot_string: base64Screenshot,
      };

      submitPayment(payload, {
        onSuccess: () => {
          setIsSubmitted(true);
          setCurrentStep(3);
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Something went wrong";
          console.error(errorMessage);
          alert(errorMessage);
        },
      });
    };

    reader.onerror = () => {
      alert("Failed to read file.");
    };
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6 relative font-sans text-orange-300">
        <div className="max-w-md w-full bg-black/70 backdrop-blur-lg rounded-2xl shadow-xl border border-orange-700 p-8 text-center relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-orange-400 mb-4 drop-shadow-md">
            Payment Submitted!
          </h2>
          <p className="text-orange-300 mb-6 drop-shadow-sm">
            Your payment screenshot has been successfully submitted. We'll
            verify it within 24 hours and notify you once approved.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(2);
              setScreenshot(null);
            }}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Submit Another Payment
          </button>
        </div>
        {/* subtle background grid */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="gridPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 40 40 M 0 40 L 40 40"
                stroke="rgba(249, 115, 22, 0.4)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>
    );
  }

  if (loading)
    return (
      <p className="min-h-screen flex items-center justify-center text-orange-400 font-semibold text-lg">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500 font-semibold text-lg">
        Something went wrong
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12 px-4 relative font-sans text-orange-300">
      {/* subtle grid background */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="gridPattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 40 40 M 0 40 L 40 40"
              stroke="rgba(249, 115, 22, 0.4)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-400 mb-4 drop-shadow-lg">
            Complete Your Payment
          </h1>
          <p className="text-orange-300 text-lg drop-shadow-sm">
            Follow these simple steps to complete your payment process
          </p>
        </div>

        {priceBreakdown && (
          <div className="public-offer-price-panel">
            <div>
              <p>
                {data?.data?.name || "Selected package"}
                {priceBreakdown.offerSaving > 0 ? ` · ${discountPercent}% offer` : " · package price"}
              </p>
              <strong>ETB {priceBreakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              {priceBreakdown.offerSaving > 0 && (
                <del>List price: ETB {priceBreakdown.listPrice.toLocaleString()}</del>
              )}
            </div>
            {priceBreakdown.offerSaving > 0 && <span className="offer-pill">{discountPercent}% OFF</span>}
          </div>
        )}
        {loadingPackageOffer && <p role="status">Loading current cohort pricing…</p>}
        {packageOfferError && (
          <p role="alert">Current cohort pricing could not be loaded. Reload this page before submitting payment.</p>
        )}

        {/* Progress Bar */}
        <div className="mb-12">
          <ProgresBar steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="bg-black/60 rounded-2xl shadow-xl p-8 border border-orange-700">
          {/* Step 1 */}
          <div className="mb-8 p-6 bg-gradient-to-r from-black/60 via-orange-900/30 to-black/60 rounded-xl border border-orange-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center text-orange-300 font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-orange-300">
                Sign Up & Login
              </h3>
            </div>
            <p className="text-orange-400 ml-11">
              Make sure you're{" "}
              <span className="font-semibold text-orange-500">
                signed up and logged in
              </span>{" "}
              to your account before proceeding.
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-8 p-6 bg-gradient-to-r from-black/60 via-orange-900/30 to-black/60 rounded-xl border border-orange-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center text-orange-300 font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-orange-300">
                Send Payment
              </h3>
            </div>

            <div className="ml-11">
              <p className="text-orange-400 mb-4">
                Send the payment to the following account details:
              </p>

              <div className="bg-black/40 rounded-xl p-6 shadow-sm border border-orange-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl text-orange-400 mb-2">
                      Commercial Bank of Ethiopia
                    </h4>
                    <div className="space-y-2">
                      {bankDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-black/60 transition-colors duration-200"
                        >
                          <div>
                            <span className="text-sm text-orange-500">
                              {detail.label}:
                            </span>
                            <span className="ml-2 font-semibold text-orange-300 tabular-nums text-base">
                              {detail.value}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(detail.value, detail.label)
                            }
                            className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 hover:bg-orange-700 rounded-lg transition-colors duration-200 group"
                          >
                            {copiedField === detail.label ? (
                              <Check size={16} className="text-green-400" />
                            ) : (
                              <Copy
                                size={16}
                                className="text-orange-500 group-hover:text-orange-400"
                              />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-8 p-6 bg-gradient-to-r from-black/60 via-orange-900/30 to-black/60 rounded-xl border border-orange-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center text-orange-300 font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-orange-300">
                Upload Screenshot
              </h3>
            </div>

            <div className="ml-11">
              <p className="text-orange-400 mb-4">
                Upload a clear screenshot of your payment confirmation:
              </p>

              <ScreenshotUploader
                screenshot={screenshot}
                setScreenshot={setScreenshot}
              />
            </div>
          </div>

          {/* Warning Message */}
          <div className="mb-8 p-4 bg-orange-900/40 border border-orange-700 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-orange-400" />
              <div>
                <p className="text-orange-400 font-medium">Important Notice</p>
                <p className="text-orange-300 text-sm">
                  Please ensure your screenshot clearly shows the payment
                  details and transaction ID.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!screenshot || isSubmitting || loadingPackageOffer || packageOfferError || !priceBreakdown}
            className={`
              w-full py-10 rounded-xl font-semibold text-lg transition-all duration-200 transform
              ${
                !screenshot || isSubmitting
                  ? "bg-orange-900/30 text-orange-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:scale-105 shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin text-orange-300" />
                Submitting...
              </div>
            ) : (
              "Submit Payment Screenshot"
            )}
          </Button>

          {/* Footer Info */}
          <div className="mt-6 p-4 bg-black/30 rounded-xl text-center text-orange-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={16} className="text-orange-400" />
              <span className="text-sm">
                Verification Time:{" "}
                <span className="font-semibold text-orange-400">24 hours</span>
              </span>
            </div>
            <p className="text-xs">
              You'll receive a confirmation email once your payment is verified
              and approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstruction;
