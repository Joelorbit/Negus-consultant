import { Delete, Edit, Trash } from "lucide-react";
import EditBlog from "../edit/editBlog";
import { useMe } from "../../../../../hooks/useAuth";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "../../../../../components/ui/button";
import { useDeleteBlog } from "../../../../../hooks/useBlogs";
import { toast } from "sonner";

const BlogCard = ({ blog }) => {
  const { data: user } = useMe();
  const { mutate: deleteBlog } = useDeleteBlog();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id, {
        onSuccess: () => {
          toast.success("Blog deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete the blog");
        },
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group backdrop-blur-sm bg-opacity-80">
      <div className="relative overflow-hidden">
        <img
          src={blog.images[0]}
          alt="Blog thumbnail"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={blog?.profile_image || "https://via.placeholder.com/150"}
            alt="Author avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-sm text-foreground">
              {blog?.first_name + " " + blog?.last_name}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(blog?.created_at), "EE dd yyyy")}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary-600 transition-colors line-clamp-1">
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {blog.content}
        </p>

        <div className="flex items-center justify-between">
          {(user?.role === "admin" || user?.role === "semiadmin") && (
            <EditBlog blog={blog} />
          )}

          {(user?.role === "admin" || user?.role === "semiadmin") && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(blog.id)}
            >
              <Trash />
            </Button>
          )}

          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {blog.category}
          </span>

          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(blog?.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
