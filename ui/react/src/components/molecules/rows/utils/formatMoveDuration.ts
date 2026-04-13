export function formatMoveDuration(duration: { value?: number | null; unit?: string | null } | null | undefined): string | null {
  if (!duration || typeof duration.value !== 'number') {
    return null;
  }

  if (duration.unit === 'min') {
    const totalSeconds = Math.round(duration.value * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0) {
      return `${minutes}min`;
    }
    return `${minutes}min ${seconds}s`;
  }

  return `${duration.value}${duration.unit ?? ''}`;
}