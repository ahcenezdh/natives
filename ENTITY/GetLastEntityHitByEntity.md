---
ns: ENTITY
---
## _GET_LAST_ENTITY_HIT_BY_ENTITY

```c
// 0xA75EE4F689B85391 
Entity _​GET_​LAST_​ENTITY_​HIT_​BY_​ENTITY(Entity entity)
```

```
NativeDB Introduced: v2802
```

## Parameters
* **entity**: The entity for which you want to find the last entity it hit.

## Return value
Return the last entity that was hit by the specified entity

## Examples
```lua
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        -- Get the vehicle that the player is currently in
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

        -- Retrieve the last entity that was hit by the player's vehicle
        local lastEntityHit = GetLastEntityHitByEntity(vehicle)

        -- Check if the vehicle has hit an entity
        if not DoesEntityExist(lastEntityHit) then
            print("Player vehicle didn't hit another entity yet")
        else
            -- Print the model of the entity that was hit
            print("Model of the damaged entity: " .. GetEntityModel(lastEntityHit))
        end
    end
end)
```
```js
setTick(() => {
    // Get the vehicle that the player is currently in
    let vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

    // Retrieve the last entity that was hit by the player's vehicle
    let lastEntityHit = GetLastEntityHitByEntity(vehicle);

    // Check if the vehicle has hit an entity
    if (!DoesEntityExist(lastEntityHit))  {
        console.log("Player vehicle didn't hit another entity");
    } else {
        console.log(`Model of the damaged entity: ${GetEntityModel(lastEntity)}`)
    }
})
```