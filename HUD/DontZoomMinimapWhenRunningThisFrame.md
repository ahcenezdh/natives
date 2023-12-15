---
ns: HUD
---
## DONT_ZOOM_MINIMAP_WHEN_RUNNING_THIS_FRAME

```c
// 0x89DA85D949CE57A0 
void DONT_ZOOM_MINIMAP_WHEN_RUNNING_THIS_FRAME();
```

To prevent radar zoom when running, call this function each frame.

```
NativeDB Introduced: v2802
```

## Examples

```lua
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        DontZoomMinimapWhenRunningThisFrame()
    end
end)
```


```js
setTick(() => {
    DontZoomMinimapWhenRunningThisFrame();
});
```
