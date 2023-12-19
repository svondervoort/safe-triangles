# safe-triangles

Inspired by: https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/

# Installation
1. Install the package using one of the following options:
   - `npm install @svondervoort/safe-triangles`
   - `yarn add @svondervoort/safe-triangles`,
2. Import the resources:
   - Javascript: `import generateSafeTriangles from "@svondervoort/safe-triangles";`. 
   - Styling: `import '@svondervoort/safe-triangles/src/scss/style.scss';`
3. Add the following data-attributes to the elements:
   - `data-safe-triangle-dropdown="%UNIQUE_ID%"` (required)
   - `data-safe-triangle-direction="%DIRECTION%"` (optional) (`down | right`, default to down)
4. Initialize it using `generateSafeTriangles();`.
   - Input requires either a `selector <string>` or a `<NodeList>`.

# Options
| Name | Type | Default | Description                                                                                                                                     |
| ---- | ---- | ------- |-------------------------------------------------------------------------------------------------------------------------------------------------|
| delay | `number` | `100` | The delay of which the path of the safe-triangle gets updated. A minimum of 100ms is recommended since the path follows the cursor of the user. |
| debug | `boolean` | `false` | If set to true it will show the overlays so you can see the Safe Triangles doing their work                                                     |

# Example
```javascript
import generateSafeTriangles from "@svondervoort/safe-triangles";
import '@svondervoort/safe-triangles/src/scss/style.scss';

let elements = document.querySelectorAll('.header-main-nav-l1__item-link--has-children-js, .header-main-nav-l2__item-link--has-children-js');
generateSafeTriangles(elements);
```