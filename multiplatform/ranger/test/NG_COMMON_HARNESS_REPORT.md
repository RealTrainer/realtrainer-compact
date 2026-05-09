# NG Common Harness Report

Generated at: 2026-05-09T20:16:56.838Z
Spec: multiplatform/ranger/test/ng_common_harness.ngtest

## Target Runs

| Target | Script | Status | Exit Code |
| --- | --- | --- | --- |
| JavaScript | ranger:ng:common:test | pass | 0 |
| Kotlin | ranger:ng:test:kotlin | pass | 0 |
| Swift | ranger:ng:test:swift | pass | 0 |

## Case Results (JS NGTestRunner)

Summary: 34 pass, 0 fail, 34 total

| # | Input | Status | Notes |
| --- | --- | --- | --- |
| 1 | 0012 | pass |  |
| 2 | 10.4kg | pass |  |
| 3 | 10:10 start | pass |  |
| 4 | 2026-01-01 | pass |  |
| 5 | 2026-01-01T08:00:00 | pass |  |
| 6 | /10s rest | pass |  |
| 7 | 2:50/100m | pass |  |
| 8 | 10x squat | pass |  |
| 9 | 100kg bench | pass |  |
| 10 | 100m run | pass |  |
| 11 | 10-50 reps | pass |  |
| 12 | 2-3x15-20@bw | pass |  |
| 13 | 2-3x15-20x50kg | pass |  |
| 14 | 100-200m target | pass |  |
| 15 | 100m-200m target | pass |  |
| 16 | 3AM wake | pass |  |
| 17 | > note | pass |  |
| 18 | # Morning Run\\nnext | pass |  |
| 19 | 120bpm zone2 | pass |  |
| 20 | 120kcal | pass |  |
| 21 | 70% load | pass |  |
| 22 | 40-50% | pass |  |
| 23 | 40%-40% | pass |  |
| 24 | 1RM test | pass |  |
| 25 | 5RM test | pass |  |
| 26 | Zone1 easy | pass |  |
| 27 | Zone2 easy | pass |  |
| 28 | I easy | pass |  |
| 29 | II easy | pass |  |
| 30 | III easy | pass |  |
| 31 | IV easy | pass |  |
| 32 | V easy | pass |  |
| 33 | 2026-05-09\\n2026-05-10 | pass |  |
| 34 | 2026-05-09T14:30+02:00 | pass |  |

## Raw Output (truncated)

### JavaScript

