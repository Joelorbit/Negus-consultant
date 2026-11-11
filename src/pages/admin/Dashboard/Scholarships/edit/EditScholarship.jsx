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
import { useUpdateScholarship } from "../../../../../hooks/useScholarships";
import { Edit2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditScholarship({ scholarship }) {
  const [open, setOpen] = useState(false);
  const { mutate: updateScholarship, isPending } = useUpdateScholarship();

  const [form, setForm] = useState({
    title: scholarship?.title || "",
    university: scholarship?.university || "",
    country: scholarship?.country || "",
    degree_level: scholarship?.degree_level || "Master's & PhD",
    funding_type: scholarship?.funding_type || "Fully Funded",
    description: scholarship?.description || "",
    image_url: scholarship?.image_url || "",
    link: scholarship?.link || "",
    deadline: scholarship?.deadline ? scholarship.deadline.split("T")[0] : "",
  });

  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    const submitPayload = (base64Image) => {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        university: form.university.trim() || undefined,
        country: form.country.trim() || undefined,
        degree_level: form.degree_level || undefined,
        funding_type: form.funding_type || undefined,
        link: form.link.trim() || undefined,
        deadline: form.deadline || undefined,
        image_url: form.image_url.trim() || undefined,
        ...(base64Image ? { image: base64Image } : {}),
      };

      updateScholarship(
        { id: scholarship.id, payload },
        {
          onSuccess: () => {
            toast.success("Scholarship updated successfully");
            setOpen(false);
          },
          onError: () => {
            toast.error("Failed to update scholarship");
          },
        }
      );
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
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Edit Scholarship Details
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Modify requirements, deadlines, or links for this award.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Scholarship Title *
              </Label>
              <Input
                required
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
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Image URL
              </Label>
              <Input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Replace Custom Image
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
                Description & Coverage *
              </Label>
              <Textarea
                required
                rows={4}
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
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
