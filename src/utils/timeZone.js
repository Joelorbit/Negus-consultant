import { DateTime } from "luxon";

export const formatBookingTime = (isoString, targetTimezone) => {
  if (!isoString) return "";

  const zone =
    targetTimezone ||
    (typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC");

  const hasOffset = /[zZ]|[+-]\d\d:\d\d$/.test(isoString);

  let dt = hasOffset
    ? DateTime.fromISO(isoString, { setZone: true }).setZone(zone)
    : DateTime.fromISO(isoString).setZone(zone, { keepLocalTime: true });

  if (!dt.isValid) return "";

  return `${dt.toFormat("MMM d, yyyy, h:mm a")} (${dt.offsetNameShort} • ${zone})`;
};
