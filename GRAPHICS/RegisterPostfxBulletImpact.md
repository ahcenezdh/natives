---
ns: GRAPHICS
---
## REGISTER_POSTFX_BULLET_IMPACT

```c
// 0x170911F37F646F29
void REGISTER_​POSTFX_​BULLET_​IMPACT(float weaponWorldPosX, float weaponWorldPosY, float weaponWorldPosZ, float intensity);
```

Registers a bullet impact/damage overlay sprite, specifying the world space position of the damage's origin (e.g., the firing weapon's position) and the intensity of the effect.

## Parameters
* **weaponWorldPosX**: X coordinate in world space where the bullet damage originates.
* **weaponWorldPosY**: Y coordinate in world space where the bullet damage originates.
* **weaponWorldPosZ**: Z coordinate in world space where the bullet damage originates.
* **intensity**: Intensity of the bullet impact effect, ranging from 0 (minimum) to 1 (maximum).

## Return value
This function triggers a visual effect without returning a value.