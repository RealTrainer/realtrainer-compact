export function formatSplitDuration(duration: { value?: number | null; unit?: string | null } | null | undefined): string | null {
  if (!duration || typeof duration.value !== 'number') {
    return null;
  }

  if (duration.unit === 's') {
    const totalSeconds = Math.max(0, Math.round(duration.value));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}'${String(seconds).padStart(2, '0')}"`;
  }

  if (duration.unit === 'min') {
    return `${duration.value}min`;
  }

  return `${duration.value}${duration.unit ?? ''}`;
}