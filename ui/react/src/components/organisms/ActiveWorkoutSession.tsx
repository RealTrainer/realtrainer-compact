import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { Exercise as ParsedExercise, Workout as ParsedWorkout } from '@parser/types';

import { ActiveDurationTimer } from '../molecules/ActiveDurationTimer';
import { WorkoutSessionController } from '../../lib/controller/WorkoutSessionController';
import type { Clock } from '../../lib/controller/VirtualClock';
import type { WorkoutFeeling } from '../../lib/controller/workout-controller-types';
import type { WorkoutSessionState } from '../../lib/controller/workout-session-controller-types';

/**
 * Finnish ordinal numbers for set labels.
 */
function finnishOrdinal(n: number): string {
  const ordinals = ['ensimmäinen', 'toinen', 'kolmas', 'neljäs', 'viides', 'kuudes', 'seitsemäs', 'kahdeksas', 'yhdeksäs', 'kymmenes'];
  return ordinals[n - 1] ?? `${n}.`;
}

/**
 * Animated dots that cycle: . → .. → ...
 */
function AnimatedDots({ className }: { className?: string }) {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{'.'.repeat(dots)}</span>;
}

/**
 * Rep counter that counts up in rhythm: Toisto 1... Toisto 2...
 * Uses 4 second intervals (slower rhythm) with animated dots.
 */
function RepCounter({ plannedReps, elapsedSeconds, beatIntervalSeconds = 4 }: { plannedReps: number | null; elapsedSeconds: number; beatIntervalSeconds?: number }) {
  const currentRep = Math.min(
    Math.floor(elapsedSeconds / beatIntervalSeconds) + 1,
    plannedReps ?? 999
  );
  
  // Calculate progress within current rep for animation
  const progressInRep = (elapsedSeconds % beatIntervalSeconds) / beatIntervalSeconds;
  const showDots = progressInRep < 0.8; // Show dots for first 80% of interval

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Toisto X... on one line */}
      <div 
        className="flex items-baseline gap-2 transition-all duration-300"
        style={{ opacity: showDots ? 1 : 0.7, transform: showDots ? 'scale(1)' : 'scale(0.95)' }}
      >
        <span className="text-5xl font-medium text-emerald-300">Toisto</span>
        <span className="text-8xl font-bold text-emerald-400">{currentRep}</span>
        {showDots && <AnimatedDots className="w-24 text-7xl font-bold text-emerald-400" />}
      </div>
      {plannedReps && (
        <span className="text-2xl text-slate-500">/ {plannedReps}</span>
      )}
    </div>
  );
}

/**
 * Reps editor with +/- buttons.
 * Size 'large' is for fullscreen confirmation view.
 */
