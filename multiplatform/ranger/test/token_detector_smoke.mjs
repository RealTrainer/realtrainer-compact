import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const modulePath = resolve(process.cwd(), 'multiplatform/ranger/src/ng/bin/token_detector.cjs');
const tokenSliceModulePath = resolve(process.cwd(), 'multiplatform/ranger/src/ng/bin/token_slice.cjs');
const {
	KeywordDetector,
	DateTimeDetector,
	NewlineDetector,
	PositiveIntegerDetector,
	DecimalNumberDetector,
	TimeValueDetector,
	RecoveryTimeDetector,
	SpeedDetector,
	RepeatBlockDetector,
	WeightDetector,
	DistanceDetector,
	NumRangeBlockDetector,
	DistanceRangeBlockDetector,
	AMTimeValueDetector,
	DetailsDataDetector,
	HeadingDataDetector,
	BPMDetector,
	KCALDetector,
	PercentageDetector,
	PercentageRangeDetector,
	RMDetector,
} = require(modulePath);
const { TokenSlice } = require(tokenSliceModulePath);

const text = 'Split 10kg';
const d = KeywordDetector.create('Split');
const hit = d.detect(TokenSlice.fromText(text));
assert.equal(hit.toString(), 'Split');
assert.equal(hit.length(), 5);
assert.equal(hit.tag, 'keyword');

const miss = d.detect(TokenSlice.fromText(text).peek(1));
assert.equal(miss.length(), 0);
assert.equal(miss.tag, '');
assert.equal(miss.start, 0);
assert.equal(miss.source, '');

const empty = KeywordDetector.create('');
const emptyMiss = empty.detect(TokenSlice.fromText(text));
assert.equal(emptyMiss.length(), 0);
assert.equal(emptyMiss.tag, '');

const dt = DateTimeDetector.create();

const dateOnlyHit = dt.detect(TokenSlice.fromText('2026-05-09 abc'));
assert.equal(dateOnlyHit.toString(), '2026-05-09');
assert.equal(dateOnlyHit.tag, 'datetime');

const dtOffsetHit = dt.detect(TokenSlice.fromText('2026-05-09T14:30+02:00 jatkuu'));
assert.equal(dtOffsetHit.toString(), '2026-05-09T14:30+02:00');
assert.equal(dtOffsetHit.tag, 'datetime');

const dtFullHit = dt.detect(TokenSlice.fromText('2026-05-09T14:30:45Z loppu'));
assert.equal(dtFullHit.toString(), '2026-05-09T14:30:45Z');

const shapeHit = dt.parseDateShape(TokenSlice.fromText('2026-05-09 warmup'));
assert.equal(shapeHit.toString(), '2026-05-09');
assert.equal(shapeHit.tag, 'datetime');

const shapeMiss = dt.parseDateShape(TokenSlice.fromText('warmup 2026-05-09'));
assert.equal(shapeMiss.length(), 0);
assert.equal(shapeMiss.tag, '');

const loopSlice = TokenSlice.fromText('2026-05-09 repeated run');
const loopHit1 = dt.parseToMap(loopSlice);
const beforeCalls = dt.getParseDateShapeCalls();
for (let i = 0; i < 20; i += 1) {
	const hitLoop = dt.parseToMap(loopSlice);
	assert.equal(hitLoop.toString(), '2026-05-09');
	assert.equal(hitLoop.tag, 'datetime');
}
const afterCalls = dt.getParseDateShapeCalls();
assert.equal(loopHit1.toString(), '2026-05-09');
assert.equal(dt.hasCachedValue(loopSlice), true);
assert.equal(afterCalls, beforeCalls, 'parseToMap iterations should use cache and not re-parse');

const dtMissMonth = dt.detect(TokenSlice.fromText('2026-13-09T14:30Z'));
assert.equal(dtMissMonth.length(), 0);
assert.equal(dtMissMonth.tag, '');

const dtMissHour = dt.detect(TokenSlice.fromText('2026-05-09T25:30Z'));
assert.equal(dtMissHour.length(), 0);
assert.equal(dtMissHour.tag, '');

const pi = PositiveIntegerDetector.create();

