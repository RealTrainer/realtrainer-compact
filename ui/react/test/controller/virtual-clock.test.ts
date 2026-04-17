import { describe, expect, it } from 'vitest';

import { VirtualClock } from '../../src/lib/controller/VirtualClock';

describe('VirtualClock', () => {
  it('fires interval callbacks when time advances past tick boundaries', () => {
    const clock = new VirtualClock();
    const firedAt: number[] = [];

    clock.setInterval(() => {
      firedAt.push(clock.now());
    }, 1000);

    clock.advanceBy(3500);

    expect(firedAt).toEqual([1000, 2000, 3000]);
    expect(clock.now()).toBe(3500);
  });

  it('stops firing cleared intervals', () => {
    const clock = new VirtualClock();
    let fireCount = 0;

    const id = clock.setInterval(() => {
      fireCount += 1;
      if (fireCount === 1) {
        clock.clearInterval(id);
      }
    }, 500);

    clock.advanceBy(5000);

    expect(fireCount).toBe(1);
  });

  it('can jump forward from a custom now position', () => {
    const clock = new VirtualClock();
    const firedAt: number[] = [];

    clock.setNow(10_000);
    clock.setInterval(() => {
      firedAt.push(clock.now());
    }, 2000);

    clock.advanceBy(6000);

    expect(firedAt).toEqual([12_000, 14_000, 16_000]);
    expect(clock.now()).toBe(16_000);
  });

  it('can advance virtual time from real time using playback rate', () => {
    const clock = new VirtualClock();
    const firedAt: number[] = [];

    clock.setPlaybackRate(2);
    clock.setInterval(() => {
      firedAt.push(clock.now());
    }, 1000);

    clock.advanceByRealTime(1500);

    expect(firedAt).toEqual([1000, 2000, 3000]);
    expect(clock.now()).toBe(3000);
  });

  it('supports updating playback rate mid-run', () => {
    const clock = new VirtualClock();

    clock.advanceByRealTime(1000);
    clock.setPlaybackRate(5);
    clock.advanceByRealTime(1000);

    expect(clock.getPlaybackRate()).toBe(5);
    expect(clock.now()).toBe(6000);
  });
});