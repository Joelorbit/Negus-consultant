import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatDate } from "date-fns";
import { Button } from "../../../../../components/ui/button";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

import DataExportModal from "./DataExportModal";

const ApplicationPackagesTable = ({ packages }) => {
  const [openId, setOpenId] = useState(null);
  const [modalDoc, setModalDoc] = useState(null); // null | 'transcript' | 'matric' | 'screenshot'
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleRow = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Filter applications based on search and status
  const filteredApplications = packages.filter((app) => {
    const matchesSearch =
      app.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm) ||
      app.package_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle bulk selection
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (id, checked) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, id]);
    } else {
      setSelectedApplications(
        selectedApplications.filter((appId) => appId !== id)
      );
    }
  };

  // Export functions
  const exportToCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Phone",
      "Telegram",
      "DOB",
      "Referral",
      "Package Name",
      "Academic Status",
      "School",
      "GPA",
      "Class Rank",
      "Exam Score",
      "Tests",
      "Scores",
      "Top Universities",
      "Family Contribution",
      "Status",
      "Created Date",
    ];

    const csvData = filteredApplications.map((app) => [
      app.first_name || "",
      app.last_name || "",
      app.phone || "",
      app.telegram || "",
      app.dob ? formatDate(new Date(app.dob), "yyyy-MM-dd") : "",
      app.referral || "",
      app.package_name || "",
      app.academic_status || "",
      app.school || "",
      app.gpa || "",
      app.class_rank || "",
      app.exam_score || "",
      app.tests || "",
      app.scores || "",
      app.top_universities || "",
      app.family_contribution || "",
      app.status || "Pending",
      app.created_at ? formatDate(new Date(app.created_at), "yyyy-MM-dd") : "",
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `applications_${formatDate(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSelectedToCSV = () => {
    if (selectedApplications.length === 0) return;

    const selectedApps = packages.filter((app) =>
      selectedApplications.includes(app.id)
    );
    const headers = [
      "First Name",
      "Last Name",
      "Phone",
      "Telegram",
      "DOB",
      "Referral",
      "Package Name",
      "Academic Status",
      "School",
      "GPA",
      "Class Rank",
      "Exam Score",
      "Tests",
      "Scores",
      "Top Universities",
      "Family Contribution",
      "Status",
      "Created Date",
    ];

    const csvData = selectedApps.map((app) => [
      app.first_name || "",
      app.last_name || "",
      app.phone || "",
      app.telegram || "",
      app.dob ? formatDate(new Date(app.dob), "yyyy-MM-dd") : "",
      app.referral || "",
      app.package_name || "",
      app.academic_status || "",
      app.school || "",
      app.gpa || "",
      app.class_rank || "",
      app.exam_score || "",
      app.tests || "",
      app.scores || "",
      app.top_universities || "",
      app.family_contribution || "",
      app.status || "Pending",
      app.created_at ? formatDate(new Date(app.created_at), "yyyy-MM-dd") : "",
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `selected_applications_${formatDate(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportIndividualPDF = (application) => {
    // This would typically integrate with a PDF generation library
    // For now, we'll create a formatted text version
    const content = `
APPLICATION DETAILS
==================

PERSONAL INFORMATION:
First Name: ${application.first_name || "N/A"}
Last Name: ${application.last_name || "N/A"}
Phone: ${application.phone || "N/A"}
Telegram: ${application.telegram || "N/A"}
Date of Birth: ${
      application.dob
        ? formatDate(new Date(application.dob), "MMMM dd, yyyy")
        : "N/A"
    }
Referral: ${
      application.referral === "EthioNew1212"
        ? `${application.referral} (additional 5% after the 50% package offer)`
        : application.referral || "N/A"
    }

ACADEMIC INFORMATION:
Package: ${application.package_name || "N/A"}
Amount due: ${application.amount_due == null ? "N/A" : `ETB ${Number(application.amount_due).toFixed(2)}`}
Academic Status: ${application.academic_status || "N/A"}
School: ${application.school || "N/A"}
GPA: ${application.gpa || "N/A"}
Class Rank: ${application.class_rank || "N/A"}

TEST SCORES:
Exam Score: ${application.exam_score || "N/A"}
Tests: ${application.tests || "N/A"}
Scores: ${application.scores || "N/A"}

ADDITIONAL INFORMATION:
Top Universities: ${application.top_universities || "N/A"}
Family Contribution: ${application.family_contribution || "N/A"}
Status: ${application.status || "Pending"}

Generated on: ${formatDate(new Date(), "MMMM dd, yyyy HH:mm")}
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${application.first_name}_${application.last_name}_application.txt`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow rounded-lg mb-6 border border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-gray-900">
            Applications Overview
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 transform hover:scale-105 transition-all duration-200">
              <div className="bg-primary/10 rounded-full p-3">
                <span className="material-symbols-outlined text-primary">
                  inbox
                </span>
              </div>
              <div>
                <p className="text-gray-900 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-black">
                  {packages.length}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 transform hover:scale-105 transition-all duration-200">
              <div className="bg-green-50 rounded-full p-3">
                <span className="material-symbols-outlined text-green-600">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-gray-900 text-sm">Approved</p>
                <p className="text-2xl font-bold text-black">
                  {packages.filter((app) => app.status === "approved").length}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 transform hover:scale-105 transition-all duration-200">
              <div className="bg-amber-50 rounded-full p-3">
                <span className="material-symbols-outlined text-amber-600">
                  pending
                </span>
              </div>
              <div>
                <p className="text-gray-900 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-black">
                  {packages.filter((app) => app.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 bg-white shadow rounded-lg p-4 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Applications
            </label>
            <Input
              placeholder="Search by name, phone, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => setShowExportModal(true)}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Options
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Application Details ({filteredApplications.length} results)
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export All CSV
          </Button>
          {selectedApplications.length > 0 && (
            <Button
              onClick={exportSelectedToCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export Selected ({selectedApplications.length})
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedApplications.length ===
                        filteredApplications.length &&
                      filteredApplications.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Applicant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Package
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Academic Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  GPA
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {filteredApplications.map((pkg, index) => {
                return (
                  <>
                    <tr
                      key={pkg.id || index}
                      className="transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(pkg.id)}
                          onChange={(e) =>
                            handleSelectApplication(pkg.id, e.target.checked)
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {pkg.profile_image && (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={pkg.profile_image}
                              alt="Profile"
                            />
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {`${pkg.first_name} ${pkg.last_name}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {pkg.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium">{pkg.package_name}</div>
                        {pkg.amount_due != null && (
                          <div className="mt-1 text-xs text-gray-500">
                            Due: ETB {Number(pkg.amount_due).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.academic_status || "Junior"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.gpa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pkg.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : pkg.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {pkg.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => exportIndividualPDF(pkg)}
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            Export
                          </Button>
                          <button
                            onClick={() => toggleRow(pkg.id)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                          >
                            <span className="material-symbols-outlined text-gray-600">
                              {openId === pkg.id ? "expand_less" : "more_vert"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {openId === pkg.id && (
                      <tr className="bg-gray-100">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="mt-4 text-sm text-gray-800 space-y-4 animate-fadeIn">
                            {/* Grid Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  Contact Information
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Phone:
                                  </strong>{" "}
                                  +{pkg.phone}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Telegram:
                                  </strong>{" "}
                                  @{pkg.telegram}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    DOB:
                                  </strong>{" "}
                                  {pkg.dob
                                    ? formatDate(
                                        new Date(pkg.dob),
                                        "MMMM dd, yyyy"
                                      )
                                    : "N/A"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Referral:
                                  </strong>{" "}
                                  {pkg.referral === "EthioNew1212"
                                    ? `${pkg.referral} discount % 5% + 10%`
                                    : pkg.referral}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Academic Information
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Academic Status:
                                  </strong>{" "}
                                  {pkg.academic_status}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    School:
                                  </strong>{" "}
                                  {pkg.school}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    GPA:
                                  </strong>{" "}
                                  {pkg.gpa}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Class Rank:
                                  </strong>{" "}
                                  {pkg.class_rank}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Test Scores
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Exam Score:
                                  </strong>{" "}
                                  {pkg.exam_score}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Tests:
                                  </strong>{" "}
                                  {pkg.tests}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong className="text-gray-800">
                                    Scores:
                                  </strong>{" "}
                                  {pkg.scores}
                                </p>
                              </div>
                            </div>

                            {/* Documents */}
                            <div>
                              <p className="font-medium mb-2 text-gray-900">
                                Documents
                              </p>
                              <div className="flex gap-3 flex-wrap">
                                <a
                                  onClick={() => setModalDoc("transcript")}
                                  className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                                >
                                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-600">
                                      description
                                    </span>
                                  </div>
                                  <span>Transcript</span>
                                </a>
                                <a
                                  onClick={() => setModalDoc("matric")}
                                  className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                                >
                                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600">
                                      school
                                    </span>
                                  </div>
                                  <span>Matric Certificate</span>
                                </a>
                                <a
                                  onClick={() => setModalDoc("screenshot")}
                                  className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                                >
                                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-purple-600">
                                      image
                                    </span>
                                  </div>
                                  <span>Screenshot</span>
                                </a>
                              </div>
                              {modalDoc && (
                                <div
                                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                                  onClick={() => setModalDoc(null)}
                                >
                                  <div className="relative max-w-5xl w-full">
                                    <img
                                      src={
                                        modalDoc === "transcript"
                                          ? pkg.transcript
                                          : modalDoc === "matric"
                                          ? pkg.matric_certificate
                                          : modalDoc === "screenshot"
                                          ? pkg.screenshot_string
                                          : ""
                                      }
                                      alt={modalDoc}
                                      className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                    <Button
                                      onClick={() => setModalDoc(null)}
                                      className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2"
                                    >
                                      ✕
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Additional Info */}
                            <div>
                              <p className="font-medium mb-2 text-gray-900">
                                Additional Information
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong className="text-gray-800">
                                  Top Universities:
                                </strong>{" "}
                                {pkg.top_universities}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong className="text-gray-800">
                                  Family Contribution:
                                </strong>{" "}
                                {pkg.family_contribution}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                of <span className="font-medium">{packages.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-foreground hover:bg-primary-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ">
                  8
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ">
                  9
                </button>
                <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <DataExportModal
          onClose={() => setShowExportModal(false)}
          onExportCSV={exportToCSV}
          onExportSelected={exportSelectedToCSV}
          selectedCount={selectedApplications.length}
          totalCount={filteredApplications.length}
        />
      )}
    </div>
  );
};

export default ApplicationPackagesTable;
