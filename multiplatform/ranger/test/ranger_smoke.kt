private fun fail(message: String): Nothing {
    System.err.println("Ranger smoke (kotlin) failed: $message")
    throw RuntimeException(message)
}

private fun expect(condition: Boolean, message: String) {
    if (!condition) fail(message)
}

private fun allContent(doc: DocumentNode): List<AstNode> =
    doc.workouts.flatMap { it.content }

private fun allExercises(doc: DocumentNode): List<ExerciseNode> =
    allContent(doc).mapNotNull { it as? ExerciseNode }

private fun workoutContent(workout: WorkoutNode): List<AstNode> = workout.content

private fun workoutExercises(workout: WorkoutNode): List<ExerciseNode> =
    workoutContent(workout).mapNotNull { it as? ExerciseNode }

private fun attemptSummary(attempt: ExerciseAttemptNode?): String {
    if (attempt == null) return "no-attempts"

    val parts = mutableListOf<String>()

    if (attempt.sets != null) {
        val setsText = if (attempt.setsMax != null) "${attempt.sets}..${attempt.setsMax}" else "${attempt.sets}"
        parts += "$setsText sets"
    }
    if (attempt.reps != null) {
        val repsText = if (attempt.repsMax != null) "${attempt.reps}..${attempt.repsMax}" else "${attempt.reps}"
        parts += "$repsText reps"
    }
    if (attempt.duration != null) {
        val durationText = if (attempt.durationMax != null) "${attempt.duration}..${attempt.durationMax}" else attempt.duration
        parts += "$durationText duration"
    }
    if (attempt.distance != null) {
        val distance = attempt.distance!!
        val distanceText = if (distance.valueMax != null) "${distance.value}..${distance.valueMax}${distance.unit}" else "${distance.value}${distance.unit}"
        parts += distanceText
    }
    if (attempt.loadValue != null) {
        parts += "${attempt.loadValue}${attempt.loadUnit ?: ""}"
    }

    return if (parts.isEmpty()) attempt.raw else parts.joinToString(", ")
}

private fun exerciseSummary(exercise: ExerciseNode): String =
    "${exercise.name} -> ${attemptSummary(exercise.attempts.firstOrNull())}"

fun main() {
    val compactPath = "data/minimonster-canonical.compact"
    val compact = java.io.File(compactPath).readText(Charsets.UTF_8)

    val parsed = CompactAstParser.parseText(compact)
    expect(parsed.workouts.isNotEmpty(), "Expected workouts from minimonster-canonical.compact")

    val nodes = allContent(parsed)
    val timedRun = nodes
        .mapNotNull { it as? MoveNode }
        .firstOrNull { it.sport == "Run" && (it.note ?: "").contains("41min34s 9km") }

    expect(timedRun != null, "Expected timed Run row")
    expect(timedRun?.duration == "41min34s", "Expected timed Run duration 41min34s")
    expect(timedRun?.durationQuantity?.unit == "s" && timedRun.durationQuantity?.value == 2494.0, "Expected durationQuantity 2494s")

    val easyRun = nodes
        .mapNotNull { it as? MoveNode }
        .firstOrNull { it.sport == "Run" && (it.note ?: "").contains("30min / 2min") }

    expect(easyRun != null, "Expected easy Run row")
    expect(easyRun?.durationQuantity?.unit == "min" && easyRun.durationQuantity?.value == 30.0, "Expected easy Run durationQuantity 30min")
    expect(easyRun?.recoveryQuantity?.unit == "min" && easyRun.recoveryQuantity?.value == 2.0, "Expected easy Run recoveryQuantity 2min")

    val loikatProbe = CompactAstParser.parseText("""
        [2026-05-06] ## Loikat Probe
        Exercise Loikat (tasamaa ja ylämäki)|2-3x3-4x20-30m
    """.trimIndent() + "\n")

    val loikatExercise = allContent(loikatProbe)
        .mapNotNull { it as? ExerciseNode }
        .firstOrNull { it.name == "Loikat (tasamaa ja ylämäki)" }

    expect(loikatExercise != null, "Expected Loikat exercise node")
    val loikatAttempt = loikatExercise?.attempts?.firstOrNull()
    expect(loikatAttempt != null, "Expected one Loikat attempt")
    expect(loikatAttempt?.sets == 2 && loikatAttempt?.setsMax == 3, "Expected Loikat sets 2..3")
    expect(loikatAttempt?.reps == 3 && loikatAttempt?.repsMax == 4, "Expected Loikat reps 3..4")
    expect(
        loikatAttempt?.distance?.value == 20.0 && loikatAttempt.distance?.valueMax == 30.0 && loikatAttempt.distance?.unit == "m",
        "Expected Loikat distance 20..30m",
    )

    val planPath = "MINI_TRAINING_PLAN.compact"
    val planCompact = java.io.File(planPath).readText(Charsets.UTF_8)
    val planParsed = CompactAstParser.parseText(planCompact)
    val planWorkout = planParsed.workouts.firstOrNull { it.title == "Training Plan - Active Workout Content" }

    expect(planParsed.workouts.size >= 2, "Expected comment prelude plus one named workout from MINI_TRAINING_PLAN.compact")
    expect(planWorkout != null, "Expected named training-plan workout from MINI_TRAINING_PLAN.compact")

    val planExercises = workoutExercises(planWorkout!!)

    println("Ranger exercise summary (kotlin):")
    planExercises.take(12).forEach { exercise ->
        println(" - ${exerciseSummary(exercise)}")
    }

    expect(planExercises.size >= 20, "Expected at least 20 exercises from MINI_TRAINING_PLAN.compact")

    val takakyykky = planExercises.firstOrNull { it.name == "Takakyykky" }
    expect(takakyykky != null, "Expected Takakyykky exercise in MINI_TRAINING_PLAN.compact")
    val takakyykkyAttempt = takakyykky?.attempts?.firstOrNull()
    expect(takakyykkyAttempt != null, "Expected Takakyykky to have one parsed attempt")
    expect(
        takakyykkyAttempt?.sets == 3 &&
            takakyykkyAttempt.reps == 8 &&
            takakyykkyAttempt.loadValue == 100.0 &&
            (takakyykkyAttempt.loadUnit?.startsWith("kg") == true),
        "Expected Takakyykky attempt 3x8@100kg",
    )

    val planLoikat = planExercises.firstOrNull { it.name == "Loikat (tasamaa ja ylämäki)" }
    expect(planLoikat != null, "Expected Loikat range exercise in MINI_TRAINING_PLAN.compact")
    val planLoikatAttempt = planLoikat?.attempts?.firstOrNull()
    expect(planLoikatAttempt != null, "Expected parsed Loikat range attempt from MINI_TRAINING_PLAN.compact")
    expect(
        planLoikatAttempt?.sets == 2 &&
            planLoikatAttempt.setsMax == 3 &&
            planLoikatAttempt.reps == 3 &&
            planLoikatAttempt.repsMax == 4 &&
            planLoikatAttempt.distance?.value == 20.0 &&
            planLoikatAttempt.distance?.valueMax == 30.0,
        "Expected MINI_TRAINING_PLAN Loikat attempt 2..3 x 3..4 x 20..30m",
    )

    val nameOnly = planExercises.firstOrNull { it.name == "Pelkkä nimi ilman speksejä" }
    expect(nameOnly != null, "Expected name-only exercise in MINI_TRAINING_PLAN.compact")
    expect(nameOnly?.attempts?.isEmpty() == true, "Expected name-only exercise to keep empty attempts")

    println("Ranger smoke (kotlin) ok: workouts=${parsed.workouts.size}")
}
