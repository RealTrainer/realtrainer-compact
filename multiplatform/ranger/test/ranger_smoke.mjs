import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const modulePath = resolve(process.cwd(), 'multiplatform/ranger/dist/index.cjs');
const { CompactAstParser } = require(modulePath);

const bigCompact = readFileSync(resolve(process.cwd(), 'data/minimonster-canonical.compact'), 'utf8');
const parsed = CompactAstParser.parseText(bigCompact);

if (!parsed || !Array.isArray(parsed.workouts)) {
  throw new Error('Ranger parser did not return a workouts array');
}

if (parsed.workouts.length === 0) {
  throw new Error('Expected at least one workout from minimonster-canonical.compact');
}

const hasAnyRun = parsed.workouts.some((w) =>
  Array.isArray(w.content) && w.content.some((item) => item && item.type === 'move'),
);
if (!hasAnyRun) {
  throw new Error('Expected to parse at least one move node from minimonster-canonical.compact');
}

const timedRunNode = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'move' && item?.sport === 'Run' && (item?.note || '').includes('41min34s 9km'));
if (!timedRunNode) {
  throw new Error('Expected timed Run row (41min34s 9km) to exist');
}
if (timedRunNode.duration !== '41min34s') {
  throw new Error(`Expected timed Run duration to be 41min34s, got: ${timedRunNode.duration}`);
}
if (timedRunNode?.durationQuantity?.unit !== 's' || timedRunNode?.durationQuantity?.value !== 2494) {
  throw new Error(
    `Expected timed Run durationQuantity to be 2494s, got: ${JSON.stringify(timedRunNode?.durationQuantity)}`,
  );
}

const easyRunNode = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'move' && item?.sport === 'Run' && (item?.note || '').includes('30min / 2min'));
if (!easyRunNode) {
  throw new Error('Expected easy Run row (30min / 2min) to exist');
}
if (easyRunNode?.durationQuantity?.unit !== 'min' || easyRunNode?.durationQuantity?.value !== 30) {
  throw new Error(
    `Expected easy Run durationQuantity to be 30min, got: ${JSON.stringify(easyRunNode?.durationQuantity)}`,
  );
}
if (easyRunNode?.recoveryQuantity?.unit !== 'min' || easyRunNode?.recoveryQuantity?.value !== 2) {
  throw new Error(
    `Expected easy Run recoveryQuantity to be 2min, got: ${JSON.stringify(easyRunNode?.recoveryQuantity)}`,
  );
}
if (easyRunNode?.hrQuantity?.unit !== 'bpm' || easyRunNode?.hrQuantity?.value !== 120 || easyRunNode?.hrQuantity?.valueMax !== 150) {
  throw new Error(`Expected easy Run hrQuantity to be 120-150bpm, got: ${JSON.stringify(easyRunNode?.hrQuantity)}`);
}

const ropeNode = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'exercise' && item?.name === 'naruhyppely');
if (!ropeNode) {
  throw new Error('Expected Lift naruhyppely row to parse as exercise node');
}
if (!Array.isArray(ropeNode.repsSeries) || ropeNode.repsSeries.length !== 7) {
  throw new Error('Expected naruhyppely repsSeries to contain 7 values');
}
if (ropeNode.repsSeries.join(',') !== '10,20,30,40,30,20,10') {
  throw new Error(`Unexpected naruhyppely repsSeries: ${ropeNode.repsSeries.join(',')}`);
}

const contactsNodes = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .filter((item) => item?.type === 'contacts');
const contactsA = contactsNodes.find((item) => (item?.text || '').startsWith('5x10'));
if (!contactsA || contactsA?.repeats?.sets !== 5 || contactsA?.repeats?.reps !== 10) {
  throw new Error('Expected Contacts 5x10 to parse repeats as sets=5, reps=10');
}
const contactsB = contactsNodes.find((item) => (item?.text || '').startsWith('30-80'));
if (!contactsB || contactsB?.repeats?.reps !== 30 || contactsB?.repeats?.repsMax !== 80) {
  throw new Error('Expected Contacts 30-80 to parse repeats range as reps=30..80');
}
const contactsC = contactsNodes.find((item) => (item?.text || '').startsWith('200|'));
if (!contactsC || contactsC?.repeats?.reps !== 200) {
  throw new Error('Expected Contacts 200 to parse repeats as reps=200');
}
if (contactsC?.comment !== 'loikat tasamaa') {
  throw new Error(`Expected Contacts comment to parse as "loikat tasamaa", got: ${contactsC?.comment}`);
}

