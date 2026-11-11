import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

const DataExportModal = ({
  onClose,
  onExportCSV,
  onExportSelected,
  selectedCount,
  totalCount,
}) => {
  const [exportScope, setExportScope] = useState("all");
  const [includeDocuments, setIncludeDocuments] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      if (exportScope === "selected" && selectedCount === 0) {
        alert("Please select at least one application to export.");
        return;
      }

      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (exportScope === "selected") {
        onExportSelected();
      } else {
        onExportCSV();
      }

      onClose();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getExportButtonText = () => {
    if (isExporting) return "Exporting...";

    const scopeText =
      exportScope === "selected" ? `Selected (${selectedCount})` : "All";
    return `Export ${scopeText} as CSV`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Applications
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Scope */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Export Scope
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="exportScope"
                  value="all"
                  checked={exportScope === "all"}
                  onChange={(e) => setExportScope(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    All Applications
                  </span>
                  <p className="text-xs text-gray-500">
                    Export all {totalCount} applications
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="exportScope"
                  value="selected"
                  checked={exportScope === "selected"}
                  onChange={(e) => setExportScope(e.target.value)}
                  className="text-primary focus:ring-primary"
                  disabled={selectedCount === 0}
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    Selected Applications
                  </span>
                  <p className="text-xs text-gray-500">
                    {selectedCount === 0
                      ? "No applications selected"
                      : `Export ${selectedCount} selected applications`}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Export Format */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Export Format
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="exportFormat"
                  value="csv"
                  checked
                  readOnly
                  className="text-primary focus:ring-primary mb-2"
                />
                <FileSpreadsheet className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">CSV</span>
                <span className="text-xs text-gray-500">Excel compatible</span>
              </label>

            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Additional Options
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDocuments}
                onChange={(e) => setIncludeDocuments(e.target.checked)}
                className="text-primary focus:ring-primary rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Include Document Links
                </span>
                <p className="text-xs text-gray-500">
                  Add URLs to transcripts, certificates, and screenshots
                </p>
              </div>
            </label>
          </div>

          {/* Export Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Export Preview:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Personal information (name, contact, DOB)</li>
                  <li>• Academic details (GPA, school, status)</li>
                  <li>• Test scores and achievements</li>
                  <li>• Application status and dates</li>
                  {includeDocuments && <li>• Document links and references</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {exportScope === "selected" && selectedCount === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">No applications selected</p>
                  <p>
                    Please select at least one application to export, or choose
                    "All Applications".
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">CSV export</p>
                <p>CSV files open in Excel and Google Sheets.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={
              isExporting || (exportScope === "selected" && selectedCount === 0)
            }
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isExporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Exporting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {getExportButtonText()}
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataExportModal;
