export function getEmbedUrl(url) {
  if (!url) return "";
  try {
    // youtube watch?v= -> embed/, youtu.be/ID -> youtube.com/embed/ID
    if (url.includes("youtube.com/watch")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    // fallback: return as-is
    return url;
  } catch {
    return url;
  }
}
