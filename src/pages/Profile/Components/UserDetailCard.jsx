import { useRef, useState } from "react";
import { CheckCircle2, Globe, ImagePlus, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../../../hooks/useAuth";

const UserDetailCard = ({ user }) => {
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
        setUploadMessage("Profile photo updated.");
      },
      onError: (error) => {
        setUploadError(
          error?.response?.data?.message || "The profile photo could not be uploaded.",
        );
      },
    });
  };

  const initials =
    `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "N";

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] shadow-sm">
      <div className="h-20 bg-[var(--ink)]" aria-hidden="true" />
      <div className="px-6 pb-6">
        <div className="-mt-11 flex flex-col items-center text-center">
          <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-2xl border-4 border-[var(--white)] bg-[var(--green)] text-2xl font-bold text-[var(--yellow)] shadow-md">
            {previewSource || user?.profile_image ? (
              <img
                src={previewSource || user.profile_image}
                alt={`${user?.first_name || "Your"} profile`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{initials}</span>
            )}
          </div>

          <h2 className="mt-4 break-words font-['Lexend'] text-xl font-bold">
            {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Your profile"}
          </h2>
          <p className="mt-1 break-all text-sm text-[var(--ink-muted)]">{user?.email}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--ink-secondary)]">
            <Globe className="h-4 w-4 text-[var(--green)]" aria-hidden="true" />
            <span className="capitalize">{user?.role || "Student"}</span>
          </p>
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-[var(--ink-secondary)]">
          Manage your account, course access, and mentor applications from one place.
        </p>

        <form onSubmit={handleSubmitFile} className="mt-6 grid gap-3">
          <input
            ref={fileInput}
            id="profile-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="profile-photo"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--line-strong)] px-4 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--green-subtle)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--green)]"
          >
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            {user?.profile_image ? "Choose another photo" : "Choose a profile photo"}
          </label>
          {selectedFile && (
            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--green)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              )}
              {isUploading ? "Uploading…" : "Save photo"}
            </button>
          )}
        </form>

        {uploadMessage && (
          <p className="mt-3 text-center text-sm text-[var(--green)]" role="status">
            {uploadMessage}
          </p>
        )}
        {uploadError && (
          <p className="mt-3 text-center text-sm text-red-700" role="alert">
            {uploadError}
          </p>
        )}

      </div>
    </section>
  );
};

export default UserDetailCard;
