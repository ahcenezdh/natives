---
ns: HUD
---
## SHOW_FOR_SALE_ICON_ON_BLIP

```c
// 0x19BD6E3C0E16A8FA
void SHOW_FOR_SALE_ICON_ON_BLIP(Blip blip, BOOL toggle);
```

Shows a for sale indicator on this blip. This is used for properties that are for sale.

```
NativeDB Introduced: v2802
```

## Parameters
* **blip**: The blip on which the for sale indicator should be displayed.
* **toggle**: A boolean value that determines whether the for sale indicator should be displayed or not. If set to true, the indicator is displayed; if set to false, the indicator is hidden.

## Examples

```lua
local blip = AddBlipForCoord(200.0, 200.0, 5.0)
ShowForSaleIconOnBlip(blip, true)
```

```js
const blip = AddBlipForCoord(200.0, 200.0, 5.0);
ShowForSaleIconOnBlip(blip, true);
```

```cs
Blip blip = AddBlipForCoord(200.0, 200.0, 5.0);
ShowForSaleIconOnBlip(blip, true);
```