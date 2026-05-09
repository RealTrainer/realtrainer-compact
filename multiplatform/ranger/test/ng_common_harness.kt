private fun fail(message: String): Nothing {
    System.err.println("NG common harness (kotlin) failed: $message")
    throw RuntimeException(message)
}

private fun expect(condition: Boolean, message: String) {
    if (!condition) fail(message)
}

fun main() {
    val cwd = java.io.File(".").canonicalFile
    val specPath = java.io.File(cwd, "multiplatform/ranger/test/ng_common_harness.ngtest")
    val specText = specPath.readText(Charsets.UTF_8)

    val runner = NGTestRunner.create()
    val errors = runner.runSpec(specText)
    expect(errors.isEmpty(), errors.joinToString("\n"))

    val jsonRows = runner.exportJson(specText)
    val outDir = java.io.File(cwd, "multiplatform/ranger/dist/ng-kotlin/json")
    outDir.mkdirs()
    for (row in jsonRows) {
        val parts = row.split("\t", limit = 2)
        if (parts.size == 2) {
            java.io.File(outDir, parts[0]).writeText(parts[1], Charsets.UTF_8)
        }
    }

    println("NG common harness (kotlin) ok")
}
