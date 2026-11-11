import { Input } from "@/components/ui/input";

import UserProfile from "../../../../../components/UserProfile";

const UsersTable = ({ users }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              users Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your users and their information
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
                  First Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .slice() // make a shallow copy so you don't mutate the original
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map((user) => {
                  const { id, first_name, last_name, email } = user;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserProfile user={user} width={10} height={10} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {first_name} {last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {email}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {users.length} trainer(s)
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
              <span className="material-symbols-outlined">add</span>
              <span>Add Trainer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