const durationNodes = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .filter((item) => item?.type === 'duration');
const durationRange = durationNodes.find((item) => (item?.text || '').startsWith('30-60min'));
if (!durationRange) {
  throw new Error('Expected Time 30-60min row to parse as duration node');
}
if (durationRange?.durationQuantity?.unit !== 'min' || durationRange?.durationQuantity?.value !== 30 || durationRange?.durationQuantity?.valueMax !== 60) {
  throw new Error(
    `Expected duration range quantity 30-60min, got: ${JSON.stringify(durationRange?.durationQuantity)}`,
  );
}
if (durationRange?.comment !== 'aikaväli') {
  throw new Error(`Expected duration comment to be aikaväli, got: ${durationRange?.comment}`);
}

const canonicalSwim = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'move' && item?.sport === 'Swim' && Array.isArray(item?.splits));
const nested = canonicalSwim?.splits?.[3]?.splits?.[0];
if (!nested) {
  throw new Error('Expected nested split under canonical Swim move');
}
if (nested.pace !== '1:20/100m') {
  throw new Error(`Expected nested split pace to be 1:20/100m, got: ${nested.pace}`);
}
if (nested?.paceQuantity?.value !== 80 || nested?.paceQuantity?.unit !== 's/100m') {
  throw new Error(
    `Expected nested split paceQuantity to be 80 s/100m, got: ${JSON.stringify(nested?.paceQuantity)}`,
  );
}
if (nested.duration !== '40s') {
  throw new Error(`Expected nested split duration inferred from pace+distance to be 40s, got: ${nested.duration}`);
}

const benchNode = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'exercise' && item?.name === 'penkki');
if (!benchNode) {
  throw new Error('Expected Lift penkki row to parse as exercise node');
}
if (benchNode.spec !== '10@40kg, 8@50kg, 6@60kg') {
  throw new Error(`Unexpected penkki spec: ${benchNode.spec}`);
}
if (benchNode.comment !== 'kommentti') {
  throw new Error(`Unexpected penkki comment: ${benchNode.comment}`);
}
if (!Array.isArray(benchNode.attempts) || benchNode.attempts.length !== 3) {
  throw new Error('Expected penkki attempts to contain 3 entries');
}
if (
  benchNode.attempts[0]?.reps !== 10 ||
  benchNode.attempts[0]?.loadValue !== 40 ||
  benchNode.attempts[0]?.loadUnit !== 'kg'
) {
  throw new Error('Unexpected first penkki attempt parsing');
}

const stretchNode = parsed.workouts
  .flatMap((w) => (Array.isArray(w.content) ? w.content : []))
  .find((item) => item?.type === 'exercise' && item?.name === 'Venytys');
if (!stretchNode) {
  throw new Error('Expected Exercise Venytys row to parse as exercise node');
}
const stretchAttempt = stretchNode?.attempts?.[0];
if (!stretchAttempt) {
  throw new Error('Expected Venytys to contain one parsed attempt');
}
if (stretchAttempt.reps !== undefined) {
  throw new Error('Expected Venytys duration range not to be parsed as reps');
}
if (stretchAttempt.duration !== '30s' || stretchAttempt.durationMax !== '60s') {
  throw new Error(
    `Expected Venytys duration range to parse as 30s..60s, got: ${stretchAttempt.duration}..${stretchAttempt.durationMax}`,
  );
}

const loikatProbe = CompactAstParser.parseText(
  '[2026-05-06] ## Loikat Probe\nExercise Loikat (tasamaa ja ylämäki)|2-3x3-4x20-30m\n',
);
const loikatWorkout = loikatProbe.workouts.find((w) => Array.isArray(w.content) && w.content.length > 0);
const loikatNode = loikatWorkout?.content?.find((item) => item?.type === 'exercise' && item?.name === 'Loikat (tasamaa ja ylämäki)');
if (!loikatNode) {
  throw new Error('Expected Loikat row to parse as exercise node');
}
const loikatAttempt = loikatNode?.attempts?.[0];
if (!loikatAttempt) {
  throw new Error('Expected Loikat to contain one parsed attempt');
}
if (
  loikatAttempt.sets !== 2 ||
  loikatAttempt.setsMax !== 3 ||
  loikatAttempt.reps !== 3 ||
  loikatAttempt.repsMax !== 4
) {
  throw new Error(`Expected Loikat attempt ranges 2-3x3-4, got: ${JSON.stringify(loikatAttempt)}`);
}
if (
  loikatAttempt?.distance?.value !== 20 ||
  loikatAttempt?.distance?.valueMax !== 30 ||
  loikatAttempt?.distance?.unit !== 'm'
) {
  throw new Error(`Expected Loikat distance range 20-30m, got: ${JSON.stringify(loikatAttempt?.distance)}`);
}

