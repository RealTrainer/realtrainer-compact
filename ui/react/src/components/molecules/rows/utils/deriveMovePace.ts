export function deriveMovePace(
  duration: { value?: number | null; unit?: string | null } | null | undefined,
  distance: { value?: number | null; unit?: string | null } | null | undefined,
): string | null {
  if (!duration || !distance) {
    return null;
  }

  if (duration.unit !== 'min' || typeof duration.value !== 'number' || typeof distance.value !== 'number' || !distance.unit) {
    return null;
  }

  const distanceMeters = distance.unit === 'km'
    ? distance.value * 1000
    : distance.unit === 'm'
      ? distance.value
      : null;

  if (!distanceMeters || distanceMeters <= 0) {
    return null;
  }

  const totalSeconds = duration.value * 60;
  const pacePer100mSeconds = totalSeconds / (distanceMeters / 100);
  let minutes = Math.floor(pacePer100mSeconds / 60);
  let seconds = Math.round(pacePer100mSeconds % 60);

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  return `@${minutes}:${String(seconds).padStart(2, '0')}/100m`;
}