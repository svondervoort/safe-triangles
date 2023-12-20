/***********************************************************************************************************************
 * Demo SCSS
 **********************************************************************************************************************/

import '../scss/style.scss';

/***********************************************************************************************************************
 * Safe Triangle
 **********************************************************************************************************************/

// Import Javascript
import generateSafeTriangles from "../../../dist/ts/index";

// Import SCSS
import '../../../src/scss/style.scss';

/***********************************************************************************************************************
 * Variants
 **********************************************************************************************************************/

// Create NodeList
let debugElements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-safe-triangles-debug--js');
let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-safe-triangles--js');

// Initialize with delay and debug
generateSafeTriangles(debugElements, { debug: true });
generateSafeTriangles(elements);