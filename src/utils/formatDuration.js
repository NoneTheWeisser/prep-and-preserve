export function formatDuration(minutes) {
  if (minutes == null || minutes <= 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

export function splitMinutes(total) {
  if (total == null) return { hours: "", minutes: "" };

  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  return {
    hours: hours || "",
    minutes: minutes || "",
  };
}

export function toTotalMinutes(hours, minutes) {
  const h = hours === "" ? 0 : Number(hours);
  const m = minutes === "" ? 0 : Number(minutes);
  if (h === 0 && m === 0) return null;
  return h * 60 + m;
}
