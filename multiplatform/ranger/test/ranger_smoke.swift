import Foundation

func fail(_ message: String) -> Never {
    fputs("Ranger smoke (swift) failed: \(message)\n", stderr)
    exit(1)
}

func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
    if !condition() {
        fail(message)
    }
}

func allContent(_ doc: DocumentNode) -> [AstNode] {
    return doc.workouts.flatMap { $0.content }
}

func allExercises(_ doc: DocumentNode) -> [ExerciseNode] {
    return allContent(doc).compactMap { $0 as? ExerciseNode }
}

func workoutContent(_ workout: WorkoutNode) -> [AstNode] {
    return workout.content
}

func workoutExercises(_ workout: WorkoutNode) -> [ExerciseNode] {
    return workoutContent(workout).compactMap { $0 as? ExerciseNode }
}

func attemptSummary(_ attempt: ExerciseAttemptNode?) -> String {
    guard let attempt else { return "no-attempts" }

    var parts: [String] = []

    if let sets = attempt.sets {
        if let setsMax = attempt.setsMax {
            parts.append("\(sets)..\(setsMax) sets")
        } else {
            parts.append("\(sets) sets")
        }
    }

    if let reps = attempt.reps {
        if let repsMax = attempt.repsMax {
            parts.append("\(reps)..\(repsMax) reps")
        } else {
            parts.append("\(reps) reps")
        }
    }

    if let duration = attempt.duration {
        if let durationMax = attempt.durationMax {
            parts.append("\(duration)..\(durationMax) duration")
        } else {
            parts.append("\(duration) duration")
        }
    }

    if let distance = attempt.distance {
        if let distanceMax = distance.valueMax {
            parts.append("\(distance.value)..\(distanceMax)\(distance.unit)")
        } else {
            parts.append("\(distance.value)\(distance.unit)")
        }
    }

    if let loadValue = attempt.loadValue {
        parts.append("\(loadValue)\(attempt.loadUnit ?? "")")
    }

    if parts.isEmpty {
        return attempt.raw
    }

    return parts.joined(separator: ", ")
}

func exerciseSummary(_ exercise: ExerciseNode) -> String {
    return "\(exercise.name) -> \(attemptSummary(exercise.attempts.first))"
}

