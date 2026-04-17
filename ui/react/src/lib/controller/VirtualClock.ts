export type ClockIntervalCallback = () => void;

export interface Clock {
  now(): number;
  setInterval(callback: ClockIntervalCallback, intervalMs: number): number;
  clearInterval(id: number): void;
}

interface VirtualInterval {
  id: number;
  callback: ClockIntervalCallback;
  intervalMs: number;
  nextTickAt: number;
}

export class RealClock implements Clock {
  now(): number {
    return Date.now();
  }

  setInterval(callback: ClockIntervalCallback, intervalMs: number): number {
    return window.setInterval(callback, intervalMs);
  }

  clearInterval(id: number): void {
    window.clearInterval(id);
  }
}

export class VirtualClock implements Clock {
  private currentTimeMs = 0;

  private nextId = 1;

  private playbackRate = 1;

  private intervals = new Map<number, VirtualInterval>();

  now(): number {
    return this.currentTimeMs;
  }

  setNow(nextTimeMs: number): void {
    this.currentTimeMs = Math.max(0, Math.round(nextTimeMs));
  }

  getPlaybackRate(): number {
    return this.playbackRate;
  }

  setPlaybackRate(nextPlaybackRate: number): void {
    if (!Number.isFinite(nextPlaybackRate) || nextPlaybackRate <= 0) {
      throw new Error('playbackRate must be a finite number greater than 0');
    }

    this.playbackRate = nextPlaybackRate;
  }

  setInterval(callback: ClockIntervalCallback, intervalMs: number): number {
    if (intervalMs <= 0) {
      throw new Error('intervalMs must be greater than 0');
    }

    const id = this.nextId;
    this.nextId += 1;

    this.intervals.set(id, {
      id,
      callback,
      intervalMs,
      nextTickAt: this.currentTimeMs + intervalMs,
    });

    return id;
  }

  clearInterval(id: number): void {
    this.intervals.delete(id);
  }

  advanceBy(deltaMs: number): void {
    if (deltaMs < 0) {
      throw new Error('deltaMs must be >= 0');
    }

    const targetTime = this.currentTimeMs + deltaMs;

    while (true) {
      const nextInterval = this.getNextDueInterval(targetTime);
      if (!nextInterval) {
        break;
      }

      this.currentTimeMs = nextInterval.nextTickAt;
      nextInterval.callback();

      const latest = this.intervals.get(nextInterval.id);
      if (!latest) {
        continue;
      }

      latest.nextTickAt += latest.intervalMs;
    }

    this.currentTimeMs = targetTime;
  }

  advanceByRealTime(realDeltaMs: number): void {
    if (realDeltaMs < 0) {
      throw new Error('realDeltaMs must be >= 0');
    }

    this.advanceBy(Math.round(realDeltaMs * this.playbackRate));
  }

  private getNextDueInterval(targetTime: number): VirtualInterval | null {
    let soonest: VirtualInterval | null = null;

    for (const interval of this.intervals.values()) {
      if (interval.nextTickAt > targetTime) {
        continue;
      }

      if (!soonest || interval.nextTickAt < soonest.nextTickAt) {
        soonest = interval;
      }
    }

    return soonest;
  }
}