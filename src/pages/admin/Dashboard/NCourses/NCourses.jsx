import React, { useState, useEffect } from "react";

import axiosInstance from "../../../../lib/axiosInstance";
import { NavLink } from "react-router";

export default function NCourses() {
  const [courses, set_courses] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await axiosInstance.get("/courses/network_courses", {
          withCredentials: true,
        });
        if (!cancelled) set_courses(response.data.courses || []);
      } catch (e) {
        console.error(e);
        if (!cancelled)
          set_error(e?.response?.data?.message || "Failed to load courses");
      } finally {
        if (!cancelled) set_loading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Courses</h1>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.id}</td>
                <td className="px-4 py-3">{c.title || c.name || "Untitled"}</td>
                <td className="px-4 py-3">
                  <NavLink
                    to={`/dashboard/courses-tree?id=${encodeURIComponent(
                      c.id
                    )}`}
                    className="inline-block px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Show tree
                  </NavLink>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
