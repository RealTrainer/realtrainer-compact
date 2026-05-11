# Swift Module Snapshot

This directory contains generated Swift parser sources for reuse.

## Files

- `ng/token_detector_ng.swift`
- `common/ranger_swift_shims.swift`

## Compile example (NG)

```bash
swiftc \
  multiplatform/ranger/modules/swift/common/ranger_swift_shims.swift \
  multiplatform/ranger/modules/swift/ng/token_detector_ng.swift \
  your_app.swift \
  -o your_app
```

Note: current Ranger Swift output may still require shims and may not compile for all source variants yet.

## Parsing example (harness-style Swim + nested Split/Recovery)

Create `your_app.swift`:

```swift
import Foundation

func parseTokens(_ input: String) -> [TokenSlice] {
  let parser = Parser(source: input, detectors: StandardDetectors.create())
  parser.start()
  return parser.getResults()
}

func firstChild(_ token: TokenSlice, tag: String) -> TokenSlice? {
  for child in token.children where child.tag == tag {
    return child
  }
  return nil
}

@main
struct Demo {
  static func main() {
    let workout = """
    [2026-02-23] ## Uinti
    Swim; 400m
    > Split 100m 2:45/100m
    >> Recovery 1min
    """

    // Parsitaan koko blokki yhdellä kertaa, kuten harnessissa.
    let rows = parseTokens(workout)
    print("Row token count: \(rows.count)")

    // 0) Swim; 400m
    if rows.count > 0, let swimRB = firstChild(rows[0], tag: "repeat-block"), swimRB.hasRepeatBlockValue() {
      let swim = swimRB.getAsRepeatBlockValue()
      print("Swim distance value = \(swim.count)m")
    }

    // 1) > Split 100m 2:45/100m
    if rows.count > 1 {
      let splitRow = rows[1]
      if splitRow.childCount() > 0 {
        let levelToken = splitRow.getChild(index: 0)
        if levelToken.hasDetailsLevelValue() {
          let level = levelToken.getAsDetailsLevelValue()
          print("Split details level = \(level.level) marker=\(level.marker)")
        }
      }

      if splitRow.childCount() > 2 {
        let splitDistanceToken = splitRow.getChild(index: 2)
        if splitDistanceToken.hasRepeatBlockValue() {
          let d = splitDistanceToken.getAsRepeatBlockValue()
          print("Split distance value = \(d.count)m")
        }
      }

      if splitRow.childCount() > 3 {
        let speedToken = splitRow.getChild(index: 3)
        if speedToken.childCount() >= 3 {
          let tvToken = speedToken.getChild(index: 0)
          let dvToken = speedToken.getChild(index: 2)
          if tvToken.hasTimeValueValue(), dvToken.hasDistanceValue() {
            let tv = tvToken.getAsTimeValueValue()
            let dv = dvToken.getAsDistanceValue()
            print("Split pace value = \(tv.minutes):\(String(format: "%02d", tv.seconds))/\(dv.value)\(dv.unit)")
          }
        }
      }
    }

    // 2) >> Recovery 1min
    if rows.count > 2 {
      let recoveryRow = rows[2]
      if recoveryRow.childCount() > 0 {
        let levelToken = recoveryRow.getChild(index: 0)
        if levelToken.hasDetailsLevelValue() {
          let level = levelToken.getAsDetailsLevelValue()
          print("Recovery details level = \(level.level) marker=\(level.marker)")
        }
      }

      if recoveryRow.childCount() > 1 {
        let recToken = recoveryRow.getChild(index: 1)
        if recToken.hasRecoveryValue() {
          let rv = recToken.getAsRecoveryValue()
          print("Recovery label = \(rv.label)")
        }
        if recToken.childCount() > 1 {
          let rtToken = recToken.getChild(index: 1)
          if rtToken.hasRecoveryTimeValue() {
            let rt = rtToken.getAsRecoveryTimeValue()
            print("Recovery time value = \(rt.value)\(rt.unit)")
          }
        }
      }
    }
  }
}

/*
Expected style of output:
Row token count: 3
Swim distance value = 400m
Split details level = 1 marker=>
Split distance value = 100m
Split pace value = 2:45/100m
Recovery details level = 2 marker=>>
Recovery label = Recovery
Recovery time value = 1min
*/
```

Compile and run:

```bash
swiftc \
  multiplatform/ranger/modules/swift/common/ranger_swift_shims.swift \
  multiplatform/ranger/modules/swift/ng/token_detector_ng.swift \
  your_app.swift \
  -o your_app

./your_app
```
