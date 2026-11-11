import { Input } from "@/components/ui/input";
// import EditMentor from "../edit/EditMentor";
// import UserProfile from "../../../../../components/UserProfile";

const CoursesTable = ({ courses, onDelete }) => {
  const getThumbnail = (video) => {
    if (video.youtube_id) {
      return `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
    }
    return video.thumbnail;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
            <p className="text-gray-600 mt-1">
              Manage your course content and availability
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 text-xl">
                search
              </span>
              <Input
                type="text"
                placeholder="Search Mentor..."
                className="pl-10 pr-4 py-2"
              />
            </div>
            <details className="relative">
              <summary className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                <span className="material-symbols-outlined text-lg">
                  filter_alt
                </span>
                Filter
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Active Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Inactive Only</span>
                  </label>
                  <hr className="my-2" />
                  <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                    Clear Filters
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Video
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Categories
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => {
                return (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={getThumbnail(course)}
                          alt={course.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.instructor_name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.level}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(course.tags || []).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {course.duration}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.category_name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* <button className="text-blue-600 hover:underline">
                          Edit
                        </button> */}
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => onDelete(course.id)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {mentors.length} trainer(s)
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
              <span className="material-symbols-outlined">add</span>
              <span>Add Trainer</span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CoursesTable;
