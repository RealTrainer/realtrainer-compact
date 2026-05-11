# Kotlin Module Snapshot

This directory contains generated Kotlin parser sources for reuse.

## Files

- `ng/token_detector_ng.kt`
- `common/org_json_shims.kt`

## Compile example (NG)

```bash
kotlinc \
  multiplatform/ranger/modules/kotlin/common/org_json_shims.kt \
  multiplatform/ranger/modules/kotlin/ng/token_detector_ng.kt \
  your_app.kt \
  -include-runtime -d your_app.jar
```

Run:

```bash
java -jar your_app.jar
```

## Parsing example (harness-style Swim + nested Split/Recovery)

Create `your_app.kt`:

```kotlin
fun parseTokens(input: String): List<TokenSlice> {
  val parser = Parser(input, StandardDetectors.create())
  parser.start()
  return parser.getResults()
}

fun firstChild(token: TokenSlice, tag: String): TokenSlice? {
  for (i in 0 until token.childCount()) {
    val child = token.getChild(i)
    if (child.tag == tag) return child
  }
  return null
}

fun main() {
  val workout = """
    [2026-02-23] ## Uinti
    Swim; 400m
    > Split 100m 2:45/100m
    >> Recovery 1min
  """.trimIndent()

  // Parsitaan koko blokki yhdellä kertaa, kuten harnessissa.
  val rows = parseTokens(workout)
  println("Row token count: ${rows.size}")

  // 0) Swim; 400m
  if (rows.size > 0) {
    val swimRB = firstChild(rows[0], "repeat-block")
    if (swimRB != null && swimRB.hasRepeatBlockValue()) {
      val swim = swimRB.getAsRepeatBlockValue()
      println("Swim distance value = ${swim.count}m")
    }
  }

  // 1) > Split 100m 2:45/100m
  if (rows.size > 1) {
    val splitRow = rows[1]
    if (splitRow.childCount() > 0) {
      val levelToken = splitRow.getChild(0)
      if (levelToken.hasDetailsLevelValue()) {
        val level = levelToken.getAsDetailsLevelValue()
        println("Split details level = ${level.level} marker=${level.marker}")
      }
    }

    if (splitRow.childCount() > 2) {
      val splitDistanceToken = splitRow.getChild(2)
      if (splitDistanceToken.hasRepeatBlockValue()) {
        val d = splitDistanceToken.getAsRepeatBlockValue()
        println("Split distance value = ${d.count}m")
      }
    }

    if (splitRow.childCount() > 3) {
      val speedToken = splitRow.getChild(3)
      if (speedToken.childCount() >= 3) {
        val tvToken = speedToken.getChild(0)
        val dvToken = speedToken.getChild(2)
        if (tvToken.hasTimeValueValue() && dvToken.hasDistanceValue()) {
          val tv = tvToken.getAsTimeValueValue()
          val dv = dvToken.getAsDistanceValue()
          println("Split pace value = %d:%02d/%d%s".format(tv.minutes, tv.seconds, dv.value, dv.unit))
        }
      }
    }
  }

  // 2) >> Recovery 1min
  if (rows.size > 2) {
    val recoveryRow = rows[2]
    if (recoveryRow.childCount() > 0) {
      val levelToken = recoveryRow.getChild(0)
      if (levelToken.hasDetailsLevelValue()) {
        val level = levelToken.getAsDetailsLevelValue()
        println("Recovery details level = ${level.level} marker=${level.marker}")
      }
    }

    if (recoveryRow.childCount() > 1) {
      val recToken = recoveryRow.getChild(1)
      if (recToken.hasRecoveryValue()) {
        val rv = recToken.getAsRecoveryValue()
        println("Recovery label = ${rv.label}")
      }
      if (recToken.childCount() > 1) {
        val rtToken = recToken.getChild(1)
        if (rtToken.hasRecoveryTimeValue()) {
          val rt = rtToken.getAsRecoveryTimeValue()
          println("Recovery time value = ${rt.value}${rt.unit}")
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
kotlinc \
  multiplatform/ranger/modules/kotlin/common/org_json_shims.kt \
  multiplatform/ranger/modules/kotlin/ng/token_detector_ng.kt \
  your_app.kt \
  -include-runtime -d your_app.jar

java -jar your_app.jar
```
