import { useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  useCategories,
  useCreateCourse,
} from "../../../../../hooks/useCourses";

const CreateCourse = () => {
  const { mutate: createCourse, isPending } = useCreateCourse();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categories = [] } = useCategories();

  const onSubmit = (data) => {
    const tagsArr = data.tags.split(",").map((tag) => tag.trim());

    const learnArr = data.what_to_learn.split(",").map((item) => item.trim());

    data.tags = tagsArr;
    data.what_to_learn = learnArr;
    if (data.category_id === "") {
      data.category_id = null;
    }


    createCourse(data, {
      onSuccess: () => {
        toast.success("Course created successfully");
        reset();
        setIsOpen(false);
      },
      onError: (err) => {
        toast.error("Error when creating course");
        console.error(err.response?.data || err.message);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>
              Fill in the form to create a new course.
            </DialogDescription>
          </DialogHeader>

          {[
            // all inputs except category_id
            ["title", "Course title"],
            ["description", "Course description"],
            ["duration", "e.g., 5h 30min"],
            ["price", "e.g., 39.99", "number"],
            ["youtube_id", "e.g., WGJJIrtnfpk"],
            ["instructor_name", "e.g., Dr. Alex Kumar"],
            ["instructor_title", "e.g., Data Scientist"],
            ["instructor_avatar", "Instructor avatar URL"],
            ["thumbnail", "Course thumbnail URL"],
            ["video_url", "YouTube video URL"],
            ["tags", "Comma-separated tags"],
            ["what_to_learn", "Comma-separated learn points"],
            ["level", "Beginner / Intermediate / Advanced"],
            ["rating", "e.g., 4.90", "number"],
            ["enrolled_students", "e.g., 15000", "number"],
          ].map(([name, placeholder, type]) => (
            <div key={name} className="grid gap-1">
              <Label htmlFor={name}>{name.replace(/_/g, " ")}</Label>
              <Input
                {...register(name)}
                placeholder={placeholder}
                type={type || "text"}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>
          ))}

          {/* Dropdown for category_id */}
          <div className="grid gap-1">
            <Label htmlFor="category_id">Category</Label>
            <select
              {...register("category_id")}
              id="category_id"
              className="border rounded px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourse;
