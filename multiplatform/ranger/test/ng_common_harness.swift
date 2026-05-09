import Foundation

func fail(_ message: String) -> Never {
    fputs("NG common harness (swift) failed: \(message)\n", stderr)
    exit(1)
}

func expect(_ condition: @autoclosure () -> Bool, _ message: String) {
    if !condition() {
        fail(message)
    }
}

@main
struct NGCommonHarnessSwift {
    static func main() {
        let cwd = FileManager.default.currentDirectoryPath
        let specPath = cwd + "/multiplatform/ranger/test/ng_common_harness.ngtest"
        guard let specText = try? String(contentsOfFile: specPath, encoding: .utf8) else {
            fail("Could not read ngtest file at \(specPath)")
        }

        let runner = NGTestRunner.create()
        let errors = runner.runSpec(specText: specText)
        expect(errors.count == 0, errors.joined(separator: "\n"))

        print("NG common harness (swift) ok")
    }
}
