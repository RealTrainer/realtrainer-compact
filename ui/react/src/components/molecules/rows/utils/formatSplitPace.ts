export function formatSplitPace(pace: { minutes: number; seconds: number; perDistance?: { value?: number | null; unit?: string | null } } | null | undefined): string | null {
  if (!pace) {
    return null;
  }

  const sec = String(pace.seconds ?? 0).padStart(2, '0');
  const distance = pace.perDistance?.value && pace.perDistance?.unit
    ? `/${pace.perDistance.value}${pace.perDistance.unit}`
    : '';
  return `${pace.minutes}'${sec}"${distance}`;
}