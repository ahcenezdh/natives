---
ns: ENTITY
---
## GET_ENTITY_BONE_OBJECT_POSTION

```c
// 0xCF1247CC86961FD6
Vector3 GET_ENTITY_BONE_OBJECT_POSTION(Entity entity, int boneIndex);
```

Retrieves the position of a specific bone within an entity in object space.

```
NativeDB Introduced: v2802
```

## Parameters
* **entity**: The entity from which the bone's position is to be obtained.
* **boneIndex**: The index of the specific bone within the entity whose position is being queried

## Return value
Returns the position as a Vector3 type, representing the 3D coordinates (x, y, z) of the bone within the entity's object space.

```lua
-- Get the vehicle that the player is currently in.
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

-- Check if the vehicle entity actually exists. If not, terminate the script.
if not DoesEntityExist(vehicle) then return end

-- Retrieve the index of the 'spoiler' bone in the vehicle entity.
local spoilerIndex = GetEntityBoneIndexByName(vehicle, "spoiler")

-- Get the position (vector3) of the spoiler bone on the vehicle
local spoilerPosition = GetEntityBoneObjectPosition(vehicle, spoilerIndex)

print(spoilerPosition)
```

```js
// Get the vehicle that the player is currently in.
const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

// Check if the vehicle entity actually exists. If not, terminate the script.
if (!DoesEntityExist(vehicle)) return;

// Retrieve the index of the 'spoiler' bone in the vehicle entity.
const spoilerIndex = GetEntityBoneIndexByName(vehicle, "spoiler");

// Get the position (vector3) of the spoiler bone on the vehicle
const [spoilerX, spoilerY, spoilerZ] = GetEntityBoneObjectPosition(vehicle, spoilerIndex);

console.log(`${spoilerX}, ${spoilerY}, ${spoilerZ}`);
```

```cs
using static CitizenFX.Core.Native.API;

// Get the vehicle that the player is currently in.
Vehicle vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

// Check if the vehicle entity actually exists. If not, terminate the script.
if (!DoesEntityExist(vehicle)) return;

// Retrieve the index of the 'spoiler' bone in the vehicle entity.
int spoilerIndex = GetEntityBoneIndexByName(vehicle, "spoiler");

// Get the position (vector3) of the spoiler bone on the vehicle
Vector3 spoilerPosition = GetEntityBoneObjectPosition(vehicle, spoilerIndex);

Debug.WriteLine($"{spoilerPosition}");
```