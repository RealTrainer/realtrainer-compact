# JavaScript Module Snapshot

This directory contains generated JavaScript parser modules for reuse.

## Files

- `ng/token_slice.cjs`
- `ng/token_detector.cjs`
- `ng/parser.cjs`

## Example (NG, value-focused)

```javascript
const { Parser, StandardDetectors } = require('./ng/token_detector.cjs');

function parseTokens(input) {
	const p = new Parser(input, StandardDetectors.create());
	p.start();
	return p.getResults();
}

function firstChild(token, tag) {
	for (let i = 0; i < token.childCount(); i += 1) {
		const child = token.getChild(i);
		if (child.tag === tag) return child;
	}
	return null;
}

const workout = [
	'[2026-02-23] ## Uinti',
	'Swim; 400m',
	'> Split 100m 2:45/100m',
	'>> Recovery 1min',
].join('\n');

// Parse whole block at once (same style as ng_common_harness)
const rows = parseTokens(workout);
console.log('Row token count =', rows.length);

// 0) Swim; 400m -> repeat-block value
if (rows.length > 0) {
	const swimRB = firstChild(rows[0], 'repeat-block');
	if (swimRB && swimRB.hasRepeatBlockValue()) {
		const swim = swimRB.getAsRepeatBlockValue();
		console.log(`Swim distance value = ${swim.count}m`);
	}
}

// 1) > Split 100m 2:45/100m -> details-level + distance + pace values
if (rows.length > 1) {
	const splitRow = rows[1];

	if (splitRow.childCount() > 0) {
		const levelToken = splitRow.getChild(0);
		if (levelToken.hasDetailsLevelValue()) {
			const level = levelToken.getAsDetailsLevelValue();
			console.log(`Split details level = ${level.level} marker=${level.marker}`);
		}
	}

	if (splitRow.childCount() > 2) {
		const splitDistanceToken = splitRow.getChild(2);
		if (splitDistanceToken.hasRepeatBlockValue()) {
			const d = splitDistanceToken.getAsRepeatBlockValue();
			console.log(`Split distance value = ${d.count}m`);
		}
	}

	if (splitRow.childCount() > 3) {
		const speedToken = splitRow.getChild(3);
		if (speedToken.childCount() >= 3) {
			const tvToken = speedToken.getChild(0);
			const dvToken = speedToken.getChild(2);
			if (tvToken.hasTimeValueValue() && dvToken.hasDistanceValue()) {
				const tv = tvToken.getAsTimeValueValue();
				const dv = dvToken.getAsDistanceValue();
				const sec = String(tv.seconds).padStart(2, '0');
				console.log(`Split pace value = ${tv.minutes}:${sec}/${dv.value}${dv.unit}`);
			}
		}
	}
}

// 2) >> Recovery 1min -> details-level + recovery label + recovery-time value
if (rows.length > 2) {
	const recoveryRow = rows[2];

	if (recoveryRow.childCount() > 0) {
		const levelToken = recoveryRow.getChild(0);
		if (levelToken.hasDetailsLevelValue()) {
			const level = levelToken.getAsDetailsLevelValue();
			console.log(`Recovery details level = ${level.level} marker=${level.marker}`);
		}
	}

	if (recoveryRow.childCount() > 1) {
		const recToken = recoveryRow.getChild(1);
		if (recToken.hasRecoveryValue()) {
			const rv = recToken.getAsRecoveryValue();
			console.log(`Recovery label = ${rv.label}`);
		}
		if (recToken.childCount() > 1) {
			const rtToken = recToken.getChild(1);
			if (rtToken.hasRecoveryTimeValue()) {
				const rt = rtToken.getAsRecoveryTimeValue();
				console.log(`Recovery time value = ${rt.value}${rt.unit}`);
			}
		}
	}
}

/*
Expected style of output:
Row token count = 3
Swim distance value = 400m
Split details level = 1 marker=>
Split distance value = 100m
Split pace value = 2:45/100m
Recovery details level = 2 marker=>>
Recovery label = Recovery
Recovery time value = 1min
*/
```
