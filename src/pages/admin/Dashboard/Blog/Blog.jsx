import React from "react";
import BlogCard from "./components/BlogCard";
import CreateBlog from "./new/CreateBlog";
import { Link } from "react-router";
import { useGetBlogs } from "../../../../hooks/useBlogs";
function Blog() {
  const { data: blogs, isLoading, isError } = useGetBlogs();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    // UPDATE users
    // SET referral_code = LEFT(md5(random()::text), 8)
    // WHERE id='45ef590f-44ca-457c-8518-8b6c3d517909';
    <div>
      <CreateBlog />
      <div>
        <div className="w-full bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2 text-gray-900">Blogs</h1>
              <p className="text-gray-600 text-lg">
                Manage and create engaging blog posts to share insights and
                updates with your audience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {blogs.length === 0 ? (
                <div className="text-center text-gray-500">No blogs found</div>
              ) : (
                blogs.map((blog) => (
                  // <Link key={blog.id} to={`${blog.id}`}>
                  <BlogCard blog={blog} key={blog.id} />
                  // </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
