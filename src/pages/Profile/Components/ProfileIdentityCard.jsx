import { useRef, useState } from "react";
import { CheckCircle2, Globe, ImagePlus, Loader2, Mail, ShieldCheck, Tag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../../../hooks/useAuth";

const PIXEL_SPARKS = [
  { left: "10%", bottom: 8, size: 8, color: "var(--yellow)", delay: "0s", duration: "6.5s" },
  { left: "24%", bottom: 14, size: 6, color: "var(--green)", delay: "1.3s", duration: "7.5s" },
  { left: "40%", bottom: 6, size: 9, color: "var(--yellow)", delay: "2.6s", duration: "6s" },
  { left: "55%", bottom: 16, size: 6, color: "var(--green)", delay: "0.8s", duration: "8s" },
  { left: "68%", bottom: 8, size: 8, color: "var(--yellow)", delay: "3.4s", duration: "7s" },
  { left: "82%", bottom: 12, size: 5, color: "var(--green)", delay: "2s", duration: "6.8s" },
];

export default function ProfileIdentityCard({ user }) {
  const queryClient = useQueryClient();
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage(user?.id);

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadMessage("");
    setUploadError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => setPreviewSource(String(reader.result || ""));
    reader.onerror = () => setUploadError("The selected image could not be read.");
    reader.readAsDataURL(file);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    if (!selectedFile || !previewSource) return;

    uploadImage(previewSource, {
      onSuccess: (result) => {
        if (result?.url) {
          queryClient.setQueryData(["me"], (current) =>
            current ? { ...current, profile_image: result.url } : current,
          );
        }
        setSelectedFile(null);
        setPreviewSource("");
        if (fileInput.current) fileInput.current.value = "";
        setUploadMessage("Profile photo updated successfully.");
      },
      onError: (error) => {
        setUploadError(
          error?.response?.data?.message || "The profile photo could not be uploaded.",
        );
      },
    });
  };

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Negus Scholar";
  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "N";
  const roleDisplay = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Scholar Member";

  return (
    <section
      className="overflow-hidden rounded-3xl border text-[var(--ink)] shadow-sm"
      style={{
        background: "var(--white)",
        borderColor: "var(--line)",
      }}
    >
      {/* Decorative Brand Top Banner */}
      <div
        className="profile-banner-live h-24 w-full relative"
        style={{
          borderBottom: "1px solid var(--line)",
        }}
      >
        {PIXEL_SPARKS.map((p, i) => (
          <span
            key={i}
            className="profile-pixel"
            aria-hidden="true"
            style={{
              left: p.left,
              bottom: `${p.bottom}px`,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
        <div className="absolute right-4 top-4">
          <span
            className="profile-chip-shine inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-['Lexend'] font-bold border shadow-2xs"
            style={{
              background: "var(--white)",
              color: "var(--ink)",
              borderColor: "var(--line)",
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
            <span>Verified Scholar</span>
          </span>
        </div>
      </div>

      <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="-mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            {/* Avatar Frame: alt is empty to avoid duplicate name readouts */}
            <div
              className="profile-avatar-live grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 shadow-md text-2xl font-bold"
              style={{
                borderColor: "var(--white)",
                background: "var(--green-soft)",
                color: "var(--green)",
              }}
            >
              {previewSource || user?.profile_image ? (
                <img
                  src={previewSource || user.profile_image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-['Lexend']" aria-hidden="true">{initials}</span>
              )}
            </div>

            <div className="space-y-1">
              <h2
                className="font-['Lexend'] text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{ color: "var(--ink)", margin: 0 }}
              >
                {fullName}
              </h2>
              <p
                className="text-[13px] sm:text-sm flex items-center justify-center sm:justify-start gap-1.5"
                style={{ color: "var(--ink-secondary)", margin: 0 }}
              >
                <Mail className="w-3.5 h-3.5" style={{ color: "var(--ink-muted)" }} />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-['Lexend'] font-bold border"
              style={{
                background: "var(--green-subtle)",
                color: "var(--green)",
                borderColor: "var(--line)",
              }}
            >
              <Globe className="w-3 h-3" />
              <span>{roleDisplay}</span>
            </span>

            {user?.referral_code && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-['Lexend'] font-bold border"
                style={{
                  background: "var(--yellow-soft)",
                  color: "var(--ink)",
                  borderColor: "var(--line)",
                }}
              >
                <Tag className="w-3 h-3" style={{ color: "var(--yellow)" }} />
                <span>Code: {user.referral_code}</span>
              </span>
            )}
          </div>
        </div>

        {/* Change Photo Section */}
        <div className="mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: "var(--line)" }}>
          <form onSubmit={handleSubmitFile} className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInput}
              id="profile-photo-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="profile-photo-input"
              className="btn-link-hero text-[14px] min-h-[44px] px-2 cursor-pointer inline-flex items-center gap-2"
            >
              <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{user?.profile_image ? "Change profile photo" : "Upload profile photo"}</span>
            </label>

            {selectedFile && (
              <button
                type="submit"
                disabled={isUploading}
                className="btn-dark-hero text-[14px] py-1.5 px-4 inline-flex items-center gap-2"
                style={{ minHeight: "44px" }}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    <span>Uploading…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Save Photo</span>
                  </>
                )}
              </button>
            )}

            {uploadMessage && (
              <span className="text-[13px] font-semibold" style={{ color: "var(--green)" }} role="status">
                {uploadMessage}
              </span>
            )}
            {uploadError && (
              <span className="text-[13px] font-medium text-red-600" role="alert">
                {uploadError}
              </span>
            )}
          </form>

          <span className="text-[12.5px]" style={{ color: "var(--ink-muted)" }}>
            Member ID: #{user?.id ? String(user.id).slice(0, 8) : "NEGUS"}
          </span>
        </div>
      </div>
    </section>
  );
}