@main
struct RangerSwiftSmoke {
    static func main() {
        let cwd = FileManager.default.currentDirectoryPath
        let compactPath = cwd + "/data/minimonster-canonical.compact"

        guard let compact = try? String(contentsOfFile: compactPath, encoding: .utf8) else {
            fail("Could not read compact file at \(compactPath)")
        }

        let parsed = CompactAstParser.parseText(input: compact)
        expect(!parsed.workouts.isEmpty, "Expected workouts from minimonster-canonical.compact")

        let nodes = allContent(parsed)
        let timedRun = nodes.first {
            guard let move = $0 as? MoveNode else { return false }
            return move.sport == "Run" && (move.note ?? "").contains("41min34s 9km")
        } as? MoveNode

        expect(timedRun != nil, "Expected timed Run row")
        expect(timedRun?.duration == "41min34s", "Expected timed Run duration 41min34s")
        expect(timedRun?.durationQuantity?.unit == "s" && timedRun?.durationQuantity?.value == 2494, "Expected durationQuantity 2494s")

        let easyRun = nodes.first {
            guard let move = $0 as? MoveNode else { return false }
            return move.sport == "Run" && (move.note ?? "").contains("30min / 2min")
        } as? MoveNode

        expect(easyRun != nil, "Expected easy Run row")
        expect(easyRun?.durationQuantity?.unit == "min" && easyRun?.durationQuantity?.value == 30, "Expected easy Run durationQuantity 30min")
        expect(easyRun?.recoveryQuantity?.unit == "min" && easyRun?.recoveryQuantity?.value == 2, "Expected easy Run recoveryQuantity 2min")

        let loikatProbe = CompactAstParser.parseText(input: "[2026-05-06] ## Loikat Probe\nExercise Loikat (tasamaa ja ylämäki)|2-3x3-4x20-30m\n")
        let loikatExercise = allContent(loikatProbe).first {
            guard let ex = $0 as? ExerciseNode else { return false }
            return ex.name == "Loikat (tasamaa ja ylämäki)"
        } as? ExerciseNode

        expect(loikatExercise != nil, "Expected Loikat exercise node")
        let loikatAttempt = loikatExercise?.attempts.first
        expect(loikatAttempt != nil, "Expected one Loikat attempt")
        expect(loikatAttempt?.sets == 2 && loikatAttempt?.setsMax == 3, "Expected Loikat sets 2..3")
        expect(loikatAttempt?.reps == 3 && loikatAttempt?.repsMax == 4, "Expected Loikat reps 3..4")
        expect(loikatAttempt?.distance?.value == 20 && loikatAttempt?.distance?.valueMax == 30 && loikatAttempt?.distance?.unit == "m", "Expected Loikat distance 20..30m")

        let planPath = cwd + "/MINI_TRAINING_PLAN.compact"
        guard let planCompact = try? String(contentsOfFile: planPath, encoding: .utf8) else {
            fail("Could not read compact file at \(planPath)")
        }

        let planParsed = CompactAstParser.parseText(input: planCompact)
        let planWorkout = planParsed.workouts.first { $0.title == "Training Plan - Active Workout Content" }

        expect(planParsed.workouts.count >= 2, "Expected comment prelude plus one named workout from MINI_TRAINING_PLAN.compact")
        expect(planWorkout != nil, "Expected named training-plan workout from MINI_TRAINING_PLAN.compact")

        let planExercises = workoutExercises(planWorkout!)

        print("Ranger exercise summary (swift):")
        for exercise in planExercises.prefix(12) {
            print(" - \(exerciseSummary(exercise))")
        }

        expect(planExercises.count >= 20, "Expected at least 20 exercises from MINI_TRAINING_PLAN.compact")

        let takakyykky = planExercises.first { $0.name == "Takakyykky" }
        expect(takakyykky != nil, "Expected Takakyykky exercise in MINI_TRAINING_PLAN.compact")
        let takakyykkyAttempt = takakyykky?.attempts.first
        expect(takakyykkyAttempt != nil, "Expected Takakyykky to have one parsed attempt")
        expect(
            takakyykkyAttempt?.sets == 3 &&
            takakyykkyAttempt?.reps == 8 &&
            takakyykkyAttempt?.loadValue == 100 &&
                takakyykkyAttempt?.loadUnit?.hasPrefix("kg") == true,
            "Expected Takakyykky attempt 3x8@100kg"
        )

        let planLoikat = planExercises.first { $0.name == "Loikat (tasamaa ja ylämäki)" }
        expect(planLoikat != nil, "Expected Loikat range exercise in MINI_TRAINING_PLAN.compact")
        let planLoikatAttempt = planLoikat?.attempts.first
        expect(planLoikatAttempt != nil, "Expected parsed Loikat range attempt from MINI_TRAINING_PLAN.compact")
        expect(
            planLoikatAttempt?.sets == 2 &&
            planLoikatAttempt?.setsMax == 3 &&
            planLoikatAttempt?.reps == 3 &&
            planLoikatAttempt?.repsMax == 4 &&
            planLoikatAttempt?.distance?.value == 20 &&
            planLoikatAttempt?.distance?.valueMax == 30,
            "Expected MINI_TRAINING_PLAN Loikat attempt 2..3 x 3..4 x 20..30m"
        )

        let nameOnly = planExercises.first { $0.name == "Pelkkä nimi ilman speksejä" }
        expect(nameOnly != nil, "Expected name-only exercise in MINI_TRAINING_PLAN.compact")
        expect(nameOnly?.attempts.isEmpty == true, "Expected name-only exercise to keep empty attempts")

        print("Ranger smoke (swift) ok: workouts=\(parsed.workouts.count)")
    }
}
