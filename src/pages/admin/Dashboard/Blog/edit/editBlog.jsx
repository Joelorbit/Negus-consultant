import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBlog } from "../../../../../hooks/useBlogs";
import { Edit } from "lucide-react";
import { toast } from "sonner";
const categories = ["Tips", "Guides", "News", "Updates"];

const EditBlog = ({ blog }) => {
  const [open, setOpen] = useState(false);

  const { mutate: updateBlog } = useUpdateBlog();
  const [form, setForm] = useState({
    title: blog.title,
    content: blog.content,
    category: blog.category,
  });
  const [previewSource, setPreviewSource] = useState(blog.images || []);

  const handleFileInputChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    const base64 = await Promise.all(
      newFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("File reading error");
          })
      )
    );
    setPreviewSource((prev) => [...prev, ...base64]);
  };

  const handleUpdate = async () => {
    updateBlog(
      {
        id: blog.id,
        updatedBlog: {
          title: form.title,
          content: form.content,
          category: form.category,
          images: previewSource,
        },
      },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully");
          setOpen(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Blog update failed");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation(); // prevent Link navigation
          }}
        >
          <Edit className="w-4 h-4 mr-1" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            handleUpdate();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update the title, content, category, and images of your blog post.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <Label>Upload Images</Label>
            <Input type="file" multiple onChange={handleFileInputChange} />
            <div className="flex gap-2 flex-wrap">
              {previewSource.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  className="w-10 h-10 object-cover"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-1">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label>Content</Label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label>Category</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border rounded px-2 py-1"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlog;
