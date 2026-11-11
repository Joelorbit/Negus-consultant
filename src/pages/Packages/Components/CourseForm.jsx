import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useParams } from "react-router";
import { usePackageById } from "../../../hooks/usePackages";
import { Award, CheckCircle, CreditCard, User } from "lucide-react";
import ScreenshotUploader from "../../Package/components/ScreenShotUploader";
import { useEffect } from "react";
import { useMe } from "../../../hooks/useAuth";
import { useCreateSubscriptions } from "../../../hooks/useSubscriptions";
import { smartNavigate } from "../../../utils/mobileNavigation";

const CourseForm = () => {
  const { data: user } = useMe();
  const [refError, setRefError] = useState("");
  const [discount, setDiscount] = useState("");
  const { id } = useParams();
  const [screenshot, setScreenshot] = useState(null);
  const { data: pkg } = usePackageById(id);
  const [formData, setFormData] = useState({
    user_id: user?.id,
    package_id: id,
    screenshot_string: "",
    phone_number: "",
    referred_by: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const bankDetails = [
    { label: "Package", value: pkg?.data?.name, icon: Award },
    { label: "Account Name", value: "Leulseged Mateb", icon: User },
    { label: "CBE", value: "1000508218765", icon: CreditCard },
    { label: "Tele Birr", value: "0943041418 (Sishana)", icon: CreditCard },
  ];
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_id: user?.id ?? prev.user_id,
      package_id: id ?? prev.package_id,
    }));
  }, [user?.id, id]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this package");

      const fromRoute = `/packages/full-course/${id}`;

      smartNavigate("/login", { state: { from: fromRoute } });
    }
  }, [token, id]);

  useEffect(() => {
    if (screenshot) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          screenshot_string: reader.result,
        }));
      };
      reader.readAsDataURL(screenshot);
    } else {
      setFormData((prev) => ({ ...prev, screenshot_string: "" }));
    }
  }, [screenshot]);

  const { mutate: createSubscrition } = useCreateSubscriptions();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phone number validation
    if (!formData.phone_number) {
      setErrorMsg("Phone number is required");
      return;
    }

    if (formData.referred_by === user?.referral_code) {
      //give error and return
      return setRefError(`You can't use your own referral code!`);
    }
    // Clear previous errors
    setRefError("");
    setErrorMsg("");
    setIsSubmitting(true);

    createSubscrition(
      {
        user_id: formData.user_id,
        package_id: formData.package_id,
        screenshot_string: formData.screenshot_string,
        phone_number: formData.phone_number,
        referred_by: formData.referred_by,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setIsSubmitting(false);
        },
        onError: () => {
          setErrorMsg("Failed to submit payment. Try again.");
          setIsSubmitting(false);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };
  const handleApplyReferral = () => {
    if (formData.referred_by.startsWith("negus")) {
      setDiscount(
        `10% discount applied! Pay only ${
          pkg?.data?.price - pkg?.data?.price / 10
        } birr`,
      );
    } else {
      setDiscount("Invalid code — no discount applied.");
    }
  };

  if (isSuccess) {
    return (
      <div className="mt-20 mb-20 max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Submitted Successfully 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. We will verify your account within{" "}
          <span className="font-semibold text-emerald-600">24 hours</span>. If
          any problem contact on telegram
        </p>
        <Button onClick={() => (window.location.href = "/profile")}>
          Go to Profile
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 mb-20 max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4"
    >
      <div className="mt-4 flex justify-center items-center">
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-sm">
            💡 Note:{" "}
            <span className="text-orange-600 font-semibold hover:underline">
              Login
            </span>{" "}
            first before purchasing the package to ensure your subscription is
            linked to your account.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {bankDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-emerald-200 hover:bg-white transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <detail.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {detail.label}:
              </span>
            </div>
            <span className="font-semibold text-gray-800">{detail.value}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Label htmlFor="package_id">Package name</Label>
        <p>{pkg?.data?.name}</p>
      </div>
      <div className="flex justify-between">
        <Label htmlFor="package_id">Package Price</Label>
        {formData.referred_by.startsWith("negus") ? (
          <p>{pkg?.data?.price - pkg?.data?.price / 10} birr</p>
        ) : (
          <p>{pkg?.data?.price} birr</p>
        )}
      </div>

      <div className="flex flex-col justify-between gap-y-3">
        <Label htmlFor="package_id">Phone</Label>
        <Input
          name="phone_number"
          type="number"
          placeholder="251.."
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          className="w-full py-5 bg-background border border-input focus:border-ring text-foreground placeholder:text-muted-foreground"
        />
      </div>
      {/* REFERRAL CODE */}
      <div className="flex flex-col justify-between gap-y-3">
        <Label htmlFor="referral_code">Referral Code</Label>
        <Input
          type="text"
          placeholder="Enter referral code"
          onChange={(e) =>
            setFormData({ ...formData, referred_by: e.target.value })
          }
          className="w-full py-5 bg-background border border-input focus:border-ring"
        />
      </div>

      {/* DISCOUNT CODE */}
      <div className="flex flex-col justify-between gap-y-3">
        <Label htmlFor="discount_code">Discount Code</Label>
        <div className="flex justify-between items-center gap-x-2">
          <Input
            type="text"
            placeholder="Enter discount code"
            onChange={(e) =>
              setFormData({ ...formData, referred_by: e.target.value })
            }
            className="w-full py-5 bg-background border border-input focus:border-ring"
          />
          <Button size="sm" type="button" onClick={handleApplyReferral}>
            apply
          </Button>
        </div>

        {discount && <p className="text-sm text-green-600">{discount}</p>}
      </div>

      <div className="flex flex-col gap-y-4">
        <Label htmlFor="proof">Upload Payment Proof</Label>
        <ScreenshotUploader
          screenshot={screenshot}
          setScreenshot={setScreenshot}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Buy"}
      </Button>
      {refError && <p className="mt-2 text-md text-red-500">{refError}</p>}
      <p>{errorMsg && errorMsg}</p>
    </form>
  );
};
export default CourseForm;
//more than 3 device ! colorized
