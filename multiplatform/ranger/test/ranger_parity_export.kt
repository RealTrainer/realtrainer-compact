import java.io.File

fun main(args: Array<String>) {
    val inputPath = args.getOrNull(0) ?: "MINI_TRAINING_PLAN.compact"
    val outputPath = args.getOrNull(1) ?: "multiplatform/ranger/dist/parity/ranger_target_kotlin.json"

    val compact = File(inputPath).readText(Charsets.UTF_8)
    val parsed = CompactAstParser.parseText(compact)

    val outputFile = File(outputPath)
    outputFile.parentFile?.mkdirs()
    outputFile.writeText(parsed.toJSONString() + "\n", Charsets.UTF_8)

    println("Wrote parity JSON (kotlin): ${outputFile.path}")
    println("Workouts: ${parsed.workouts.size}")
}