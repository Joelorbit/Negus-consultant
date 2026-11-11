import React, { useState, useMemo, useCallback } from "react";
import PaymentsTable from "./components/PaymentsTable";
import NoData from "../../../../components/NoData";
import {
  useDeleteSubscription,
  useSubscription,
  useReferrals,
  usePayReferral,
  useReferralsTree,
} from "../../../../hooks/useSubscriptions";
import { Button } from "../../../../components/ui/button";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("payments"); // "payments" or "referrals"
  const {
    data: paymentsData,
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useSubscription();
  const {
    data: referralData,
    isLoading: isReferralLoading,
    isError: isReferralError,
  } = useReferrals();
  const {
    data: treeData,
    isLoading: isTreeLoading,
    isError: isTreeError,
  } = useReferralsTree();
  // Memoize lists to avoid unnecessary re-renders and small performance boost
  const paymentsList = useMemo(() => paymentsData?.data ?? [], [paymentsData]);
  const referralsList = useMemo(() => referralData ?? [], [referralData]);
  const referralsTree = useMemo(() => treeData ?? [], [treeData]);

  const { mutate: deletePayment } = useDeleteSubscription();
  const { mutate: payReferral } = usePayReferral();

  // Keep handlers the same functionally but memoize to avoid re-creation on each render
  const onDelete = useCallback(
    (id) => {
      if (confirm("Are you sure you want to delete this payment?")) {
        deletePayment(id, {
          onSuccess: () => alert("Payment deleted successfully"),
        });
      }
    },
    [deletePayment]
  );

  const handlePayReferral = useCallback(
    (userId) => {
      if (confirm("Are you sure you want to pay this referral?")) {
        payReferral(userId, {
          onSuccess: () => alert("Referral paid successfully"),
        });
      }
    },
    [payReferral]
  );

  return (
    <div className="space-y-6">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Payments & Referrals</h2>
          <p className="text-sm text-gray-500">
            Manage subscriptions and referral payouts
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-md shadow-sm">
          <Button
            variant={activeTab === "payments" ? "default" : "outline"}
            onClick={() => setActiveTab("payments")}
            className="px-4 py-1"
            aria-pressed={activeTab === "payments"}
          >
            Payments
          </Button>

          <Button
            variant={activeTab === "referrals" ? "default" : "outline"}
            onClick={() => setActiveTab("referrals")}
            className="px-4 py-1"
            aria-pressed={activeTab === "referrals"}
          >
            Referrals
          </Button>

          <Button
            variant={activeTab === "tree" ? "default" : "outline"}
            onClick={() => setActiveTab("tree")}
            className="px-4 py-1"
            aria-pressed={activeTab === "tree"}
          >
            Referral Tree
          </Button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "payments" ? (
          isPaymentsLoading ? (
            <div className="text-sm text-gray-600">Loading payments...</div>
          ) : isPaymentsError ? (
            <div className="text-sm text-red-600">Failed to load payments.</div>
          ) : paymentsList.length > 0 ? (
            <div className="bg-white rounded shadow overflow-hidden">
              <PaymentsTable subscriptions={paymentsList} onDelete={onDelete} />
            </div>
          ) : (
            <NoData dataName="Payment" />
          )
        ) : activeTab === "referrals" ? (
          isReferralLoading ? (
            <div className="text-sm text-gray-600">Loading referrals...</div>
          ) : isReferralError ? (
            <div className="text-sm text-red-600">
              Failed to load referrals.
            </div>
          ) : referralsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {referralsList.map((user) => {
                const initials = `${user.first_name?.[0] ?? ""}${
                  user.last_name?.[0] ?? ""
                }`.toUpperCase();
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                        {initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {user.first_name} {user.last_name}
                          </p>
                          {user.credit > 0 && (
                            <span
                              title="Has credit"
                              className="flex items-center text-green-600"
                            >
                              {/* green verify tick */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Credit:{" "}
                          <span className="font-medium">{user.credit}</span>{" "}
                          birr
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handlePayReferral(user.id)}
                        disabled={user.credit <= 0}
                        className="px-3"
                        variant="default"
                      >
                        Pay
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoData dataName="Referral" />
          )
        ) : (
          <div></div>
        )}

        {activeTab === "tree" && (
          <div className="space-y-4">
            {isTreeLoading ? (
              <div className="text-sm text-gray-600">
                Loading referral tree...
              </div>
            ) : isTreeError ? (
              <div className="text-sm text-red-600">
                Failed to load referral tree.
              </div>
            ) : referralsTree.length === 0 ? (
              <NoData dataName="Referral Tree" />
            ) : (
              <div className="space-y-4">
                {referralsTree.map((parent) => (
                  <div key={parent.id} className="bg-white p-4 rounded shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                          {parent.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-bold">{parent.name}</p>
                          <p className="text-sm text-gray-500">
                            Credit:{" "}
                            <span className="font-medium">{parent.credit}</span>{" "}
                            birr
                          </p>
                        </div>
                      </div>
                      {parent.credit > 0 && (
                        <div className="text-green-600 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">Has credit</span>
                        </div>
                      )}
                    </div>

                    {/* Children list with simple connectors */}
                    <div className="mt-4">
                      {parent.referrals && parent.referrals.length > 0 ? (
                        <div className="flex items-start gap-6">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-0.5 bg-gray-200 h-full"
                              style={{ minHeight: 20 }}
                            />
                          </div>
                          <div className="flex gap-4 flex-wrap">
                            {parent.referrals.map((child) => (
                              <div
                                key={child.id}
                                className="flex flex-col items-center bg-slate-50 p-3 rounded shadow-sm"
                              >
                                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-medium">
                                  {child.name
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </div>
                                <p className="text-sm mt-2 font-medium">
                                  {child.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">
                          No referrals yet
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Payments);
