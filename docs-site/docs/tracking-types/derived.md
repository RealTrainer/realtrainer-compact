---
id: derived
title: Derived Metrics
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Derived` for inferred metrics.

<CompactExampleBlock>
```compact
Derived strength.neural_stress 62|score basis:entity confidence:85% source:exercise+load goodness:4
Derived endurance.zone2_minutes 20|min basis:entity confidence:75% source:crosstrainer goodness:5
```
</CompactExampleBlock>

Common fields:

- name
- value + unit
- basis
- confidence
- source
- goodness
