import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useActivateSubscription } from "../../../../../hooks/useSubscriptions";
import { Badge } from "../../../../../components/ui/badge";
const PaymentsTable = ({ subscriptions, onDelete, onRefresh }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { mutate, isPending } = useActivateSubscription();
  const [verifyingId, setVerifyingId] = useState(null);

  const handleVerify = (id) => {
    setVerifyingId(id);
    mutate(id, {
      onSuccess: () => {
        setVerifyingId(null);
        onRefresh?.();
      },
      onError: () => {
        setVerifyingId(null);
      },
    });
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Subscriptions</h2>
            <p className="text-gray-600 mt-1">Manage all user subscriptions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                search
              </span>
              <Input
                type="text"
                placeholder="Search subscriptions..."
                className="pl-10 pr-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  User
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Package
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Phone number
                </th>
                {/* <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Start Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  End Date
                </th> */}
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Screenshot
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Verified
                </th>

                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 text-gray-700">
                    {sub.first_name} {sub.last_name}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {sub.package_name}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{sub.price} birr</td>
                  <td className="py-4 px-6 text-gray-700">
                    {sub.phone_number}
                  </td>
                  {/* <td className="py-4 px-6 text-gray-700">
                    {format(new Date(sub.start_date), "yyyy-MM-dd")}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {format(new Date(sub.end_date), "yyyy-MM-dd")}
                  </td> */}
                  <td className="py-4 px-6">
                    {sub.screenshot_url && (
                      <img
                        src={sub.screenshot_url}
                        className="w-20 cursor-pointer hover:opacity-75 transition"
                        onClick={() => setSelectedImage(sub.screenshot_url)}
                      />
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Badge type={sub.is_active ? "success" : "danger"}>
                      {sub.is_active ? "Verified" : "Not Verified"}
                    </Badge>
                  </td>

                  <td className="py-4 px-6 flex gap-2">
                    {!sub.is_verified && (
                      <button
                        onClick={() => handleVerify(sub.id)}
                        disabled={isPending && verifyingId === sub.id}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        {isPending && verifyingId === sub.id
                          ? "Verifying..."
                          : "Verify"}
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(sub.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-black"
              >
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Enlarged Screenshot"
                className="max-h-[80vh] w-auto rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsTable;
