import { z } from "zod";

export const packageSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters").max(30),
  price: z.number().min(5, "Minimum price is 5"),
  duration_days: z.number().min(1, "Minimum duration is 1 day"),
  features: z
    .array(
      z.object({
        name: z.string().min(1, "Feature name is required").max(30),
        included: z.boolean(),
      })
    )
    .min(1, "At least one feature is required"),
});
export const mentorSchema = z.object({
  email: z.string().email(),
  position: z.string().min(3),
  bio: z.string().min(10),
  is_active: z.boolean().optional().default(true),

  specialties: z.preprocess(
    (val) =>
      typeof val === "string" ? val.split(",").map((s) => s.trim()) : val,
    z.array(z.string().min(2)).min(1, "At least one specialty is required")
  ),

  available_days: z.preprocess(
    (val) =>
      typeof val === "string" ? val.split(",").map((d) => d.trim()) : val,
    z
      .array(
        z.enum([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ])
      )
      .min(1, "Select at least one available day")
  ),
  hourly_rate: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1)
  ),
});

export const courseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  thumbnail: z.string().url("Must be a valid URL"),
  duration: z.string().min(1, "Duration is required"),
  tags: z.string().min(1, "Enter at least one tag"),
  what_to_learn: z.string().min(1, "Enter what users will learn"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  instructor_name: z.string().min(3),
  instructor_avatar: z.string().url(),
  instructor_title: z.string().min(3),
  rating: z.union([z.string(), z.number()]).optional(),
  enrolled_students: z.union([z.string(), z.number()]).optional(),
  price: z.union([z.string(), z.number()]).optional(),
  progress: z.union([z.string(), z.number()]).optional().default("0"),
  video_url: z.string().url(),
  youtube_id: z.string().min(3),
  category_id: z.string().uuid("Invalid category ID"),
});
