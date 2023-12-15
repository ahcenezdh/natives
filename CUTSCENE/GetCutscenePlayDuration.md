---
ns: CUTSCENE
---
## GET_CUTSCENE_PLAY_DURATION

```c
// 0x5D583F71C901F2A3
int GET_CUTSCENE_PLAY_DURATION();
```

### Description
Gets the duration of the currently running cutscene, accounting for the concatenated sections selected in the script and any gaps. For example, in a cutscene with sections A (2 secs), B (3 secs), C (2 secs), and D (3 secs), if the script plays only A and C, the function returns 4 seconds (A+C). If it only plays D, it returns 3 seconds (D's duration).

**Note:** Do not use [`GET_CUTSCENE_TIME`](#_0xE625BEABBAFFDAB9) for duration comparisons, as it jumps over concat sections.

```
NativeDB Introduced: v2802
```