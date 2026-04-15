import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { Exercise as ParsedExercise } from '@parser/types';

type TimerSide = 'left' | 'right';

interface MeasuredSetDuration {
  left: number;
  right: number | null;
  unit: 's' | 'min';
}

export interface ActiveDurationTimerProps {
  entity: ParsedExercise;
  onChange?: (next: ParsedExercise) => void;
  onReady?: (next: ParsedExercise) => void;
  onClose?: () => void;
  autoStart?: boolean;
}

function toSeconds(value: number | null | undefined, unit: ParsedExercise['unit']): number {
  const safeValue = typeof value === 'number' ? value : 0;
  if (unit === 'min') return Math.max(0, Math.round(safeValue * 60));
  return Math.max(0, Math.round(safeValue));
}

function formatClock(totalSeconds: number): string {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatMeasuredValue(value: number, unit: 's' | 'min'): string {
  if (unit === 'min') return `${value}min`;
  return `${value}s`;
}

function toMeasuredSet(
  leftSeconds: number,
  rightSeconds: number | null,
  preferredUnit: ParsedExercise['unit'],
): MeasuredSetDuration {
  const canUseMinutes =
    preferredUnit === 'min'
    && leftSeconds % 60 === 0
    && (rightSeconds === null || rightSeconds % 60 === 0);

  if (canUseMinutes) {
    return {
      left: leftSeconds / 60,
      right: rightSeconds === null ? null : rightSeconds / 60,
      unit: 'min',
    };
  }

  return {
    left: leftSeconds,
    right: rightSeconds,
    unit: 's',
  };
}

export function ActiveDurationTimer({
  entity,
  onChange,
  onReady,
  onClose,
  autoStart = false,
}: ActiveDurationTimerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instructionOverlayRef = useRef<HTMLDivElement>(null);
  const isBilateral = typeof entity.repsRight === 'number' && entity.repsRight > 0;
  const totalSets = Math.max(1, entity.sets ?? 1);
  const leftPlannedSeconds = Math.max(1, toSeconds(typeof entity.reps === 'number' ? entity.reps : 0, entity.unit));
  const rightPlannedSeconds = isBilateral
    ? Math.max(1, toSeconds(entity.repsRight, entity.unit))
    : leftPlannedSeconds;

  const [currentSet, setCurrentSet] = useState(1);
  const [currentSide, setCurrentSide] = useState<TimerSide>('left');
  const [remainingSeconds, setRemainingSeconds] = useState(leftPlannedSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [isFallbackFullscreen, setIsFallbackFullscreen] = useState(false);
  const [leftDraftSeconds, setLeftDraftSeconds] = useState<number | null>(null);
  const [completed, setCompleted] = useState<MeasuredSetDuration[]>(entity.measuredDurations ?? []);
  const completedRef = useRef<MeasuredSetDuration[]>(entity.measuredDurations ?? []);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [completionSummary, setCompletionSummary] = useState<string | null>(null);
  const [lastResultSeconds, setLastResultSeconds] = useState<number | null>(null);
  const [autoSaveOnZeroPending, setAutoSaveOnZeroPending] = useState(false);
  const instructionText = (entity.description ?? entity.note ?? '').trim();
  const hasInstruction = instructionText.length > 0;
  const [showInstructionOverlay, setShowInstructionOverlay] = useState(false);

  useEffect(() => {
    completedRef.current = completed;
  }, [completed]);

  const setCompletedState = (next: MeasuredSetDuration[]) => {
    completedRef.current = next;
    setCompleted(next);
  };

  useEffect(() => {
    setCurrentSet(1);
    setCurrentSide('left');
    setRemainingSeconds(leftPlannedSeconds);
    setIsRunning(autoStart);
    setLeftDraftSeconds(null);
    setCompletedState(entity.measuredDurations ?? []);
    setShowCompletionOverlay(false);
    setCompletionSummary(null);
    setLastResultSeconds(null);
    setAutoSaveOnZeroPending(false);
    setShowInstructionOverlay(false);
  }, [
    autoStart,
    entity.name,
    entity.reps,
    entity.repsRight,
    entity.sets,
    entity.unit,
    leftPlannedSeconds,
  ]);

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) return;

    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          setIsRunning(false);
          setAutoSaveOnZeroPending(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isRunning, remainingSeconds]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreenActive(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!showInstructionOverlay) return;

    // Move focus to overlay so Space/Enter doesn't trigger background buttons.
    instructionOverlayRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setShowInstructionOverlay(false);
      setIsRunning(true);
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [showInstructionOverlay]);

  useEffect(() => {
    const fullscreenNow = isFullscreenActive || isFallbackFullscreen;
    if (!isRunning || !fullscreenNow || showInstructionOverlay || showCompletionOverlay) return;

    const onKeyStop = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      stopAndFinishNow();
    };

    window.addEventListener('keydown', onKeyStop, true);
    return () => {
      window.removeEventListener('keydown', onKeyStop, true);
    };
  }, [
    isRunning,
    isFullscreenActive,
    isFallbackFullscreen,
    showInstructionOverlay,
    showCompletionOverlay,
    remainingSeconds,
    completed,
    currentSide,
    leftDraftSeconds,
    leftPlannedSeconds,
    entity.unit,
  ]);

  useEffect(() => {
    if (!autoSaveOnZeroPending) return;
    setAutoSaveOnZeroPending(false);
    if (!showCompletionOverlay) {
      // Timer hit zero: commit current segment automatically as completed duration.
      saveCurrentDuration();
    }
  }, [autoSaveOnZeroPending, showCompletionOverlay]);

  const closeCompletionAndExitFullscreen = async () => {
    await exitFullscreen();
    setShowCompletionOverlay(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!showCompletionOverlay) return;

    const onAnyKey = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      void closeCompletionAndExitFullscreen();
    };

    window.addEventListener('keydown', onAnyKey, true);
    return () => {
      window.removeEventListener('keydown', onAnyKey, true);
    };
  }, [showCompletionOverlay]);

  const plannedForCurrent = currentSide === 'left' ? leftPlannedSeconds : rightPlannedSeconds;
  const elapsedCurrent = Math.max(0, plannedForCurrent - remainingSeconds);
  const progress = plannedForCurrent > 0 ? elapsedCurrent / plannedForCurrent : 0;

  const progressRing = useMemo(() => {
    const radius = 64;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);
    return { radius, circumference, dashOffset };
  }, [progress]);

  const emitMeasured = (nextCompleted: MeasuredSetDuration[]) => {
    setCompletedState(nextCompleted);
    if (!onChange) return;

    onChange({
      ...entity,
      specType: 'measured',
      measuredDurations: nextCompleted,
    });
  };

  const buildResultExercise = (nextCompleted: MeasuredSetDuration[]): ParsedExercise => ({
    ...entity,
    specType: 'measured',
    measuredDurations: nextCompleted,
  });

  const measuredToSeconds = (duration: MeasuredSetDuration): number => {
    const leftSeconds = duration.unit === 'min' ? duration.left * 60 : duration.left;
    const rightSeconds = typeof duration.right === 'number'
      ? (duration.unit === 'min' ? duration.right * 60 : duration.right)
      : 0;
    return leftSeconds + rightSeconds;
  };

  const finishSession = (nextCompleted: MeasuredSetDuration[]) => {
    const result = buildResultExercise(nextCompleted);
    const totalSeconds = nextCompleted.reduce((sum, entry) => sum + measuredToSeconds(entry), 0);

    setCompletionSummary(formatClock(totalSeconds));
    setLastResultSeconds(totalSeconds);
    setShowCompletionOverlay(true);
    setIsRunning(false);
    setRemainingSeconds(0);

    if (onReady) {
      onReady(result);
    }
  };

  const resetSessionState = (nextCompleted: MeasuredSetDuration[]) => {
    setCompletedState(nextCompleted);
    setCurrentSet(1);
    setCurrentSide('left');
    setRemainingSeconds(leftPlannedSeconds);
    setIsRunning(false);
    setLeftDraftSeconds(null);
    setShowCompletionOverlay(false);
    setCompletionSummary(null);
    setLastResultSeconds(null);
    setAutoSaveOnZeroPending(false);
  };

  const moveToNextSegment = (nextSet: number, nextSide: TimerSide) => {
    const nextPlanned = nextSide === 'left' ? leftPlannedSeconds : rightPlannedSeconds;
    setCurrentSet(nextSet);
    setCurrentSide(nextSide);
    setRemainingSeconds(nextPlanned);
    setIsRunning(autoStart);
  };

  const saveCurrentDuration = () => {
    const actualSeconds = Math.max(0, elapsedCurrent);

    if (isBilateral && currentSide === 'left') {
      setLeftDraftSeconds(actualSeconds);
      moveToNextSegment(currentSet, 'right');
      return;
    }

    const measured = toMeasuredSet(
      isBilateral ? (leftDraftSeconds ?? leftPlannedSeconds) : actualSeconds,
      isBilateral ? actualSeconds : null,
      entity.unit,
    );

    const nextCompleted = [...completedRef.current, measured];
    emitMeasured(nextCompleted);
    setLeftDraftSeconds(null);

    if (currentSet < totalSets) {
      moveToNextSegment(currentSet + 1, 'left');
      return;
    }

    finishSession(nextCompleted);
  };

  const stopAndFinishNow = () => {
    const actualSeconds = Math.max(0, elapsedCurrent);

    const measured = (() => {
      if (!isBilateral) {
        return toMeasuredSet(actualSeconds, null, entity.unit);
      }

      if (currentSide === 'left') {
        return toMeasuredSet(actualSeconds, null, entity.unit);
      }

      return toMeasuredSet(leftDraftSeconds ?? leftPlannedSeconds, actualSeconds, entity.unit);
    })();

    const nextCompleted = [...completedRef.current, measured];
    emitMeasured(nextCompleted);
    setLeftDraftSeconds(null);
    finishSession(nextCompleted);
  };

  const resetCurrentSegment = () => {
    setIsRunning(false);
    setRemainingSeconds(plannedForCurrent);
  };

  const clearMeasured = () => {
    const empty: MeasuredSetDuration[] = [];
    resetSessionState(empty);
    emitMeasured(empty);
    setShowInstructionOverlay(false);
  };

  const startFreshSession = () => {
    const empty: MeasuredSetDuration[] = [];
    resetSessionState(empty);
    emitMeasured(empty);
  };

  const restartSession = (event?: ReactMouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    startFreshSession();
    if (hasInstruction) {
      setShowInstructionOverlay(true);
    }
  };

  const startFromInstructionOverlay = () => {
    setShowInstructionOverlay(false);
    setCurrentSet(1);
    setCurrentSide('left');
    setRemainingSeconds(leftPlannedSeconds);
    setLeftDraftSeconds(null);
    setShowCompletionOverlay(false);
    setIsRunning(true);
  };

  const startTimer = () => {
    void startInFullscreen();
  };

  const enterFullscreen = async () => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof element.requestFullscreen !== 'function') {
      setIsFallbackFullscreen(true);
      return;
    }

    try {
      await element.requestFullscreen();
    } catch {
      setIsFallbackFullscreen(true);
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement === containerRef.current && typeof document.exitFullscreen === 'function') {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore exit failure and fall back to local overlay state.
      }
    }
    setIsFullscreenActive(false);
    setIsFallbackFullscreen(false);
  };

  const startInFullscreen = async () => {
    // Starting from idle should always begin a new session, not append to previous result.
    if (!isRunning && (completedRef.current.length > 0 || lastResultSeconds !== null)) {
      startFreshSession();
    }

    await enterFullscreen();

    if (hasInstruction) {
      setShowInstructionOverlay(true);
      return;
    }

    setIsRunning(true);
  };

  const isSessionDone = completed.length >= totalSets;
  const isFullscreenMode = isFullscreenActive || isFallbackFullscreen;
  const completedTotalSeconds = completed.reduce((sum, entry) => sum + measuredToSeconds(entry), 0);
  const idleResultSeconds = lastResultSeconds ?? (completed.length > 0 ? completedTotalSeconds : null);
  const showLastResult = !isRunning && !showInstructionOverlay && !showCompletionOverlay && idleResultSeconds !== null;
  const displaySeconds = showLastResult ? idleResultSeconds : Math.max(0, remainingSeconds);
  const containerClassName = isFullscreenMode
    ? 'fixed inset-0 z-50 flex h-screen w-screen items-stretch justify-center bg-slate-950 text-slate-100'
    : 'mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/90 p-4 text-slate-100';
  const contentClassName = isFullscreenMode
    ? 'relative mx-auto my-[10vh] flex h-[80vh] w-[80vw] max-w-[1200px] flex-col items-center justify-between gap-6 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-6'
    : 'relative flex w-full flex-col items-center gap-4';
  const ringWrapperClassName = isFullscreenMode ? 'relative h-[46vh] w-[46vh] max-h-[520px] max-w-[520px]' : 'relative h-44 w-44';
  const timerNumberClassName = isFullscreenMode
    ? 'text-8xl font-bold tabular-nums leading-none sm:text-9xl'
    : 'text-5xl font-bold tabular-nums';
  const titleClassName = isFullscreenMode ? 'text-3xl font-semibold' : 'text-lg font-semibold';
  const subtitleClassName = isFullscreenMode ? 'text-lg text-slate-300' : 'text-sm text-slate-400';

  return (
    <div ref={containerRef} className={containerClassName}>
      <div className={contentClassName}>
        <div className="text-center">
          <p className={titleClassName}>{entity.name}</p>
          <p className={subtitleClassName}>
            Set {Math.min(currentSet, totalSets)} / {totalSets}
            {isBilateral ? ` • ${currentSide === 'left' ? 'Vasen' : 'Oikea'}` : ''}
          </p>
        </div>

        <div className={ringWrapperClassName}>
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160" role="img" aria-label="Timer progress">
            <circle cx="80" cy="80" r={progressRing.radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-700" />
            <circle
              cx="80"
              cy="80"
              r={progressRing.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={progressRing.circumference}
              strokeDashoffset={progressRing.dashOffset}
              className={remainingSeconds <= 5 && isRunning ? 'text-rose-500' : 'text-orange-500'}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={timerNumberClassName}>{displaySeconds}</p>
            {showLastResult ? (
              <p className={isFullscreenMode ? 'mt-2 text-sm text-emerald-300' : 'text-xs text-emerald-300'}>
                Viimeisin tulos {formatClock(idleResultSeconds)}
              </p>
            ) : (
              <p className={isFullscreenMode ? 'mt-2 text-sm text-slate-300' : 'text-xs text-slate-400'}>
                Elapsed {formatClock(elapsedCurrent)} / {formatClock(plannedForCurrent)}
              </p>
            )}
          </div>
        </div>
      

        <div className="flex w-full flex-col items-center gap-3">
          {isRunning ? (
            <button
              type="button"
              onClick={stopAndFinishNow}
              className={isFullscreenMode
                ? 'min-w-[260px] rounded-2xl border border-emerald-500/80 bg-emerald-500/30 px-10 py-4 text-2xl font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'
                : 'min-w-[220px] rounded-2xl border border-emerald-500/80 bg-emerald-500/30 px-8 py-3 text-base font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'}
            >
              Stop ({formatClock(elapsedCurrent)})
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={startTimer}
                className={isFullscreenMode
                  ? 'min-w-[300px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-10 py-4 text-2xl font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'
                  : 'min-w-[220px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-8 py-3 text-base font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'}
              >
                Start Timer
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {!isFullscreenMode && (
                  <button
                    type="button"
                    onClick={startInFullscreen}
                    className="rounded-xl border border-cyan-400/80 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30"
                  >
                    Start Full Screen
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetCurrentSegment}
                  className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={saveCurrentDuration}
                  className="rounded-xl border border-emerald-500/60 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/30"
                >
                  Done ({formatClock(elapsedCurrent)})
                </button>
              </div>
            </>
          )}
        </div>

        {showInstructionOverlay && hasInstruction && (
          <div
            ref={instructionOverlayRef}
            tabIndex={-1}
            className="absolute inset-0 z-40 flex cursor-pointer items-center justify-center bg-slate-950/92 p-4"
            onClick={startFromInstructionOverlay}
            onKeyDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              startFromInstructionOverlay();
            }}
          >
            <div className={isFullscreenMode
              ? 'w-full max-w-5xl rounded-3xl border border-slate-600 bg-slate-900/95 p-10 text-center'
              : 'w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900/95 p-6 text-center'}>
              <p className={isFullscreenMode ? 'text-sm uppercase tracking-[0.18em] text-slate-400' : 'text-xs uppercase tracking-[0.16em] text-slate-500'}>
                Ohje
              </p>
              <p className={isFullscreenMode ? 'mt-4 text-4xl font-semibold leading-tight text-slate-100' : 'mt-3 text-xl font-semibold text-slate-100'}>
                {instructionText}
              </p>
              <button
                type="button"
                onClick={startFromInstructionOverlay}
                className={isFullscreenMode
                  ? 'mt-8 min-w-[320px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-10 py-4 text-2xl font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'
                  : 'mt-6 min-w-[220px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-8 py-3 text-base font-bold tracking-wide text-emerald-50 transition-colors hover:bg-emerald-500/40'}
              >
                Start Timer
              </button>
              <p className={isFullscreenMode ? 'mt-4 text-base text-slate-300' : 'mt-3 text-xs text-slate-400'}>
                Klikkaa mista tahansa tai paina mita tahansa nappainta aloittaaksesi.
              </p>
            </div>
          </div>
        )}

        {showCompletionOverlay && (
          <div
            className="absolute inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-950/94 p-4"
            onClick={() => {
              void closeCompletionAndExitFullscreen();
            }}
          >
            <div
              className={isFullscreenMode
                ? 'w-full max-w-5xl rounded-3xl border border-emerald-500/60 bg-slate-900/95 p-10 text-center'
                : 'w-full max-w-xl rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-6 text-center'}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <p className={isFullscreenMode ? 'text-sm uppercase tracking-[0.18em] text-emerald-300' : 'text-xs uppercase tracking-[0.16em] text-emerald-300'}>
                Valmis
              </p>
              <p className={isFullscreenMode ? 'mt-4 text-5xl font-semibold text-emerald-100' : 'mt-3 text-2xl font-semibold text-emerald-100'}>
                Hieno suoritus!
              </p>
              <p className={isFullscreenMode ? 'mt-5 text-3xl font-bold text-slate-100' : 'mt-4 text-xl font-bold text-slate-100'}>
                Lopputulos: {completionSummary ?? '0:00'}
              </p>
              <p className={isFullscreenMode ? 'mt-4 text-base text-slate-300' : 'mt-3 text-xs text-slate-400'}>
                Paina mita tahansa nappainta tai klikkaa taustaa poistuaksesi fullscreenista.
              </p>
              <button
                type="button"
                onClick={() => {
                  void closeCompletionAndExitFullscreen();
                }}
                className={isFullscreenMode
                  ? 'mt-8 min-w-[280px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-8 py-3 text-xl font-bold text-emerald-50 transition-colors hover:bg-emerald-500/40'
                  : 'mt-6 min-w-[220px] rounded-2xl border border-emerald-400/80 bg-emerald-500/30 px-6 py-2.5 text-base font-bold text-emerald-50 transition-colors hover:bg-emerald-500/40'}
              >
                Sulje
              </button>
              <button
                type="button"
                onClick={restartSession}
                className={isFullscreenMode
                  ? 'mt-4 min-w-[260px] rounded-2xl border border-cyan-400/80 bg-cyan-500/20 px-8 py-3 text-xl font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/30'
                  : 'mt-4 min-w-[200px] rounded-2xl border border-cyan-400/80 bg-cyan-500/20 px-6 py-2.5 text-base font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/30'}
              >
                Kaynnista uudelleen
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {isFullscreenMode && (
            <button
              type="button"
              onClick={exitFullscreen}
              className="rounded-lg border border-cyan-500/70 px-3 py-1.5 text-cyan-200 hover:bg-cyan-500/10"
            >
              Exit Full Screen
            </button>
          )}
          <button
            type="button"
            onClick={clearMeasured}
            className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-800"
          >
            Clear measured
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
        </div>

        <div className={isFullscreenMode ? 'w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-base' : 'w-full rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-sm'}>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Measured</p>
          <div className="mt-2 space-y-1 text-slate-300">
            {completed.length === 0 && <p className="text-slate-500">Ei mitattuja sarjoja viela.</p>}
            {completed.map((setDuration, index) => (
              <p key={`${setDuration.left}-${setDuration.right ?? 'single'}-${index}`}>
                {index + 1}. {formatMeasuredValue(setDuration.left, setDuration.unit)}
                {typeof setDuration.right === 'number' ? `+${formatMeasuredValue(setDuration.right, setDuration.unit)}` : ''}
              </p>
            ))}
          </div>
        </div>

        {isSessionDone && (
          <p className={isFullscreenMode ? 'text-lg font-semibold text-emerald-400' : 'text-sm font-semibold text-emerald-400'}>
            Kaikki sarjat mitattu.
          </p>
        )}
      </div>
    </div>
  );
}