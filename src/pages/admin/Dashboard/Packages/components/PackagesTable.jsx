import { Input } from "@/components/ui/input";
import Badge from "../../../../../components/Badge";
const PackagesTable = ({ packages, onDelete }) => {
  return (
    <>
      <div id="webcrumbs">
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Packages Management
                  </h2>
                  <p className="text-gray-600 mt-1">Manage your packages</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 text-xl">
                      search
                    </span>
                    <Input
                      type="text"
                      placeholder="Search Employee..."
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
                          <span className="text-sm text-gray-700">
                            Active Only
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">
                            Inactive Only
                          </span>
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                      features
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                      Duration (Days)
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
                      Features
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {packages.map((pkg) => {
                    const { id, name, features, duration_days } = pkg;
                    return (
                      <tr
                        key={id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 text-gray-700">{name}</td>
                        <td className="py-4 px-6">
                          {(Array.isArray(features) ? features : []).map((feature, index) => {
                            const name =
                              typeof feature === "string" ? feature : feature?.name;
                            if (!name?.trim()) return null;

                            return (
                              <Badge
                                key={index}
                                item={name.trim()}
                                strike={
                                  typeof feature === "object" &&
                                  feature.included === false
                                }
                              />
                            );
                          })}
                        </td>

                        <td className="py-4 px-6 text-gray-700">
                          {duration_days}
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            {/* <EditEmployeeDialog
                              employeeId={employee.id}
                              onUpdate={onRefresh} // Optional: refresh employees after update
                            /> */}
                            <button
                              onClick={() => onDelete(id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
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

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">12</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="px-3 py-2 text-sm text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    2
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    3
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagesTable;