const sportProbe = CompactAstParser.parseText('[2026-05-06] ## Sport Probe\nSkijump 50min\n');
const probeWorkout = sportProbe.workouts.find((w) => Array.isArray(w.content) && w.content.length > 0);
const probeMove = probeWorkout?.content?.find((item) => item && item.type === 'move');
if (!probeMove) {
  throw new Error('Expected Skijump 50min to parse as move node');
}
if (probeMove.sport !== 'Skijump') {
  throw new Error(`Expected sport token to be Skijump, got: ${probeMove.sport}`);
}
if (probeMove.duration !== '50min') {
  throw new Error(`Expected duration token to be 50min, got: ${probeMove.duration}`);
}

const intervalProbe = CompactAstParser.parseText(
  '[2026-05-06] ## Interval Probe\nRun 4x400m / 2-3min | 80-90%\nEndurance | 4x400m / 2-3min | 80-90%\n',
);
const intervalWorkout = intervalProbe.workouts.find((w) => Array.isArray(w.content) && w.content.length > 0);
const runMove = intervalWorkout?.content?.find((item) => item && item.type === 'move' && item.sport === 'Run');
if (!runMove) {
  throw new Error('Expected Run 4x400m line to parse as move node');
}
if (runMove.count !== 4) {
  throw new Error(`Expected run repeat count 4, got: ${runMove.count}`);
}
if (!runMove.distance || runMove.distance.value !== 400 || runMove.distance.unit !== 'm') {
  throw new Error('Expected run distance to parse as 400m');
}
if (runMove?.intensityQuantity?.unit !== '%' || runMove?.intensityQuantity?.value !== 80 || runMove?.intensityQuantity?.valueMax !== 90) {
  throw new Error(
    `Expected Run interval intensityQuantity to be 80-90%, got: ${JSON.stringify(runMove?.intensityQuantity)}`,
  );
}

const enduranceLegacy = intervalWorkout?.content?.find(
  (item) => item && item.type === 'unknown' && item.raw === 'Endurance | 4x400m / 2-3min | 80-90%',
);
if (!enduranceLegacy) {
  throw new Error('Expected Endurance legacy line to stay unknown for v1-like compatibility');
}

const swimSplitProbe = CompactAstParser.parseText(
  '[2026-05-06] ## Swim Probe\nSwim rintauinti | 450m / 20s | 3:11/100m | tekniikka\n> 100m 3\'12"/100m 137bpm [[käsiräpylät]] | split note\n> 100m 2:51/100m\n> 100m 2:55/100m\n> 100m 2:56/100m\n',
);
const swimWorkout = swimSplitProbe.workouts.find((w) => Array.isArray(w.content) && w.content.length > 0);
const swimMove = swimWorkout?.content?.find((item) => item?.type === 'move' && item?.sport === 'Swim');
if (!swimMove) {
  throw new Error('Expected Swim row to parse as move node');
}
if (!swimMove.distance || swimMove.distance.value !== 450 || swimMove.distance.unit !== 'm') {
  throw new Error('Expected Swim move top-level distance to parse as 450m');
}
if (swimMove.recovery !== '20s') {
  throw new Error(`Expected Swim move recovery to parse as 20s, got: ${swimMove.recovery}`);
}
if (!Array.isArray(swimMove.splits) || swimMove.splits.length !== 4) {
  throw new Error('Expected Swim move to contain four parsed split nodes');
}
const firstSplit = swimMove.splits[0];
if (!firstSplit || firstSplit.type !== 'split') {
  throw new Error('Expected first child row to parse as split node');
}
if (!firstSplit.distance || firstSplit.distance.value !== 100 || firstSplit.distance.unit !== 'm') {
  throw new Error('Expected first split distance to parse as 100m');
}
if (firstSplit.hr !== 137) {
  throw new Error(`Expected first split hr to parse as 137, got: ${firstSplit.hr}`);
}

const paceKmProbe = CompactAstParser.parseText('[2026-05-06] ## Pace Km Probe\nSwim\n> 100m 6:00/km\n');
const paceKmWorkout = paceKmProbe.workouts.find((w) => Array.isArray(w.content) && w.content.length > 0);
const paceKmMove = paceKmWorkout?.content?.find((item) => item?.type === 'move' && item?.sport === 'Swim');
const paceKmSplit = paceKmMove?.splits?.[0];
if (!paceKmSplit) {
  throw new Error('Expected /km pace split to be parsed in probe');
}
if (paceKmSplit?.paceQuantity?.unit !== 'km/h') {
  throw new Error(`Expected /km pace to normalize as km/h, got: ${paceKmSplit?.paceQuantity?.unit}`);
}
if (Math.abs((paceKmSplit?.paceQuantity?.value ?? 0) - 10) > 0.001) {
  throw new Error(`Expected 6:00/km to normalize to 10 km/h, got: ${paceKmSplit?.paceQuantity?.value}`);
}

console.log(`Ranger smoke ok: workouts=${parsed.workouts.length}`);
