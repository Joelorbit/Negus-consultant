import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useCreatePackage } from "../../../../../hooks/usePackages";
import { Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { packageSchema } from "../../../../../validate/schema";
import { toast } from "sonner";

const CreatePackages = () => {
  const {
    mutate: createPackage,
    isPending,
  } = useCreatePackage();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      price: 0,
      duration_days: 0,
      features: [],
    },
  });
  const [features, setFeatures] = useState([{ name: "", included: false }]);

  const addFeature = () => {
    setFeatures([...features, { name: "", included: false }]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeatureName = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index].name = value;
    setFeatures(newFeatures);
  };

  const toggleFeatureIncluded = (index) => {
    const newFeatures = [...features];
    newFeatures[index].included = !newFeatures[index].included;
    setFeatures(newFeatures);
  };
  useEffect(() => {
    setValue(
      "features",
      features.filter((f) => f.name.trim() !== "")
    );
  }, [features, setValue]);

  const onSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      features: features.filter((f) => f.name.trim() !== ""),
    };

    createPackage(formattedData, {
      onSuccess: () => {
        toast.success("Package created successfully");
        reset();
        setFeatures([{ name: "", included: false }]);
        setOpen(false);
      },
      onError: () => {
        toast.error("Error when creating package");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          Create Package
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Packages</DialogTitle>
            <DialogDescription>
              Fill in the form to add a new package.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-1">
            <Label htmlFor="last_name">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", {
                valueAsNumber: true,
                required: "Price is required",
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="features">Features</Label>
            <div></div>
            {features.map((feature, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="w-full flex justify-items-start items-center gap-x-4">
                  <Input
                    type="text"
                    placeholder="Feature name"
                    value={feature.name}
                    onChange={(e) => updateFeatureName(index, e.target.value)}
                  />
                  <label>Included</label>
                  <Input
                    type="checkbox"
                    checked={feature.included}
                    onChange={() => toggleFeatureIncluded(index)}
                    className="w-6"
                  />
                </div>
                <Button
                  variant="dangerus"
                  type="button"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 color="red" />
                </Button>
              </div>
            ))}

            <Button type="button" onClick={addFeature} variant="outline">
              Add Feature
            </Button>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="duration_days">Duration (Days)</Label>
            <Input
              type="number"
              placeholder="Duration (Days)"
              {...register("duration_days", {
                valueAsNumber: true,
                required: "Duration is required",
              })}
            />
            {errors.duration_days && (
              <p className="text-red-500 text-sm">
                {errors.duration_days.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              {isPending ? "Creating..." : "Create Package"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackages;
