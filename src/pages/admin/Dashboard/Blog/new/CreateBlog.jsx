import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMe } from "../../../../../hooks/useAuth";
import { useCreateBlog } from "../../../../../hooks/useBlogs";

const categories = ["Tips", "Guides", "News", "Updates"];

const CreateBlog = () => {
  const { data: user } = useMe();

  const { mutate: createBlog } = useCreateBlog();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: categories[0],
  });
  const [uploading, setUploading] = useState(false);

  const [images, setImages] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);

  const handleFileInputChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);

    const newBase64 = await convertFilesToBase64(newFiles);
    setPreviewSource((prev) => [...prev, ...newBase64]);
  };

  const convertFilesToBase64 = (files) => {
    return Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("File reading error");
          })
      )
    );
  };

  const handleUpload = async () => {
    if (uploading) return;
    setUploading(true);
    try {
      const base64Images = await convertFilesToBase64(images);
      createBlog(
        {
          title: form.title,
          content: form.content,
          images: base64Images,
          author_id: user.id,
          category: form.category,
        },
        {
          onSuccess: () => {
            setForm({ title: "", content: "", category: categories[0] });
            setImages([]);
            setPreviewSource([]);
          },
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          Create Blog
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault(); // ✅ Prevent default form action
            await handleUpload();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Blog</DialogTitle>
            <DialogDescription>
              Fill in the form to add a new blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <Label className="mb-2">Upload Images</Label>
            <Input type="file" multiple onChange={handleFileInputChange} />

            <div className="flex flex-wrap justify-start items-center gap-x-2">
              {previewSource.length > 0 &&
                previewSource.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="inset-0 w-10 h-10 object-cover z-0"
                  />
                ))}
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="content">Content</Label>
            <Textarea
              type="text"
              name="content"
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            {/* {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )} */}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="category">Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border border-border rounded px-3 py-2 bg-background text-foreground"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={uploading || !form.title || !form.content}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlog;
