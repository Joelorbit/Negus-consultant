export async function shareLink({ title, text, url }) {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    await navigator.share({ title, text, url });
    return "shared";
  }

  if (typeof navigator !== "undefined" && typeof navigator.clipboard?.writeText === "function") {
    await navigator.clipboard.writeText(url);
    return "copied";
  }

  throw new Error("Sharing is not supported in this browser.");
}
