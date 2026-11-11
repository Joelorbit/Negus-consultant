import React from "react";
import BlogCard from "../pages/admin/Dashboard/Blog/components/BlogCard";
import { useGetBlogs } from "../hooks/useBlogs";
import { NavLink } from "react-router";

const Blogs = () => {
  const { data: blogs } = useGetBlogs();

  return (
    <div className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-4xl font-bold text-foreground mb-6 text-center">
          Latest Blogs
        </h1>
        <p className="text-muted-foreground text-center">
          Stay updated with the latest news and articles from our blog.
        </p>
      </div>
      <div className=" mt-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs &&
          blogs?.splice(0, 3).map((blog) => (
            <NavLink to={`/blogs/${blog.id}`}>
              <BlogCard key={blog.id} blog={blog} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
