---
ns: VEHICLE
---
## _SET_BOUNDS_AFFECT_WATER_PROBES

```c
// 0x85FC953F6C6CBDE1
void _SET_BOUNDS_AFFECT_WATER_PROBES(Vehicle vehicle, BOOL toggle);
```

Alters the way water interaction is calculated for a vehicle by using the vehicle's bounds instead of the viewport to decide if it's sufficiently above water.

```
NativeDB Introduced: v2802
```


## Parameters
* **vehicle**: Vehicle for which water interaction calculation is being modified.
* **toggle**: A boolean to enable `true` or disable `false` the use of vehicle bounds for water probes.


## Examples

```lua
-- Retrieve the vehicle the player is currently in.
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

if not DoesEntityExist(vehicle) then return end -- If the player is not in a vehicle, stop the script.

-- Enable the use of vehicle bounds for water probes.
SetBoundsAffectWaterProbes(vehicle, true)
```

```js
// Retrieve the vehicle the player is currently in.
const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

if (!DoesEntityExist(vehicle)) return; // If the player is not in a vehicle, stop the script.

// Enable the use of vehicle bounds for water probes.
SetBoundsAffectWaterProbes(vehicle, true);
```

```cs
using static CitizenFX.Core.Native.API;

// Retrieve the vehicle the player is currently in.
Vehicle vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

if (!DoesEntityExist(vehicle)) return; // If the player is not in a vehicle, stop the script.

// Enable the use of vehicle bounds for water probes.
SetBoundsAffectWaterProbes(vehicle, true);
```
