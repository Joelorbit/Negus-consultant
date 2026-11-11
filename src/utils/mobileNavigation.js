// Utility function for reliable mobile navigation
// `reason` is kept for caller documentation/logging; intentionally unused here.
// eslint-disable-next-line no-unused-vars
export const navigateToLogin = (reason = "authentication required") => {
  try {
    // Use window.location.href for more reliable mobile navigation
    window.location.href = "/login";
  } catch (error) {
    console.error("Navigation error:", error);
    // Fallback to direct location change
    window.location.replace("/login");
  }
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Enhanced navigation with mobile detection
export const smartNavigate = (path, options = {}) => {
  try {
    // Store state in localStorage for mobile compatibility
    if (options.state) {
      localStorage.setItem("navigationState", JSON.stringify(options.state));
    }

    // Always use window.location.href for reliable navigation across all devices
    window.location.href = path;
  } catch (error) {
    console.error("Navigation error:", error);
    // Fallback to direct location change
    window.location.replace(path);
  }
};
