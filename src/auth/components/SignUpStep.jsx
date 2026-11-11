import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignUpStep = ({
  data,
  updateData,
  onNext,
  renderMode = "form",
}) => {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const nextErrors = {};
    if (!data.firstName?.trim()) nextErrors.firstName = "Enter your first name.";
    if (!data.lastName?.trim()) nextErrors.lastName = "Enter your last name.";
    if (!data.dateOfBirth) nextErrors.dateOfBirth = "Enter your date of birth.";
    if (!/^\S+@\S+\.\S+$/.test(data.email?.trim() || "")) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!data.address?.trim()) nextErrors.address = "Enter your address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onNext();
  };

  if (renderMode === "illustration") {
    return (
      <div className="w-full h-full relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1722648325285-058946b4487b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ocean scene with whale"
            className="h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">Step 1/3</p>
        <h2 className="text-3xl font-bold text-foreground">Sign UP</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              placeholder="Jhon"
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              placeholder="Tom"
              onChange={(e) => updateData({ lastName: e.target.value })}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            className={`w-36 ${errors.dateOfBirth ? "border-destructive" : ""}`}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive mt-1">
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            placeholder="Email..."
            onChange={(e) => updateData({ email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1 flex items-center">
              <span className="text-destructive mr-2">⚠</span>
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Sirdar Rd, Notting Hill, London W11 4EE, United Kingdom"
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        <Button onClick={handleNext} className="w-full" size="lg">
          Next Step
        </Button>
      </div>
    </div>
  );
};
