## Plan: Headless Workout Timing Engine

Replace the bug-prone React-local timer state with a headless workout progression engine that consumes parsed COMPACT workout data, owns timing/progression logic outside React, and is specified first through unit tests using a virtual clock. The first phase deliberately excludes UI implementation and focuses on a pure TypeScript controller with deterministic state transitions, editable workout steps, timing, measured outputs, and event emission for countdown/cheer/completion behavior.

**Status**
- Completed: virtual clock foundation.
- Completed: initial workout step normalization for timed exercises, non-timed exercises, sections, and text.
- Completed: initial headless controller with subscription API, timed progression, set-based rep progression, reorder, replace, insert, remove, and update operations.
- Completed: initial top-level session controller for multi-workout navigation and auto-advance across workouts.
- Completed: focused unit tests for clock + controller slice, now grouped by execution path for easier review.
- Partially completed: first React integration seam exists as a top-level session organism that renders `ActiveDurationTimer` for timed steps and `ActiveRepEditControls` for rep steps over the session controller.
- In progress as the delivery target: a UI-validatable prototype built around `ActiveWorkoutSession`, session navigation, and debug/playback speed, so the multi-workout flow can be exercised end-to-end in the React demo soon.
- Deferred: React adapter/hook, UI migration, nested structures such as Circuit/Pyramid, richer live step editing, and persistence.

**Prototype Target**
- Goal: get to a fast validation build where a user can run multiple workouts in one session from the UI, switch workouts, execute timed and rep steps, and speed up time for demo/debug.
- Done already: headless workout controller, headless session controller, virtual clock with playback rate, and first `ActiveWorkoutSession` organism.
- Prototype missing pieces before broader validation:
	1. wire `ActiveWorkoutSession` into the demo/playground so the session flow is visible without custom setup
	2. add top-level debug speed control using one shared `VirtualClock` for the session
	3. add top-level keyboard mapping for previous/next workout and start/stop current step intents
	4. add at least one UI smoke path that exercises two timed workouts through the top-level organism
	5. decide whether the first fullscreen pass lives directly in `ActiveWorkoutSession` or in a thin wrapper around it
- Explicit non-goals for the prototype cut: Circuit/Pyramid support, full hook abstraction cleanup, replacing all internal timer state in `ActiveDurationTimer`, and persistence.

**Steps**
1. Phase 1: Freeze scope and normalize the execution model.
2. Completed: define the first supported runtime scope as a parsed workout-level controller that iterates ordered workout content and produces executable steps only for supported exercise-like items. Unsupported content types such as Section and Text are surfaced as non-executable metadata.
3. Completed: define the first executable step model for single timed Exercise, bilateral timed Exercise, repeated timed Exercise such as 3x50s, and ordered multi-step workout progression across multiple exercises. Circuit, Pyramid, Move splits, and nested workout containers are still deferred.
4. Completed: define the initial controller contract as pure TypeScript, independent of React: create/start/stop/pause/reset/restart/select/move/replace/insert/remove/getState/subscribe. The current state shape already contains current step index, current segment index, planned time, elapsed time, remaining time, and last result seconds. Richer derived state is still pending.
5. Phase 2: Build time infrastructure first.
6. Completed: create a virtual clock abstraction with `setInterval`, `clearInterval`, `advanceBy`, and `setNow`, so tests can deterministically simulate long workouts instantly. A real clock adapter also exists for later runtime integration.
7. Completed: add clock-focused unit tests for advancing time, clearing intervals, and custom now positions. Pause/resume semantics are currently covered via controller behavior, but more explicit clock-level pause patterns are still possible if needed.
8. Phase 3: Introduce normalized runtime state and step extraction.
9. Completed: create a normalization layer that converts parsed workout content into ordered runtime steps with stable ids and source content indices. Parsed COMPACT input remains immutable while runtime progress is tracked in controller state.
10. Completed: model supported runtime step variants structurally, not as formatted strings: timed exercise, timed duration block, rep exercise, section, text, and unsupported content.
11. Completed: add extraction-oriented tests using parsed COMPACT examples to validate ordering, step labels, duration conversion, bilateral timing support, and section/text adjacency.
12. Phase 4: Implement the headless workout controller.
13. Completed: implement a controller class that owns mutable runtime state and exposes a subscription-based event API without importing React.
14. Partially completed: progression rules exist for starting the current step, pausing, resuming, stopping early, auto-completing on timer end, advancing through timed segments, starting/stopping/confirming rep sets one by one, moving to next exercise, and finishing the whole workout. Still missing: explicit restart-current-step semantics and richer in-flight edit semantics.
15. Completed for initial slice: emit typed domain events including `state-changed`, `step-started`, `step-completed`, `workout-completed`, and `countdown-threshold-reached`.
16. Completed for the current slice: workout plan edits are supported at runtime-plan level for insert, remove, move, replace, and supported field updates on timed and rep exercises without replacing the whole step.
17. Phase 5: Specify behavior with comprehensive unit tests.
18. Partially completed: tests exist for single timed exercise, repeated timed sets, stop at 2 seconds, set-based rep execution with start-stop-confirm and corrected actual reps, legacy one-shot rep completion, insert/remove/move/replace/update operations, and countdown threshold events. Still missing: dedicated bilateral-timed test, restart-after-finish tests, and update-current/future-step tests.
19. Partially completed: countdown threshold emission is covered. Still missing: assertions for completion payload shape and duplicate-event protection across pause/resume/restart flows.
20. Partially completed: rep-set runtime state for future UI rendering now exists headlessly (`activeRepSet`, elapsed time, set results), but derived snapshot coverage still needs dedicated tests.
21. Completed for initial slice: a top-level headless session controller can now orchestrate multiple parsed workouts, auto-advance to the next workout, and support previous/next workout navigation for future fullscreen keyboard/swipe UX.
22. Phase 6: Prepare the React integration seam without implementing the final fullscreen UI yet.
23. Partially completed: initial React-side integration now exists via a top-level `ActiveWorkoutSession` organism that binds the session controller to `ActiveDurationTimer` and `ActiveRepEditControls`. Still missing: thin reusable hooks, fullscreen/session input mapping, and broader control coverage.
24. In progress as an architectural rule: current ActiveDurationTimer is now usable inside the top-level organism, but it still contains legacy local runtime logic and remains a replacement target for future controller-driven presentation.
25. Phase 7: Verification and handoff.
26. Partially completed: focused controller tests and `ui/react` package build are green. Full repo test regression run is still pending.
27. Not started: migration note for replacing ActiveDurationTimer with a presentational view bound to controller state is still pending.

