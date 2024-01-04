/***********************************************************************************************************************
 * Demo SCSS
 **********************************************************************************************************************/

import '../scss/style.scss';

/***********************************************************************************************************************
 * Bootstrap
 **********************************************************************************************************************/

import "@popperjs/core";
import { Tooltip } from 'bootstrap';

const tooltipTriggerList: NodeListOf<HTMLElement> = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList: any[] = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

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
if (debugElements) {
    generateSafeTriangles(debugElements, {debug: true});
}

if (elements) {
    generateSafeTriangles(elements);
}

/***********************************************************************************************************************
 * Demo Navigation Logic
 **********************************************************************************************************************/

const l2NavItems: NodeListOf <HTMLElement> = document.querySelectorAll('.nav-l2__item-link--js');
l2NavItems.forEach((navItem: HTMLElement) => {
    navItem.addEventListener('mouseover', () => {
        const id: string = navItem.dataset.safeTriangleDropdown;
        // Remove active class from active wrapper
        const activeWrapper: HTMLElement = document.querySelector('.nav-l2__dropdown--is-active');
        if (activeWrapper) {
            activeWrapper.classList.remove('nav-l2__dropdown--is-active');
        }
        // Add active class corresponding with ID
        if (id) {
            const newWrapper: HTMLElement = document.querySelector('.nav-l2__dropdown--js[data-safe-triangle-dropdown="' + id + '"]');
            if (newWrapper) {
                newWrapper.classList.add('nav-l2__dropdown--is-active');
            }
        }
    });
});