```text
> realtrainer-compact@1.0.15 ranger:ng:common:test
> npm run ranger:ng:build && npm run ranger:ng:detector:build && npm run ranger:ng:parser:build && node multiplatform/ranger/test/ng_common_harness.mjs


> realtrainer-compact@1.0.15 ranger:ng:build
> cd multiplatform/ranger && mkdir -p dist/ng && ranger-compiler -es6 -nodemodule ./src/ng/token_slice.rgr -o=token_slice.cjs && (test -f ./src/ng/bin/token_slice.cjs && cp ./src/ng/bin/token_slice.cjs ./dist/ng/token_slice.cjs || (test -f ./src/ng/bin/token_slice.js && cp ./src/ng/bin/token_slice.js ./dist/ng/token_slice.cjs || (test -f ./token_slice.cjs && cp ./token_slice.cjs ./dist/ng/token_slice.cjs || (test -f ./token_slice.js && cp ./token_slice.js ./dist/ng/token_slice.cjs))))


* Ranger Compiler v3.0.0-beta.1

  Input:  ./src/ng/token_slice.rgr
  Output: token_slice.cjs
  Target: JavaScript (ES6)

─────────────────────────────────────────────────────

Livecompiler starting with language => es6
[1/5] Collecting methods...
[2/5] Analyzing code...
[3/5] Type checking...
[4/5] Generating code...
[5/5] Writing output...

─────────────────────────────────────────────────────

[OK] Compilation successful!

  Output: /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/src/ng/bin/token_slice.cjs
  Time:   75ms

Saving results to path : /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/src/ng/bin

> realtrainer-compact@1.0.15 ranger:ng:detector:build
> cd multiplatform/ranger && ranger-compiler -es6 -nodemodule ./src/ng/TokenDetectorModule.rgr -o=token_detector.cjs


* Ranger Compiler v3.0.0-beta.1

  Input:  ./src/ng/TokenDetectorModule.rgr
  Output: token_detector.cjs
  Target: JavaScript (ES6)

─────────────────────────────────────────────────────

Livecompiler starting with language => es6
[1/5] Collecting methods...
[2/5] Analyzing code...
[3/5] Type checking...
[4/5] Generating code...
[5/5] Writing output...

─────────────────────────────────────────────────────

[OK] Compilation successful!

  Output: /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/src/ng/bin/token_detector.cjs
  Time:   160ms

Saving results to path : /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/src/ng/bin

> realtrainer-compact@1.0.15 ranger:ng:parser:build
> cd multiplatform/ranger && ranger-compiler -es6 -nodemodule ./src/ng/Parser.rgr -o=parser.cjs


* Ranger Compiler v3.0.0-beta.1

  Input:  ./src/ng/Parser.rgr
  Output: parser.cjs
  Target: JavaScript (ES6)

─────────────────────────────────────────────────────

Livecompiler starting with language => es6
[1/5] Collecting methods...
[2/5] Analyzing code...
[3/5] Type checking...
[4/5] Generating code...
[5/5] Writing output...

─────────────────────────────────────────────────────

[OK] Compilation successful!

  Output: /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/src/ng/bin/parser.cjs
  Time:   66ms

Saving results to path : /Users/terotolonen/proj/realtrainer-compact/multiplatform/rang
... (truncated)
```

### Kotlin

```text
> realtrainer-compact@1.0.15 ranger:ng:test:kotlin
> npm run ranger:ng:build:kotlin && (command -v kotlinc >/dev/null && kotlinc multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt multiplatform/ranger/test/ng_common_harness.kt -include-runtime -d multiplatform/ranger/dist/ng-kotlin/ng_common_harness.jar && java -jar multiplatform/ranger/dist/ng-kotlin/ng_common_harness.jar || (echo 'kotlinc not found; generated Kotlin NG sources and harness only' && exit 0))


> realtrainer-compact@1.0.15 ranger:ng:build:kotlin
> cd multiplatform/ranger && mkdir -p dist/ng-kotlin && ranger-compiler ./src/ng/TokenDetectorModule.rgr -l=kotlin -d=./dist/ng-kotlin -o=token_detector_ng.kt


* Ranger Compiler v3.0.0-beta.1

  Input:  ./src/ng/TokenDetectorModule.rgr
  Output: token_detector_ng.kt
  Target: Kotlin

─────────────────────────────────────────────────────

Livecompiler starting with language => kotlin
[1/5] Collecting methods...
[2/5] Analyzing code...
[3/5] Type checking...
[4/5] Generating code...
[5/5] Writing output...

─────────────────────────────────────────────────────

[OK] Compilation successful!

  Output: /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt
  Time:   151ms

Saving results to path : /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/dist/ng-kotlin
NG common harness (kotlin) ok
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:37:3: warning: 'open' has no effect on a final class.
  open fun  length() : Int {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:41:3: warning: 'open' has no effect on a final class.
  open fun  childCount() : Int {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:45:3: warning: 'open' has no effect on a final class.
  open fun  addChild( child : TokenSlice) : Unit {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:49:3: warning: 'open' has no effect on a final class.
  open fun  getChild( index : Int) : TokenSlice {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:53:3: warning: 'open' has no effect on a final class.
  open fun  isEmpty() : Boolean {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:57:3: warning: 'open' has no effect on a final class.
  open fun  hasValue() : Boolean {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:65:3: warning: 'open' has no effect on a final class.
  open fun  charCodeAt( index : Int) : Int {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:75:3: warning: 'open' has no effect on a final class.
  open fun  hasInteger( from : Int, to : Int) : Boolean {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:99:3: warning: 'open' has no effect on a final class.
  open fun  parseInteger( from : Int, to : Int) : Int {
  ^^^^
multiplatform/ranger/dist/ng-kotlin/token_detector_ng.kt:114:3: warning: 'open' has no effect on a final class.
  open fun  hasDouble( from : Int, to : Int) : Boole
... (truncated)
```

