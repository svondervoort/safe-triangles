# Safe-Triangles

Inspired by: https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/

---
# Usage

### 1. Installing
Install the package using one of the following options:

#### NPM
```bash
npm install @svondervoort/safe-triangles
```

#### Yarn
```bash
yarn add @svondervoort/safe-triangles
```

### 2. Requiring resources

#### Javascript
```javascript 
import generateSafeTriangles from "@svondervoort/safe-triangles";
```

#### Styling
```javascript
// CSS
import '@svondervoort/safe-triangles/dist/css/style.css';

// SCSS
import '@svondervoort/safe-triangles/src/scss/style.scss';
```

### 3. Adding data-attributes

#### Required
```html
data-safe-triangle-dropdown="..."
```
Add this to the menu-item anchor element and the dropdown it is associated with.

#### Optional
```html
data-safe-triangle-direction
```
Add this to the menu-item if you wish to set the direction of the menu-item to the dropdown.
Possible values: `down` (Default) / `right`

### 4. Initializing
Initialize the logic using `generateSafeTriangles();`.
The function requires either a `selector <string>` or a `DOM node list <NodeList>`.

---
# Options
| Name | Type | Default | Description                                                                                                                                     |
| ---- | ---- | ------- |-------------------------------------------------------------------------------------------------------------------------------------------------|
| delay | `number` | `100` | The delay of which the path of the safe-triangle gets updated. A minimum of 100ms is recommended since the path follows the cursor of the user. |
| debug | `boolean` | `false` | If set to true it will show the overlays so you can see the Safe Triangles doing their work                                                     |

---
# Example
```javascript
// Import Javascript
import generateSafeTriangles from "@svondervoort/safe-triangles";

// Import SCSS
import '@svondervoort/safe-triangles/src/scss/style.scss';

// Create NodeList
let elements = document.querySelectorAll('.header-main-nav-l1__item-link--has-children-js, .header-main-nav-l2__item-link--has-children-js');

// Initialize with delay and debug
generateSafeTriangles(elements, { delay: 100, debug: true });
```

---
# Demo
You can find a demo here with 3 variants:
- [Without Safe-Triangles](https://safe-triangles.vercel.app/demo1.html)
- [With Safe-Triangles ( debug: true )](https://safe-triangles.vercel.app/)
- [Without Safe-Triangles ( debug: false )](https://safe-triangles.vercel.app/demo3.html)

---
# Roadmap

- Detect position of dropdown compared to menu-item to make `data-safe-triangle-direction` redundant.
