import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mentorSchema } from "../../../../../validate/schema";
import {
  useUpdateMentor,
  useGetMentorById,
} from "../../../../../hooks/useMentor";

const EditMentor = ({ mentorId, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: mentor, isLoading, isError } = useGetMentorById(mentorId);
  const { mutate: updateMentor, isPending } = useUpdateMentor(mentorId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(mentorSchema) });

  // Pre-fill form when dialog opens
  useEffect(() => {
    if (mentor?.data && isOpen) {
      reset({
        email: mentor.data.email || "",
        bio: mentor.data.bio || "",
        specialties: mentor.data.specialties?.join(", ") || "",
        available_days: mentor.data.available_days?.join(", ") || "",
        position: mentor.data.position || "",
        hourly_rate: mentor.data.hourly_rate || "",
      });
    }
  }, [mentor, isOpen, reset]);

  const onSubmit = (formData) => {
    updateMentor(
      { mentorId, ...formData },
      {
        onSuccess: () => {
          toast.success("Mentor updated successfully");
          setIsOpen(false);
          onUpdate?.(); // Notify parent to refetch
        },
        onError: (err) => {
          toast.error("Failed to update mentor");
          console.error(err);
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading mentor</p>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <span className="material-symbols-outlined text-sm mr-2">edit</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Mentor</DialogTitle>
            <DialogDescription>Update mentor details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-1">
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label>Specialties</Label>
            <Input type="text" {...register("specialties")} />
            {errors.specialties && (
              <p className="text-red-500 text-sm">
                {errors.specialties.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label>Available Days</Label>
            <Input type="text" {...register("available_days")} />
            {errors.available_days && (
              <p className="text-red-500 text-sm">
                {errors.available_days.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label>Position</Label>
            <Input type="text" {...register("position")} />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label>Bio</Label>
            <Input type="text" {...register("bio")} />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label>Hourly Rate</Label>
            <Input type="text" {...register("hourly_rate")} />
            {errors.hourly_rate && (
              <p className="text-red-500 text-sm">
                {errors.hourly_rate.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMentor;
