import Foundation

@main
struct RangerParityExport {
    static func main() {
        let inputPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "MINI_TRAINING_PLAN.compact"
        let outputPath = CommandLine.arguments.count > 2 ? CommandLine.arguments[2] : "multiplatform/ranger/dist/parity/ranger_target_swift.json"

        guard let compact = try? String(contentsOfFile: inputPath, encoding: .utf8) else {
            fputs("Failed to read compact input at \(inputPath)\n", stderr)
            exit(1)
        }

        let parsed = CompactAstParser.parseText(input: compact)

        let outputURL = URL(fileURLWithPath: outputPath)
        try? FileManager.default.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)

        do {
            try (parsed.toJSONString() + "\n").write(to: outputURL, atomically: true, encoding: .utf8)
            print("Wrote parity JSON (swift): \(outputPath)")
            print("Workouts: \(parsed.workouts.count)")
        } catch {
            fputs("Failed to write parity JSON: \(error)\n", stderr)
            exit(1)
        }
    }
}