const piHit = pi.detect(TokenSlice.fromText('12345kg'));
assert.equal(piHit.toString(), '12345');
assert.equal(piHit.tag, 'positive-integer');

const piLeadingZeroHit = pi.detect(TokenSlice.fromText('0012x'));
assert.equal(piLeadingZeroHit.toString(), '0012');
assert.equal(piLeadingZeroHit.tag, 'positive-integer');

const piZeroMiss = pi.detect(TokenSlice.fromText('0abc'));
assert.equal(piZeroMiss.length(), 0);
assert.equal(piZeroMiss.tag, '');

const piAlphaMiss = pi.detect(TokenSlice.fromText('abc123'));
assert.equal(piAlphaMiss.length(), 0);
assert.equal(piAlphaMiss.tag, '');

const nl = NewlineDetector.create();

const nlHit = nl.detect(TokenSlice.fromText('\n\rnext'));
assert.equal(nlHit.toString(), '\n\r');
assert.equal(nlHit.tag, 'newline');

const nlMiss = nl.detect(TokenSlice.fromText('  \nnext'));
assert.equal(nlMiss.length(), 0);
assert.equal(nlMiss.tag, '');

const dec = DecimalNumberDetector.create();
const decHit = dec.detect(TokenSlice.fromText('10.4kg'));
assert.equal(decHit.toString(), '10.4');
assert.equal(decHit.tag, 'decimal-number');
const decMiss = dec.detect(TokenSlice.fromText('10.kg'));
assert.equal(decMiss.length(), 0);

const tv = TimeValueDetector.create();
const tvHit = tv.detect(TokenSlice.fromText('10:10 start'));
assert.equal(tvHit.toString(), '10:10');
assert.equal(tvHit.tag, 'time-value');
const tvMiss = tv.detect(TokenSlice.fromText('25:10 start'));
assert.equal(tvMiss.length(), 0);

const rt = RecoveryTimeDetector.create();
const rtHit = rt.detect(TokenSlice.fromText('/10s rest'));
assert.equal(rtHit.toString(), '/10s');
assert.equal(rtHit.tag, 'recovery-time');
const rtMiss = rt.detect(TokenSlice.fromText('/0s rest'));
assert.equal(rtMiss.length(), 0);

const speed = SpeedDetector.create();
const speedHit = speed.detect(TokenSlice.fromText('2:50/100m hard'));
assert.equal(speedHit.toString(), '2:50/100m');
assert.equal(speedHit.tag, 'speed');
assert.equal(speedHit.childCount(), 3);
assert.equal(speedHit.getChild(0).toString(), '2:50');
assert.equal(speedHit.getChild(0).tag, 'time-value');
assert.equal(speedHit.getChild(1).toString(), '/');
assert.equal(speedHit.getChild(1).tag, 'keyword');
assert.equal(speedHit.getChild(2).toString(), '100m');
assert.equal(speedHit.getChild(2).tag, 'distance');
const speedMiss = speed.detect(TokenSlice.fromText('2:70/100m hard'));
assert.equal(speedMiss.length(), 0);

const rep = RepeatBlockDetector.create();
const repHit = rep.detect(TokenSlice.fromText('10x squat'));
assert.equal(repHit.toString(), '10x');
assert.equal(repHit.tag, 'repeat-block');
const repMiss = rep.detect(TokenSlice.fromText('0x squat'));
assert.equal(repMiss.length(), 0);

const wd = WeightDetector.create();
const wdHit = wd.detect(TokenSlice.fromText('100kg bench'));
assert.equal(wdHit.toString(), '100kg');
assert.equal(wdHit.tag, 'weight');
assert.equal(wdHit.childCount(), 2);
assert.equal(wdHit.getChild(0).toString(), '100');
assert.equal(wdHit.getChild(0).tag, 'positive-integer');
assert.equal(wdHit.getChild(1).toString(), 'kg');
assert.equal(wdHit.getChild(1).tag, 'keyword');

const dist = DistanceDetector.create();
const distHit = dist.detect(TokenSlice.fromText('100m run'));
assert.equal(distHit.toString(), '100m');
assert.equal(distHit.tag, 'distance');