**Next Steps**
1. Put `ActiveWorkoutSession` into the demo/playground with at least two workouts so the full session flow can be validated visually.
2. Add shared session-level playback/debug speed control using `VirtualClock`, rather than keeping speed only in the standalone timer demo.
3. Add top-level keyboard mapping for previous/next workout and current-step start/stop so desktop fullscreen testing is possible immediately.
4. Add a thin fullscreen-oriented wrapper or mode around `ActiveWorkoutSession`, whichever is simpler for the first validation pass.
5. After the prototype is visible in UI, add bilateral timed exercise tests plus restart-after-finish tests to lock down the remaining workout state-machine edges.

**Relevant files**
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/components/molecules/ActiveDurationTimer.tsx` — current bug-prone React-local timer logic to treat as behavior reference, not as implementation base.
- `/Users/terotolonen/proj/realtrainer-compact/src/types.ts` — source-of-truth domain model for Workout, Content, Exercise, MeasuredDuration, Circuit, Pyramid, Move, Section, and Text.
- `/Users/terotolonen/proj/realtrainer-compact/test/exercise.test.ts` — unit test style reference and existing exercise parsing coverage.
- `/Users/terotolonen/proj/realtrainer-compact/test/parser.test.ts` — ordering and nested structure references for parsed COMPACT content.
- `/Users/terotolonen/proj/realtrainer-compact/vitest.config.ts` — confirms node-based Vitest setup for pure TypeScript engine tests.
- `/Users/terotolonen/proj/realtrainer-compact/data/minimonster.compact` — broad fixture source for mixed content and ordered workout progression cases.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/parsedRowMapping.ts` — existing flattening/normalization reference for UI-facing data mapping.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/controller/VirtualClock.ts` — implemented deterministic clock abstraction.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/controller/workout-controller-types.ts` — implemented engine state, commands, events, and step models.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/controller/WorkoutTimingController.ts` — implemented headless controller initial slice.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/controller/workout-session-controller-types.ts` — session-level state and event types for multi-workout orchestration.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/lib/controller/WorkoutSessionController.ts` — implemented top-level headless controller for multi-workout flows.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/components/organisms/ActiveWorkoutSession.tsx` — initial top-level React organism that renders active step controls over the session controller.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/test/controller/workout-timing-controller.test.ts` — implemented controller specification suite for the current slice.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/test/controller/workout-session-controller.test.ts` — focused top-level session controller tests for auto-advance and manual workout navigation.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/test/controller/virtual-clock.test.ts` — implemented virtual clock tests.
- `/Users/terotolonen/proj/realtrainer-compact/ui/react/src/components/organisms/ActiveWorkoutSession.test.tsx` — focused organism tests for timed-step rendering and workout navigation.

**Verification**
1. Completed: focused virtual clock tests pass in `ui/react` package.
2. Completed for the current slice: focused controller unit tests cover normalization, timed progression, stop-at-2s, non-timed completion, reorder/replace, insert/remove, countdown events, and multi-workout session auto-advance/navigation.
3. Partially completed: focused organism tests now cover top-level timed-step rendering and workout navigation in `ActiveWorkoutSession`.
4. Pending: extend verification to completion payloads, bilateral timing, restart-after-finish, current-step update semantics during active execution, session-level playback/debug flows, and the upcoming demo/fullscreen wrapper.
5. Pending: run `cd /Users/terotolonen/proj/realtrainer-compact && npm test` after the prototype slice stabilizes.
6. Pending: manually review the engine state shape against future React adapter needs after the first UI validation round, not before it.

**Decisions**
- Included scope: headless engine, virtual clock, normalized step extraction, runtime editing of supported steps, unit-test-first specification.
- Excluded from phase 1: React hook/UI implementation, fullscreen UX, speech/audio, browser APIs, persistence layer, and broad support for every nested COMPACT construct.
- Recommended initial support: ordered workouts containing standard Exercises with timed reps in seconds/minutes, including bilateral and repeated sets.
- Recommended initial event threshold: 10 seconds remaining for encouragement/countdown hooks, implemented as typed events rather than UI strings baked into the controller.
- Architecture rule: parsed COMPACT workout remains immutable input; mutable runtime state lives only inside the controller.

**Further Considerations**
1. Circuit and Pyramid support should probably be phase 2 unless explicitly included in phase 1.
2. The controller should expose both low-level commands and higher-level intents such as stopAndFinishCurrentStep so future UIs do not have to reimplement timing semantics.
3. If encouragement messaging should be testable but UI-agnostic, emit event reasons such as countdown-10s and let the UI map them to text later.
