import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

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

export function WhereStep({
  data,
  updateData,
  onBack,
  renderMode = "form",
  onFinish,
  isSubmitting = false,
}) {
  const [selected, setSelected] = useState(data?.selectedCountry || []);
  const toggleCountry = (country) => {
    if (selected.includes(country)) {
      setSelected(selected.filter((c) => c !== country));
    } else if (selected.length < 3) {
      setSelected([...selected, country]);
    }
  };

  useEffect(() => {
    updateData({ selectedCountry: selected });
  }, [selected, updateData]);

  if (renderMode === "illustration") {
    return (
      <div className="w-full h-full relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1676278746049-581cb2b40ee1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        <p className="text-sm text-muted-foreground mb-2">Step 3/3</p>
        <h2 className="text-3xl font-bold text-foreground">
          Scholarship Preferences
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="block mb-2">Select up to 3 destinations</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEVERITE_DESTINATIONS.map((country) => (
              <Badge
                key={country}
                onClick={() => toggleCountry(country)}
                variant={selected.includes(country) ? "" : "secondary"}
                className="cursor-pointer min-h-[44px] py-3 px-4 w-full justify-center text-center text-[13.5px]"
              >
                {country}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="block mb-2">How did you hear about us?</Label>
          <select
            name="referredBy"
            value={data?.referredBy || ""}
            onChange={(event) => updateData({ referredBy: event.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            <option value="friend">Friend/Family</option>
            <option value="social-media">Social Media</option>
            <option value="google">Google Search</option>
            <option value="school">School/University</option>
            <option value="mentor">Mentor/Teacher</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label className="block mb-2">What are you looking for?</Label>
          <select
            name="supportType"
            value={data?.supportType || ""}
            onChange={(event) => updateData({ supportType: event.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a goal</option>
            <option value="undergraduate">Undergraduate degree</option>
            <option value="exchange">Short-term exchange</option>
            <option value="research">Research opportunities</option>
            <option value="mentorship">Mentorship support</option>
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
          <Button
            onClick={onFinish}
            className="flex-1"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
