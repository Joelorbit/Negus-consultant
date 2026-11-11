import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateScholarship } from "../../../../../hooks/useScholarships";
import { toast } from "sonner";
import { Plus, Sparkles, Building2, Globe2, Calendar, Link as LinkIcon, Upload, Loader2 } from "lucide-react";

export default function CreateScholarship() {
  const [open, setOpen] = useState(false);
  const { mutate: createScholarship, isPending } = useCreateScholarship();
  const [form, setForm] = useState({
    title: "",
    university: "",
    country: "",
    degree_level: "Master's & PhD",
    funding_type: "Fully Funded (100% Tuition + Living Stipend)",
    deadline: "",
    link: "",
    image_url: "",
    description: "",
  });

  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Scholarship Title and Description are required");
      return;
    }

    const submitPayload = (base64Image) => {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        university: form.university.trim() || undefined,
        country: form.country.trim() || undefined,
        degree_level: form.degree_level.trim() || undefined,
        funding_type: form.funding_type.trim() || undefined,
        deadline: form.deadline || undefined,
        link: form.link.trim() || undefined,
        image_url: form.image_url.trim() || undefined,
        ...(base64Image ? { image: base64Image } : {}),
      };

      createScholarship(payload, {
        onSuccess: () => {
          toast.success("Scholarship published successfully!");
          setForm({
            title: "",
            university: "",
            country: "",
            degree_level: "Master's & PhD",
            funding_type: "Fully Funded (100% Tuition + Living Stipend)",
            deadline: "",
            link: "",
            image_url: "",
            description: "",
          });
          setScreenshot(null);
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to publish scholarship. Please check all fields.");
        },
      });
    };

    if (screenshot) {
      const reader = new FileReader();
      reader.readAsDataURL(screenshot);
      reader.onloadend = () => {
        submitPayload(reader.result);
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
      };
    } else {
      submitPayload(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl font-bold text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Scholarship
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Publish New Scholarship Opportunity
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add verified scholarship opportunities for students on Negus.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Scholarship Title *
              </Label>
              <Input
                required
                placeholder="e.g. Gates Cambridge Scholarship 2027"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Host University / Org
                </Label>
                <Input
                  placeholder="e.g. Cambridge University"
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  className="rounded-xl text-xs h-10"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Country / Region
                </Label>
                <Input
                  placeholder="e.g. United Kingdom"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="rounded-xl text-xs h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Degree Level
                </Label>
                <select
                  value={form.degree_level}
                  onChange={(e) => setForm({ ...form, degree_level: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none"
                >
                  <option value="Undergraduate (Bachelor's)">Undergraduate (Bachelor's)</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Master's & PhD">Master's & PhD</option>
                  <option value="Postdoctoral Fellowship">Postdoctoral Fellowship</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Application Deadline
                </Label>
                <Input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="rounded-xl text-xs h-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Official Portal Link
              </Label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Banner Image URL (or upload below)
              </Label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Upload Custom Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                className="text-xs cursor-pointer rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Full Description & Coverage Details *
              </Label>
              <Textarea
                required
                rows={4}
                placeholder="Explain the coverage, eligibility, and perks of this scholarship..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Publishing…
                </>
              ) : (
                "Publish Scholarship"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
