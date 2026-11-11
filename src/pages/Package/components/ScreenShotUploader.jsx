import { useState, useEffect, useRef } from "react";
import { UploadCloud, X, CheckCircle2 } from "lucide-react";

const ScreenshotUploader = ({ screenshot, setScreenshot }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setScreenshot(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (screenshot) {
      const url = URL.createObjectURL(screenshot);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [screenshot]);

  return (
    <div
      className={`
        border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all duration-200
        ${
          isDragging
            ? "border-[var(--green)] bg-[var(--green-subtle)]"
            : screenshot
            ? "border-[var(--green)] bg-[var(--white)]"
            : "border-[var(--line-strong)] bg-[var(--paper)] hover:border-[var(--green)] hover:bg-[var(--green-subtle)]"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {screenshot ? (
        <div className="space-y-3">
          {previewUrl && (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Payment screenshot"
                className="max-w-36 max-h-36 rounded-xl border border-[var(--line)] shadow-sm mx-auto object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeScreenshot();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                title="Remove screenshot"
              >
                <X size={13} />
              </button>
            </div>
          )}
          <div className="text-center">
            <p className="font-['Lexend'] text-sm font-bold text-[var(--green)] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {screenshot.name}
            </p>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              {(screenshot.size / 1024 / 1024).toFixed(2)} MB · Click to change
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center shadow-xs">
            <UploadCloud size={24} />
          </div>
          <div>
            <p className="font-['Lexend'] text-sm font-bold text-[var(--ink)] mb-1">
              {isDragging ? "Drop your screenshot here" : "Upload payment confirmation screenshot"}
            </p>
            <p className="text-xs text-[var(--ink-secondary)]">
              Click to browse or drag and drop your image receipt
            </p>
            <p className="text-[11px] text-[var(--ink-muted)] mt-1 font-mono">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotUploader;
