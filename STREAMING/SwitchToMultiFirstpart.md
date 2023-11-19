---
ns: STREAMING
aliases: ["0xAAB3200ED59016BC", "_SWITCH_OUT_PLAYER"]
---
## SWITCH_TO_MULTI_FIRSTPART

```c
// 0xAAB3200ED59016BC 0xFB4D062D
void SWITCH_TO_MULTI_FIRSTPART(Ped ped, int flags, int switchType);
```
```
Doesn't act normally when used on Mount Chiliad.
```

You can check if the player is in a Switch state with [`IS_PLAYER_SWITCH_IN_PROGRESS`](#_0xD9D2CFFF49FAB35F).

## Parameters
* **ped**: The Ped (player character) for which the switch is initiated.
* **flags**: Flags control various functionalities:
  - 0: Normal behavior.
  - 1: No transition.
  - 255: Switch IN.
* **switchType**: Specifies the type of switch (0 - 3):
  - 0: 1 step towards ped.
  - 1: 3 steps out from ped.
  - 2: 1 step out from ped.
  - 3: 1 step towards ped.

## Examples

```lua
-- Check if the player is in a Switch "state"
if not IsPlayerSwitchInProgress() then
    -- If the player is not already in a Switch state, initiate a Switch
    SwitchToMultiFirstPart(PlayerPedId(), 0, 1)
    -- In this case, switchType is set to 1, which means "3 steps out from ped"
end
```

```javascript
// Check if the player is in a Switch "state"
if (!IsPlayerSwitchInProgress()) {
    // If the player is not already in a Switch state, initiate a Switch
    SwitchToMultiFirstPart(PlayerPedId(), 0, 1);
    // In this case, switchType is set to 1, which means "3 steps out from ped" according to the documentation
}
```

```csharp
using static CitizenFX.Core.Native.API;

// Check if the player is in a Switch "state"
if (!IsPlayerSwitchInProgress()) {
    // If the player is not already in a Switch state, initiate a Switch
    SwitchToMultiFirstPart(API.PlayerPedId(), 0, 1);
    // In this case, switchType is set to 1, which means "3 steps out from ped" according to the documentation
}
```
