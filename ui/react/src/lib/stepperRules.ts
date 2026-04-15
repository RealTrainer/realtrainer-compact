function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getNextWeightValue(current: number, direction: 'increase' | 'decrease'): number {
  const safeCurrent = Math.max(0, roundToTwoDecimals(current));
  const isHalf = Math.abs(safeCurrent % 1) > 0;

  if (direction === 'increase') {
    if (isHalf) {
      return roundToTwoDecimals(safeCurrent + 0.5);
    }

    const lastDigit = Math.floor(safeCurrent) % 10;
    if (lastDigit === 2 || lastDigit === 7) {
      return roundToTwoDecimals(safeCurrent + 0.5);
    }

    return roundToTwoDecimals(safeCurrent + 1);
  }

  if (safeCurrent <= 0) {
    return 0;
  }

  if (isHalf) {
    return roundToTwoDecimals(Math.max(0, safeCurrent - 0.5));
  }

  const lastDigit = Math.floor(safeCurrent) % 10;
  if (lastDigit === 3 || lastDigit === 8) {
    return roundToTwoDecimals(Math.max(0, safeCurrent - 0.5));
  }

  return roundToTwoDecimals(Math.max(0, safeCurrent - 1));
}

export function getDistanceStepMeters(valueMeters: number): number {
  const value = Math.max(0, valueMeters);

  if (value < 2) return 0.05;
  if (value < 20) return 0.1;
  if (value < 1000) return 1;
  return 100;
}

export function getNextDistanceMetersValue(current: number, direction: 'increase' | 'decrease'): number {
  const safeCurrent = Math.max(0, roundToTwoDecimals(current));
  const step = getDistanceStepMeters(safeCurrent);
  const next = direction === 'increase' ? safeCurrent + step : safeCurrent - step;
  return roundToTwoDecimals(Math.max(0, next));
}
