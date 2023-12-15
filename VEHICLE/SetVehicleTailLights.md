---
ns: VEHICLE
---
## SET_VEHICLE_STRONG

```c
// 0x5815BD2763178DF4
void SET_VEHICLE_TAIL_LIGHTS(Vehicle vehicle, BOOL toggle);
```

Forces a vehicle's tail lights to turn on or off. This native needs to be called each frame.


## Parameters
* **vehicle**: The vehicle for which the tail lights are to be controlled
* **toggle**: A boolean value; `true` to turn on the tail lights, `false` to turn them off.


## Examples
```lua
Citizen.CreateThread(function()
    while true do
        Wait(0)

        -- Get the vehicle that the player is currently in
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

        -- Check if the vehicle entity actually exists
        if DoesEntityExist(vehicle) then
            -- Turn on the vehicle's tail lights
            SetVehicleTailLights(vehicle, true)
        end
    end
end)
```

```js
setTick(() => {
    // Get the vehicle that the player is currently in
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

    // Check if the vehicle entity actually exists
    if (DoesEntityExist(vehicle)) {
        // Turn on the vehicle's tail lights
        SetVehicleTailLights(vehicle, true);
    }
});
```

