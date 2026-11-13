import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMe } from "../../../../../hooks/useAuth";
import {
  usePackageOffer,
  useUpdatePackageOffer,
} from "../../../../../hooks/useNegusCatalog";
import { toast } from "sonner";

const PackageOfferEditor = () => {
  const { data: user } = useMe();
  const {
    data: packageOffer,
    isLoading,
    isError,
    refetch,
  } = usePackageOffer();
  const { mutateAsync: updatePackageOffer, isPending } = useUpdatePackageOffer();
  const [discountPercent, setDiscountPercent] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (packageOffer) {
      setDiscountPercent(String(packageOffer.discountPercent));
    }
  }, [packageOffer]);

  if (user?.role !== "admin") return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = Number(discountPercent);
    if (
      discountPercent.trim() === "" ||
      !Number.isInteger(value) ||
      value < 0 ||
      value > 100
    ) {
      setValidationError("Enter a whole number between 0 and 100.");
      return;
    }

    setValidationError("");
    try {
      await updatePackageOffer(value);
      toast.success("Cohort discount updated.");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Could not update the cohort discount.";
      setValidationError(message);
      toast.error(message);
    }
  };

  return (
    <section
      className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="package-offer-editor-title"
    >
      <div className="mb-4">
        <h2 id="package-offer-editor-title" className="text-lg font-bold text-gray-900">
          Limited Enrolment Discount
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Set the percentage shown on eligible package prices. Use 0 to turn the offer off.
        </p>
      </div>

      {isError ? (
        <div className="flex flex-col gap-3 text-sm text-red-700 sm:flex-row sm:items-center">
          <p>Could not load the current discount.</p>
          <Button type="button" variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleSubmit}>
          <div className="grid w-full max-w-xs gap-2">
            <Label htmlFor="package-offer-percent">Discount percentage</Label>
            <div className="relative">
              <Input
                id="package-offer-percent"
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                step="1"
                required
                value={discountPercent}
                onChange={(event) => {
                  setDiscountPercent(event.target.value);
                  setValidationError("");
                }}
                disabled={isLoading || isPending}
                aria-invalid={Boolean(validationError)}
                aria-describedby={validationError ? "package-offer-error" : "package-offer-help"}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                %
              </span>
            </div>
            <p id="package-offer-help" className="text-xs text-gray-500">
              Whole numbers from 0 to 100.
            </p>
            {validationError && (
              <p id="package-offer-error" className="text-sm text-red-600" role="alert">
                {validationError}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading || isPending}>
            {isPending ? "Saving…" : "Save discount"}
          </Button>
        </form>
      )}
    </section>
  );
};

export default PackageOfferEditor;
