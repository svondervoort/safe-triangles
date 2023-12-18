# safe-triangle

Inspired by: https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/

# Installation
1. Download the package
2. Import it into your project `import generateSafeTriangles from "../ts/components/safeAreaNavigation";`
3. Initialize it using `generateSafeTriangles();`

# Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| elements | `string` or `NodeList` | `.safe-triangle__item--js | The elements the Safe Triangle will be parsing |
| delay | `number` | `100` | A delay of which the generation of Safe Triangles get initialised. It might be neccesary to wait for other javascript functions or styling to load |
| debug | `boolean` | `false` | If set to true it will show the overlays so you can see the Safe Triangles doing their work |
