import { useState } from "react";
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
import { useCreateMentor } from "../../../../../hooks/useMentor";

const CreateMentor = () => {
  const { mutate: CreateMentor } = useCreateMentor();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(mentorSchema) });

  const onSubmit = (data) => {
    CreateMentor(data, {
      onSuccess: () => {
        toast.success("Mentor created successfully");
        reset();
        setIsOpen(false);
      },
      onError: (err) => {
        toast.error("Error when creating mentor");
        console.error(err.response?.data || err.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>Add
          Mentor
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create Mentor</DialogTitle>
            <DialogDescription>
              Fill in the form to create a new mentor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <Label htmlFor="last_name">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="last_name">Specialties</Label>
            <Input
              name="specialties"
              type="text"
              placeholder="Specialties"
              {...register("specialties")}
            />
            {errors.specialties && (
              <p className="text-red-500 text-sm">
                {errors.specialties.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="last_name">Available days</Label>
            <Input
              name="available_days"
              type="text"
              placeholder="Available days"
              {...register("available_days")}
            />
            {errors.available_days && (
              <p className="text-red-500 text-sm">
                {errors.available_days.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="position">Position</Label>
            <Input
              name="position"
              type="text"
              placeholder="Position"
              {...register("position")}
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="bio">Bio</Label>
            <Input
              name="bio"
              type="text"
              placeholder="Short bio"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="last_name">Hourly Rate</Label>
            <Input
              name="hourly_rate"
              type="text"
              placeholder="Hourly Rate"
              {...register("hourly_rate")}
              className="w-full mb-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMentor;
