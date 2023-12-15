---
ns: MISC
---
## GET_COORDS_OF_PROJECTILE_TYPE_IN_AREA

```c
// 0x3DA8C28346B62CED
BOOL GET_COORDS_OF_PROJECTILE_TYPE_IN_ANGLED_AREA(float vecAngledAreaPoint1X, float vecAngledAreaPoint1Y, float vecAngledAreaPoint1Z, float vecAngledAreaPoint2X, float vecAngledAreaPoint2Y, float vecAngledAreaPoint2Z, float distanceOfOppositeFace, Hash weaponType, Vector3* positionOut, BOOL bIsPlayer);
```

Checks if a projectile of the specified type is within an angled area and returns its position.


## Parameters
* **vecAngledAreaPoint1X**: X coordinate of the first point defining the angled area.
* **vecAngledAreaPoint1Y**: Y coordinate of the first point defining the angled area.
* **vecAngledAreaPoint1Z**: Z coordinate of the first point defining the angled area.
* **vecAngledAreaPoint2X**: X coordinate of the second point defining the angled area.
* **vecAngledAreaPoint2Y**: Y coordinate of the second point defining the angled area.
* **vecAngledAreaPoint2Z**: Z coordinate of the second point defining the angled area.
* **distanceOfOppositeFace**: The distance to the opposite face of the angled area.
* **weaponType**: The hash of the weapon type of the projectile.
* **positionOut**: A pointer to a `Vector3` that will store the position of the projectile if found.
* **bIsPlayer**: A boolean indicating whether the check is for a player's projectile.

## Return value
Returns true if a projectile of the specified type is found within the angled area, and false otherwise.