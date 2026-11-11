import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FEVERITE_DESTINATIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Netherlands",
  "France",
  "Switzerland",
  "Sweden",
];

export const MessageStep = ({
  data,
  updateData,
  onNext,
  onBack,
  renderMode = "form",
}) => {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (!data.message?.trim()) {
      setErrors({ message: "Add a short note before continuing." });
      return;
    }
    setErrors({});
    onNext();
  };

  if (renderMode === "illustration") {
    return (
      <div className="w-full h-full relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Package scene"
            className="h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">Step 2/3</p>
        <h2 className="text-3xl font-bold text-foreground">Message</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Why are you applying for this mentorship?"
            className={`min-h-[120px] resize-none ${
              errors.message ? "border-destructive" : ""
            }`}
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">{errors.message}</p>
          )}
        </div>

        {/* <div>
          <RadioGroup
            value={data.messageChoice}
            onValueChange={(value) => updateData({ messageChoice: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="option1"
                id="option1"
                className="text-primary"
              />
              <Label htmlFor="option1" className="font-normal">
                The number one choice
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="option2"
                id="option2"
                className="text-primary"
              />
              <Label htmlFor="option2" className="font-normal">
                The number two choice
              </Label>
            </div>
          </RadioGroup>
          {errors.messageChoice && (
            <p className="text-sm text-destructive mt-1">
              {errors.messageChoice}
            </p>
          )}
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When do you plan to start?
          </label>
          <select
            name="timeline"
            value={data.timeline || ""}
            onChange={(event) => updateData({ timeline: event.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select timeline</option>
            <option value="immediately">Immediately</option>
            <option value="6-months">Within 6 months</option>
            <option value="1-year">Within 1 year</option>
            <option value="2-years">Within 2 years</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your scholarship goals? (Select all that apply)
          </label>
          <select
            name="supportType"
            value={data.supportType || ""}
            onChange={(event) => updateData({ supportType: event.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select your goal</option>
            <option value="undergraduate">Undergraduate Admission</option>
            <option value="masters">Master’s Admission</option>
            <option value="phd">PhD Admission</option>
            <option value="exhange">Exchange Program</option>
            <option value="internship">Internship</option>
            <option value="research">Research Grant</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            size="lg"
          >
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1" size="lg">
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};
