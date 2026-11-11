// Minimal country-to-timezone mapping for mentor/student selection.
// Extend this list as needed.

export const COUNTRY_TIMEZONES = [
  { country: "Ethiopia", timezone: "Africa/Addis_Ababa" },
  { country: "Kenya", timezone: "Africa/Nairobi" },
  { country: "Nigeria", timezone: "Africa/Lagos" },
  { country: "Ghana", timezone: "Africa/Accra" },
  { country: "South Africa", timezone: "Africa/Johannesburg" },
  { country: "United States (Eastern)", timezone: "America/New_York" },
  { country: "United States (Pacific)", timezone: "America/Los_Angeles" },
  { country: "United Kingdom", timezone: "Europe/London" },
  { country: "Germany", timezone: "Europe/Berlin" },
  { country: "India", timezone: "Asia/Kolkata" },
];

export function getTimezoneForCountry(country) {
  const entry = COUNTRY_TIMEZONES.find((c) => c.country === country);
  return entry ? entry.timezone : null;
}