function RepsEditor({ 
  value, 
  onChange, 
  label = 'toistoa',
  size = 'default' 
}: { 
  value: number; 
  onChange: (value: number) => void; 
  label?: string;
  size?: 'default' | 'large';
}) {
  const isLarge = size === 'large';
  
  const buttonClass = isLarge
    ? "flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-800 text-4xl text-slate-100"
    : "flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-2xl text-slate-100";
  
  const textClass = isLarge
    ? "min-w-[10rem] text-center text-4xl font-bold text-slate-100"
    : "min-w-[8rem] text-center text-2xl font-bold text-slate-100";
  
  const gapClass = isLarge ? "gap-6" : "gap-4";

  return (
    <div className={`flex items-center justify-center ${gapClass}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange(Math.max(0, value - 1));
        }}
        className={buttonClass}
      >
        -
      </button>
      <span className={textClass}>
        {value} {label}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange(value + 1);
        }}
        className={buttonClass}
      >
        +
      </button>
    </div>
  );
}

export interface ActiveWorkoutSessionProps {
  workouts: ParsedWorkout[];
  clock?: Clock;
  startInFullscreen?: boolean;
  onSessionComplete?: (state: WorkoutSessionState) => void;
}

export function ActiveWorkoutSession({
  workouts,
  clock,
  startInFullscreen = false,
  onSessionComplete,
}: ActiveWorkoutSessionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const controller = useMemo(() => new WorkoutSessionController(workouts, { clock }), [workouts, clock]);
  const [sessionState, setSessionState] = useState(() => controller.getState());
  const [actualReps, setActualReps] = useState(0);
  const [, setFeeling] = useState<WorkoutFeeling | null>(null);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [isFallbackFullscreen, setIsFallbackFullscreen] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(startInFullscreen);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const [showExitSummary, setShowExitSummary] = useState(false);

  // Check if any exercises have been started/completed
  const hasStartedExercises = useCallback(() => {
    if (sessionState.completedWorkoutCount > 0) return true;
    const workoutState = sessionState.currentWorkoutState;
    if (!workoutState) return false;
    // If we've progressed beyond first executable step
    const executableStepsCompleted = workoutState.steps.filter(
      (s, i) => (s.kind === 'timed-exercise' || s.kind === 'rep-exercise') && 
                i < workoutState.currentStepIndex
    ).length;
    if (executableStepsCompleted > 0) return true;
    // If current rep exercise has completed or in-progress sets
    const step = workoutState.currentStep;
    if (step?.kind === 'rep-exercise') {
      // Check completed sets
      if (step.completedSets > 0) return true;
      // Check setResults (already recorded sets)
      if (step.setResults.length > 0) return true;
      // Check if a set is awaiting confirmation (just finished but not confirmed)
      if (workoutState.activeRepSet?.status === 'awaiting-confirmation') return true;
    }
    // If timed exercise and has completed segments
    if (step?.kind === 'timed-exercise') {
      const completedSegments = step.segments.filter(s => s.measuredSeconds !== null).length;
      if (completedSegments > 0) return true;
      // Check if a segment is awaiting confirmation
      if (workoutState.status === 'awaiting-timed-confirmation') return true;
    }
    return false;
  }, [sessionState]);

  useEffect(() => {
    setSessionState(controller.getState());

    return controller.subscribe((event) => {
      if (event.type === 'state-changed') {
        setSessionState(event.state);
      }

      if (event.type === 'session-completed') {
        onSessionComplete?.(event.state);
      }
    });
  }, [controller, onSessionComplete]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const isNowFullscreen = document.fullscreenElement === containerRef.current;
      setIsFullscreenActive(isNowFullscreen);
      
      // When exiting fullscreen (native ESC or our exitFullscreen)
      if (!isNowFullscreen) {
        setIsFallbackFullscreen(false);
        setIsExerciseRunning(false);
        
        // If exercises have been done, show summary instead of returning to Play
        if (hasStartedExercises()) {
          setShowExitSummary(true);
        } else {
          setIsSessionStarted(false);
        }
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [hasStartedExercises]);

  const startExercise = useCallback(() => {
    if (!isExerciseRunning && isSessionStarted) {
      setIsExerciseRunning(true);
      controller.startCurrent();
    }
  }, [controller, isExerciseRunning, isSessionStarted]);

  const stopExercise = useCallback(() => {
    if (isExerciseRunning) {
      // For rep exercises, calculate actual counted reps from elapsed time before stopping
      const currentState = controller.getState();
      const step = currentState.currentWorkoutState?.currentStep;
      const repSet = currentState.currentWorkoutState?.activeRepSet;
      
      if (step?.kind === 'rep-exercise' && repSet?.status === 'running') {
        // Calculate counted reps using same logic as RepCounter (1 rep per 4 seconds - slower rhythm)
        const beatIntervalSeconds = 4;
        const countedReps = Math.min(
          Math.floor(repSet.elapsedSeconds / beatIntervalSeconds) + 1,
          step.plannedReps ?? 999
        );
        setActualReps(countedReps);
      }
      
      controller.stopCurrent();
      // Stop running state - controller handles awaiting-confirmation
      setIsExerciseRunning(false);
    }
  }, [controller, isExerciseRunning]);

  // Confirm the current result (timed segment or rep set) and advance
  const confirmExercise = useCallback(() => {
    const currentState = controller.getState();
    const status = currentState.currentWorkoutState?.status;
    const step = currentState.currentWorkoutState?.currentStep;

    if (status === 'awaiting-timed-confirmation') {
      // Confirm timed segment
      controller.confirmCurrentTimedSegment();
      // Check if more segments or completed
      const nextState = controller.getState();
      if (nextState.currentWorkoutState?.status === 'completed') {
        controller.nextWorkout();
      } else if (nextState.currentWorkoutState?.status === 'idle') {
        // More segments remain - auto-start next segment (skip instruction)
        setIsExerciseRunning(true);
        controller.startCurrent();
      }
    } else if (status === 'awaiting-input' && step?.kind === 'rep-exercise') {
      // Confirm rep set
      controller.completeCurrentRepStep({ actualReps });
      // Check if all sets done
      if (step.completedSets + 1 >= step.plannedSets) {
        controller.nextWorkout();
      } else {
        // More sets remain - auto-start next set (skip instruction)
        setIsExerciseRunning(true);
        controller.startCurrent();
      }
    }
  }, [controller, actualReps]);

  const toggleExercise = useCallback(() => {
    const currentState = controller.getState();
    const status = currentState.currentWorkoutState?.status;

    // If awaiting confirmation, confirm instead of toggle
    if (status === 'awaiting-timed-confirmation' || status === 'awaiting-input') {
      confirmExercise();
      return;
    }

    if (isExerciseRunning) {
      stopExercise();
    } else {
      startExercise();
    }
  }, [controller, isExerciseRunning, startExercise, stopExercise, confirmExercise]);

  useEffect(() => {
    const fullscreenNow = isFullscreenActive || isFallbackFullscreen;
    if (!fullscreenNow) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIsExerciseRunning(false);
        controller.skipToNextStep();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIsExerciseRunning(false);
        controller.skipToPreviousStep();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        void exitFullscreen();
      } else if (event.key === ' ' || event.key === 'Enter') {
        // Space or Enter toggles start/stop
        event.preventDefault();
        if (isSessionStarted) {
          toggleExercise();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [controller, isFallbackFullscreen, isFullscreenActive, isSessionStarted, toggleExercise]);

  const currentStep = sessionState.currentWorkoutState?.currentStep ?? null;
  const activeRepSet = sessionState.currentWorkoutState?.activeRepSet ?? null;
  const activeTimedSegment = sessionState.currentWorkoutState?.activeTimedSegment ?? null;
  const workoutStatus = sessionState.currentWorkoutState?.status ?? 'idle';
  const isFullscreenMode = isFullscreenActive || isFallbackFullscreen;
  const isAwaitingTimedConfirmation = workoutStatus === 'awaiting-timed-confirmation';
  const isAwaitingRepConfirmation = workoutStatus === 'awaiting-input' && activeRepSet?.status === 'awaiting-confirmation';
  const isAwaitingConfirmation = isAwaitingTimedConfirmation || isAwaitingRepConfirmation;

  useEffect(() => {
    if (!currentStep || currentStep.kind !== 'rep-exercise') {
      setActualReps(0);
      setFeeling(null);
      return;
    }

    const nextActualReps = activeRepSet?.plannedReps ?? currentStep.plannedReps ?? 0;
    setActualReps(nextActualReps);
    setFeeling(currentStep.feeling ?? null);
  }, [activeRepSet?.plannedReps, currentStep?.id, currentStep?.kind, currentStep?.kind === 'rep-exercise' ? currentStep.plannedReps : null]);

  if (sessionState.totalWorkoutCount === 0 || !sessionState.currentWorkoutState || !currentStep) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-300">
        Ei aktiivisia harjoituksia.
      </div>
    );
  }
  const startSession = async (): Promise<void> => {
    setIsSessionStarted(true);
    await enterFullscreen();
  };

  async function enterFullscreen(): Promise<void> {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    if (typeof element.requestFullscreen !== 'function') {
      setIsFallbackFullscreen(true);
      return;
    }

    try {
      await element.requestFullscreen();
      setIsFallbackFullscreen(false);
    } catch {
      setIsFallbackFullscreen(true);
    }
  }

  async function exitFullscreen(): Promise<void> {
    // If using real fullscreen, exit it - fullscreenchange handler will handle state
    if (document.fullscreenElement === containerRef.current && typeof document.exitFullscreen === 'function') {
      try {
        await document.exitFullscreen();
        // fullscreenchange event will handle state updates
        return;
      } catch {
        // Ignore exit failure and fall through to manual handling
      }
    }

    // Manual handling for fallback fullscreen mode (no fullscreenchange event)
    setIsFullscreenActive(false);
    setIsFallbackFullscreen(false);
    setIsExerciseRunning(false);
    
    // If exercises have been done, show summary instead of returning to Play
    if (hasStartedExercises()) {
      setShowExitSummary(true);
    } else {
      setIsSessionStarted(false);
    }
  }

  const containerClassName = isFullscreenMode
    ? 'fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-slate-950 px-6 py-6 text-slate-100'
    : 'space-y-4 rounded-[2rem] border border-slate-800 bg-slate-950/85 p-4 text-slate-100 shadow-2xl shadow-slate-950/30';

  // Calculate step progress for fullscreen display
  const totalSteps = sessionState.currentWorkoutState?.steps?.filter((s) => s.kind === 'timed-exercise' || s.kind === 'rep-exercise').length ?? 0;
  const executableSteps = sessionState.currentWorkoutState?.steps?.filter((s) => s.kind === 'timed-exercise' || s.kind === 'rep-exercise') ?? [];
  const currentExecIndex = executableSteps.findIndex((s) => s.id === currentStep?.id);
  const stepProgressText = totalSteps > 0 ? `${currentExecIndex + 1}/${totalSteps}` : '';

  // --- Initial state: Show big centered Play button (in card, not fullscreen) ---
  if (!isSessionStarted) {
    return (
      <section 
        ref={containerRef} 
        className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-slate-800 bg-slate-950/85 p-8 text-slate-100 shadow-2xl shadow-slate-950/30" 
        data-testid="active-workout-session"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => void startSession()}
            aria-label="Aloita harjoitus"
            className="flex h-40 w-40 items-center justify-center rounded-full border-[3px] border-emerald-300/60 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 pl-2 text-6xl text-white shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-105 active:scale-95"
          >
            ▶
          </button>
          <p className="text-xl text-slate-400">Paina Play aloittaaksesi</p>
        </div>
      </section>
    );
  }

  // --- Exit summary view: show what was done and options to continue or exit ---
  if (showExitSummary) {
    // Calculate completed work summary
    const workoutState = sessionState.currentWorkoutState;
    const activeRepSet = workoutState?.activeRepSet;
    const executableSteps = workoutState?.steps.filter(s => s.kind === 'timed-exercise' || s.kind === 'rep-exercise') ?? [];
    
    // Determine work done for each step
    const stepsWithProgress = executableSteps.map((s) => {
      const stepIndex = workoutState?.steps.indexOf(s) ?? -1;
      const isCurrentStep = stepIndex === workoutState?.currentStepIndex;
      
      let completedSetsCount = 0;
      let hasInProgressWork = false;
      let totalSets = 1;
      
      if (s.kind === 'rep-exercise') {
        totalSets = s.plannedSets;
        completedSetsCount = s.setResults.length;
        // If current step and a set is awaiting confirmation, count it as in-progress
        if (isCurrentStep && activeRepSet?.status === 'awaiting-confirmation') {
          hasInProgressWork = true;
        }
      } else if (s.kind === 'timed-exercise') {
        totalSets = s.segments.length;
        completedSetsCount = s.segments.filter(seg => seg.measuredSeconds !== null).length;
        // If current step and timed segment awaiting confirmation
        if (isCurrentStep && workoutState?.status === 'awaiting-timed-confirmation') {
          hasInProgressWork = true;
        }
      }
      
      // Step has progress if it's before current step, has completed sets, or has in-progress work
      const hasProgress = stepIndex < (workoutState?.currentStepIndex ?? 0) || completedSetsCount > 0 || hasInProgressWork;
      
      return {
        step: s,
        completedSetsCount,
        totalSets,
        hasInProgressWork,
        hasProgress,
      };
    });
    
    const stepsWithWork = stepsWithProgress.filter(sp => sp.hasProgress);
    
    const resumeSession = async () => {
      setShowExitSummary(false);
      await enterFullscreen();
    };
    
    const exitToPlay = () => {
      setShowExitSummary(false);
      setIsSessionStarted(false);
    };

    return (
      <section 
        ref={containerRef} 
        className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-slate-800 bg-slate-950/85 p-8 text-slate-100 shadow-2xl shadow-slate-950/30" 
        data-testid="active-workout-session"
      >
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          {/* Summary of completed exercises */}
          <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-300">Tehty:</h3>
            {stepsWithWork.length > 0 ? (
              <ul className="space-y-2">
                {stepsWithWork.map(({ step, completedSetsCount, totalSets, hasInProgressWork }) => {
                  // For current step with in-progress work, use actualReps state (calculated from elapsed time)
                  const isCurrentStep = step.id === currentStep?.id;
                  const displayReps = isCurrentStep && hasInProgressWork ? actualReps : 0;
                  
                  return (
                    <li key={step.id} className="flex items-center gap-2 text-slate-200">
                      <span className={completedSetsCount === totalSets ? "text-emerald-400" : "text-amber-400"}>
                        {completedSetsCount === totalSets ? '✓' : '○'}
                      </span>
                      <span>{step.label}</span>
                      {step.kind === 'rep-exercise' && (
                        <span className="text-slate-500">
                          ({completedSetsCount + (hasInProgressWork ? 1 : 0)}/{totalSets} sarjaa)
                          {hasInProgressWork && displayReps > 0 && (
                            <span className="ml-1 text-amber-400">• {displayReps} toistoa</span>
                          )}
                        </span>
                      )}
                      {step.kind === 'timed-exercise' && totalSets > 1 && (
                        <span className="text-slate-500">
                          ({completedSetsCount + (hasInProgressWork ? 1 : 0)}/{totalSets})
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-500">Ei vielä valmiita liikkeitä</p>
            )}
            
            {/* Show remaining */}
            {stepsWithWork.length < executableSteps.length && (
              <div className="mt-4 border-t border-slate-700 pt-4">
                <p className="text-sm text-slate-500">
                  Jäljellä: {executableSteps.length - stepsWithWork.length} liikettä
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => void resumeSession()}
              className="w-full rounded-3xl border-[3px] border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-5 text-xl font-bold text-white shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Jatka harjoitusta
            </button>
            <button
              type="button"
              onClick={exitToPlay}
              className="w-full rounded-2xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-lg font-medium text-slate-300 transition-colors hover:bg-slate-700/50"
            >
              Poistu
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --- Fullscreen session (started), show exercise view ---
  const handleContainerClick = () => {
    // Don't toggle when awaiting confirmation - only explicit button clicks should work
    if (isAwaitingConfirmation) {
      return;
    }
    if (isSessionStarted && isFullscreenMode) {
      toggleExercise();
    }
  };

  return (
    <section
      ref={containerRef}
      className={containerClassName}
      data-testid="active-workout-session"
      onClick={handleContainerClick}
    >
      <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-8">
        {/* Progress indicator */}
        <div className="flex items-center gap-4">
          {stepProgressText && (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-mono text-2xl font-bold text-emerald-300">
              {stepProgressText}
            </span>
          )}
          {isFullscreenMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void exitFullscreen();
              }}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:border-slate-500"
            >
              Poistu (ESC)
            </button>
          )}
        </div>

        {/* Exercise name and instruction */}
        <div className="w-full space-y-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            {currentStep.kind === 'rep-exercise' && currentStep.plannedReps
              ? `${currentStep.plannedReps} x ${currentStep.label}`
              : currentStep.label}
          </h1>
          {currentStep.instructionText && (
            <p className="text-2xl leading-relaxed text-slate-300 md:text-3xl">{currentStep.instructionText}</p>
          )}
        </div>

        {/* Timer for timed exercises - only when running */}
        {isExerciseRunning && currentStep.kind === 'timed-exercise' && !isAwaitingConfirmation && (
          <div className="w-full max-w-md">
            <ActiveDurationTimer
              key={`${sessionState.currentWorkoutIndex}-${currentStep.id}`}
              entity={currentStep.original as ParsedExercise}
              clock={clock}
              autoStart={true}
              onReady={() => {
                // Timer completed - controller handles the awaiting-timed-confirmation state
                setIsExerciseRunning(false);
              }}
            />
          </div>
        )}

        {/* Timed exercise confirmation view */}
        {isAwaitingTimedConfirmation && currentStep.kind === 'timed-exercise' && activeTimedSegment && (() => {
          const totalSegments = currentStep.segments.length;
          const isLastSegment = activeTimedSegment.segmentIndex >= totalSegments - 1;
          const nextSegmentIndex = activeTimedSegment.segmentIndex + 1;
          const nextSegment = currentStep.segments[nextSegmentIndex];
          
          return (
            <div className="w-full max-w-md space-y-6 text-center">
              {/* Big title */}
              <h2 className="text-3xl font-bold text-emerald-400">
                {isLastSegment ? 'Liike valmis!' : 'Aika on täynnä!'}
              </h2>

              {/* Next segment/exercise button */}
              {!isLastSegment && nextSegment ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmExercise();
                  }}
                  className="w-full rounded-2xl border-[3px] border-emerald-300/60 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {nextSegment.side === 'right' ? 'Aloita oikea puoli' : `Aloita ${finnishOrdinal(nextSegment.setNumber)} sarja`}
                  <span className="mt-1 block text-lg font-normal text-emerald-100/80">
                    {nextSegment.plannedSeconds}s
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmExercise();
                  }}
                  className="w-full rounded-2xl border-[3px] border-emerald-300/60 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Seuraava liike →
                </button>
              )}

              {/* Time result below */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">
                  Toteutunut aika
                  {activeTimedSegment.side !== 'single' && (
                    <> • {activeTimedSegment.side === 'left' ? 'Vasen' : 'Oikea'} puoli</>
                  )}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-100">
                  {activeTimedSegment.measuredSeconds}s
                </p>
              </div>
              <p className="text-sm text-slate-500">← → nuolilla vaihdat harjoitusta • ESC poistuu</p>
            </div>
          );
        })()}

        {/* Rep exercise controls when running */}
        {isExerciseRunning && currentStep.kind === 'rep-exercise' && !isAwaitingConfirmation && (
          <div className="w-full max-w-md space-y-6">
            {/* Show rep counter with rhythm when running */}
            {activeRepSet?.status === 'running' && (
              <>
                <RepCounter
                  plannedReps={currentStep.plannedReps}
                  elapsedSeconds={activeRepSet.elapsedSeconds}
                />
                <div className="text-center">
                  <p className="text-lg text-slate-400">
                    Sarja {activeRepSet.setNumber}/{currentStep.plannedSets}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    stopExercise();
                  }}
                  className="w-full rounded-full border border-amber-500/50 bg-amber-500/10 px-6 py-3 text-lg font-medium text-amber-100"
                >
                  Valmis! (Space)
                </button>
              </>
            )}
          </div>
        )}

        {/* Rep exercise confirmation view */}
        {isAwaitingRepConfirmation && currentStep.kind === 'rep-exercise' && activeRepSet && (
          <div className="w-full max-w-md space-y-6 text-center">
            {/* Big title with ordinal */}
            <h2 className="text-3xl font-bold text-emerald-400">
              {activeRepSet.setNumber >= currentStep.plannedSets 
                ? 'Liike valmis!' 
                : `${finnishOrdinal(activeRepSet.setNumber).charAt(0).toUpperCase()}${finnishOrdinal(activeRepSet.setNumber).slice(1)} sarja valmis!`}
            </h2>

            {/* Reps editor with text inside */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
              <RepsEditor
                value={actualReps}
                onChange={setActualReps}
                size="large"
              />
              <p className="mt-3 text-sm text-slate-500">
                Sarja {activeRepSet.setNumber}/{currentStep.plannedSets} • {activeRepSet.elapsedSeconds}s
              </p>
            </div>

            {/* Next set button or finish button */}
            {activeRepSet.setNumber < currentStep.plannedSets ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmExercise();
                }}
                className="w-full rounded-3xl border-[3px] border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Aloita {finnishOrdinal(activeRepSet.setNumber + 1)} sarja
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmExercise();
                }}
                className="w-full rounded-3xl border-[3px] border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Seuraava liike →
              </button>
            )}
            <p className="text-sm text-slate-500">← → nuolilla vaihdat harjoitusta • ESC poistuu</p>
          </div>
        )}

        {/* Rep exercise info when idle - show big start button for next set */}
        {!isExerciseRunning && !isAwaitingConfirmation && currentStep.kind === 'rep-exercise' && (
          <div className="w-full max-w-md space-y-4 text-center">
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                // Enter fullscreen if not already
                if (!isFullscreenMode) {
                  await enterFullscreen();
                }
                startExercise();
              }}
              className="w-full rounded-3xl border-[3px] border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Aloita {finnishOrdinal(currentStep.completedSets + 1)} sarja
            </button>
            <p className="text-sm text-slate-500">← → nuolilla vaihdat harjoitusta • ESC poistuu</p>
          </div>
        )}

        {/* Start button when idle for timed exercises */}
        {!isExerciseRunning && !isAwaitingConfirmation && currentStep.kind === 'timed-exercise' && (
          <div className="w-full max-w-md space-y-4 text-center">
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                // Enter fullscreen if not already
                if (!isFullscreenMode) {
                  await enterFullscreen();
                }
                startExercise();
              }}
              className="w-full rounded-3xl border-[3px] border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-8 py-6 text-2xl font-bold text-white shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Aloita
            </button>
            <p className="text-sm text-slate-500">← → nuolilla vaihdat harjoitusta • ESC poistuu</p>
          </div>
        )}

        {/* Start instruction when idle (not running, not awaiting confirmation) - only for other types */}
        {!isExerciseRunning && !isAwaitingConfirmation && currentStep.kind !== 'rep-exercise' && currentStep.kind !== 'timed-exercise' && (
          <div className="space-y-2 text-center">
            <p className="text-xl text-slate-300">Paina <kbd className="rounded bg-slate-800 px-2 py-1 font-mono">Space</kbd> tai <kbd className="rounded bg-slate-800 px-2 py-1 font-mono">Enter</kbd> aloittaaksesi</p>
            <p className="text-sm text-slate-500">← → nuolilla vaihdat harjoitusta • ESC poistuu</p>
          </div>
        )}

        {/* Stop instruction when running */}
        {isExerciseRunning && (
          <div className="space-y-2 text-center">
            <p className="text-lg text-slate-400">Paina <kbd className="rounded bg-slate-800 px-2 py-1 font-mono">Space</kbd> lopettaaksesi</p>
          </div>
        )}

        {/* Navigation arrows in footer */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExerciseRunning(false);
              controller.skipToPreviousStep();
            }}
            className="rounded-full border border-slate-700 px-6 py-3 text-lg text-slate-300 hover:border-slate-500"
          >
            ← Edellinen
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExerciseRunning(false);
              controller.skipToNextStep();
            }}
            className="rounded-full border border-slate-700 px-6 py-3 text-lg text-slate-300 hover:border-slate-500"
          >
            Seuraava →
          </button>
        </div>
      </div>
    </section>
  );
}