const nrb = NumRangeBlockDetector.create();
const nrbHit = nrb.detect(TokenSlice.fromText('10-50 reps'));
assert.equal(nrbHit.toString(), '10-50');
assert.equal(nrbHit.tag, 'num-range');

const drb = DistanceRangeBlockDetector.create();
const drbHitA = drb.detect(TokenSlice.fromText('100-200m target'));
assert.equal(drbHitA.toString(), '100-200m');
assert.equal(drbHitA.tag, 'distance-range');
const drbHitB = drb.detect(TokenSlice.fromText('100m-200m target'));
assert.equal(drbHitB.toString(), '100m-200m');
assert.equal(drbHitB.tag, 'distance-range');

const am = AMTimeValueDetector.create();
const amHit = am.detect(TokenSlice.fromText('3AM wake'));
assert.equal(amHit.toString(), '3AM');
assert.equal(amHit.tag, 'am-time');
const amMiss = am.detect(TokenSlice.fromText('13AM wake'));
assert.equal(amMiss.length(), 0);

const det = DetailsDataDetector.create();
const detHit = det.detect(TokenSlice.fromText('> note'));
assert.equal(detHit.toString(), '>');
assert.equal(detHit.tag, 'details-data');

const head = HeadingDataDetector.create();
const headHit = head.detect(TokenSlice.fromText('# Morning Run\nnext'));
assert.equal(headHit.toString(), '# Morning Run');
assert.equal(headHit.tag, 'heading-data');

const bpm = BPMDetector.create();
const bpmHit = bpm.detect(TokenSlice.fromText('120bpm zone2'));
assert.equal(bpmHit.toString(), '120bpm');
assert.equal(bpmHit.tag, 'bpm');
assert.equal(bpmHit.childCount(), 2);
assert.equal(bpmHit.getChild(0).toString(), '120');
assert.equal(bpmHit.getChild(0).tag, 'positive-integer');
assert.equal(bpmHit.getChild(1).toString(), 'bpm');
assert.equal(bpmHit.getChild(1).tag, 'keyword');

const kcal = KCALDetector.create();
const kcalHit = kcal.detect(TokenSlice.fromText('120kcal burn'));
assert.equal(kcalHit.toString(), '120kcal');
assert.equal(kcalHit.tag, 'kcal');
assert.equal(kcalHit.childCount(), 2);
assert.equal(kcalHit.getChild(0).toString(), '120');
assert.equal(kcalHit.getChild(0).tag, 'positive-integer');
assert.equal(kcalHit.getChild(1).toString(), 'kcal');
assert.equal(kcalHit.getChild(1).tag, 'keyword');

const pct = PercentageDetector.create();
const pctHit = pct.detect(TokenSlice.fromText('70% load'));
assert.equal(pctHit.toString(), '70%');
assert.equal(pctHit.tag, 'percentage');

const pctr = PercentageRangeDetector.create();
const pctrHit = pctr.detect(TokenSlice.fromText('40-50% zone'));
assert.equal(pctrHit.toString(), '40-50%');
assert.equal(pctrHit.tag, 'percentage-range');
assert.equal(pctrHit.childCount(), 2);
assert.equal(pctrHit.getChild(0).toString(), '40-50');
assert.equal(pctrHit.getChild(0).tag, 'num-range');
assert.equal(pctrHit.getChild(1).toString(), '%');
assert.equal(pctrHit.getChild(1).tag, 'keyword');

const rm = RMDetector.create();
const rmHit = rm.detect(TokenSlice.fromText('1RM test'));
assert.equal(rmHit.toString(), '1RM');
assert.equal(rmHit.tag, 'rm');
assert.equal(rmHit.childCount(), 2);
assert.equal(rmHit.getChild(0).toString(), '1');
assert.equal(rmHit.getChild(0).tag, 'positive-integer');
assert.equal(rmHit.getChild(1).toString(), 'RM');
assert.equal(rmHit.getChild(1).tag, 'keyword');
const rmMiss = rm.detect(TokenSlice.fromText('0RM test'));
assert.equal(rmMiss.length(), 0);

console.log('TokenDetector smoke ok');