### Swift

```text
> realtrainer-compact@1.0.15 ranger:ng:test:swift
> npm run ranger:ng:build:swift && (swiftc multiplatform/ranger/test/ranger_swift_shims.swift multiplatform/ranger/dist/ng-swift/token_detector_ng.swift multiplatform/ranger/test/ng_common_harness.swift -o multiplatform/ranger/dist/ng-swift/ng_common_harness && ./multiplatform/ranger/dist/ng-swift/ng_common_harness || (echo 'Swift compile currently fails with Ranger-generated NG source for this target. NG harness source exists in multiplatform/ranger/test/ng_common_harness.swift.' && exit 0))


> realtrainer-compact@1.0.15 ranger:ng:build:swift
> cd multiplatform/ranger && mkdir -p dist/ng-swift && ranger-compiler ./src/ng/TokenDetectorModule.rgr -l=swift6 -d=./dist/ng-swift -o=token_detector_ng.swift


* Ranger Compiler v3.0.0-beta.1

  Input:  ./src/ng/TokenDetectorModule.rgr
  Output: token_detector_ng.swift
  Target: Swift 6

─────────────────────────────────────────────────────

Livecompiler starting with language => swift6
[1/5] Collecting methods...
[2/5] Analyzing code...
[3/5] Type checking...
[4/5] Generating code...
[5/5] Writing output...

─────────────────────────────────────────────────────

[OK] Compilation successful!

  Output: /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/dist/ng-swift/token_detector_ng.swift
  Time:   139ms

Saving results to path : /Users/terotolonen/proj/realtrainer-compact/multiplatform/ranger/dist/ng-swift
NG common harness (swift) ok
multiplatform/ranger/dist/ng-swift/token_detector_ng.swift:1048:9: warning: variable 'parts' was never mutated; consider changing to 'let' constant
1046 |       return self.noMatch();
1047 |     }
1048 |     var parts : [TokenSlice] = p.getResults()
     |         `- warning: variable 'parts' was never mutated; consider changing to 'let' constant
1049 |     let first : TokenSlice = parts[0]
1050 |     let second : TokenSlice = parts[1]

multiplatform/ranger/dist/ng-swift/token_detector_ng.swift:1357:9: warning: variable 'parts' was never mutated; consider changing to 'let' constant
1355 |       return self.noMatch();
1356 |     }
1357 |     var parts : [TokenSlice] = p.getResults()
     |         `- warning: variable 'parts' was never mutated; consider changing to 'let' constant
1358 |     let first : TokenSlice = parts[0]
1359 |     let second : TokenSlice = parts[1]

multiplatform/ranger/dist/ng-swift/token_detector_ng.swift:1406:9: warning: variable 'parts' was never mutated; consider changing to 'let' constant
1404 |       return self.noMatch();
1405 |     }
1406 |     var parts : [TokenSlice] = p.getResults()
     |         `- warning: variable 'parts' was never mutated; consider changing to 'let' constant
1407 |     let first : TokenSlice = parts[0]
1408 |     let second : TokenSlice = parts[1]

multiplatform/ranger/dist/ng-swift/token_detector_ng.swift:1541:9: warning: variable 'parts' was never mutated; consider changing to 'let' constant
1539 |       return self.noMatch();
1540 |     }
1541 |     var
... (truncated)
```

