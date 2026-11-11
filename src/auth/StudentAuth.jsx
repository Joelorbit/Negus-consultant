import { useCallback, useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { SignUpStep } from "./components/SignUpStep";
import { MessageStep } from "./components/MessageStep";
import { WhereStep } from "./components/WhereStep";
import { useCreateContactMessage } from "../hooks/useContactMessages";

const steps = [
  { id: 1, title: "Sign Up" },
  { id: 2, title: "Message" },
  { id: 3, title: "Where" },
];

export const StudentAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    message: "",
    messageChoice: "",
    selectedOptions: [],
    additionalChoice: "",
    selectedCountry: [],
    timeline: "",
    referredBy: "",
    supportType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createContactMessage } = useCreateContactMessage();

  const updateFormData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createContactMessage({
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        subject: "Student guidance request",
        message: [
          formData.message.trim(),
          `Date of birth: ${formData.dateOfBirth}`,
          `Address: ${formData.address.trim()}`,
          `Preferred destinations: ${formData.selectedCountry.join(", ") || "Not specified"}`,
          `Timeline: ${formData.timeline || "Not specified"}`,
          `Referral source: ${formData.referredBy || "Not specified"}`,
          `Support goal: ${formData.supportType || "Not specified"}`,
        ].join("\n"),
      });
      toast.success("Your request has been sent. We’ll be in touch soon.");
      setCurrentStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        address: "",
        message: "",
        messageChoice: "",
        selectedOptions: [],
        additionalChoice: "",
        selectedCountry: [],
        timeline: "",
        referredBy: "",
        supportType: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "We could not send your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIllustration = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            renderMode="illustration"
          />
        );
      case 2:
        return (
          <MessageStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            renderMode="illustration"
          />
        );
      case 3:
        return (
          <WhereStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            renderMode="illustration"
          />
        );
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            renderMode="form"
          />
        );
      case 2:
        return (
          <MessageStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            renderMode="form"
          />
        );
      case 3:
        return (
          <WhereStep
            data={formData}
            updateData={updateFormData}
            onFinish={handleSubmit}
            isSubmitting={isSubmitting}
            onBack={prevStep}
            renderMode="form"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {renderIllustration()}
      </div>

      {/* Right form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Step Progress */}
        <div className="p-8 pb-0">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id < currentStep
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      step.id <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-4 h-px bg-border ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 p-8">{renderForm()}</div>
      </div>
    </div>
  );
};

export default StudentAuth;
