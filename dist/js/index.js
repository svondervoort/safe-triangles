"use strict";
// Inspired by: https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/***********************************************************************************************************************
 * Classes
 **********************************************************************************************************************/
var ElementData = /** @class */ (function () {
    function ElementData(el, width, height, top, right, bottom, left, centerX, centerY, isLink) {
        this._el = el;
        this.width = width;
        this.height = height;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.centerX = centerX;
        this.centerY = centerY;
        this.isLink = isLink;
    }
    return ElementData;
}());
var DropdownData = /** @class */ (function () {
    function DropdownData(el, width, height, top, right, bottom, left, direction, style) {
        this._el = el;
        this.width = width;
        this.height = height;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.direction = direction;
        this.style = style;
    }
    return DropdownData;
}());
var options = /** @class */ (function () {
    function options() {
    }
    return options;
}());
/***********************************************************************************************************************
 * Update SVG
 **********************************************************************************************************************/
var updateSvg = function (svgEl, elementData, dropdownData) {
    svgEl.classList.add('safe-triangle__svg', 'svg--keep-colors');
    svgEl.setAttribute('fill', 'none');
    svgEl.style.pointerEvents = 'none';
    // Update SVG according to direction
    if (dropdownData.direction === 'right') {
        // Set dimensions
        var height = (elementData.bottom > dropdownData.bottom) ? (elementData.bottom - dropdownData.top) : dropdownData.height;
        svgEl.setAttribute('viewBox', '0 0 ' + (dropdownData.left - elementData.left) + ' ' + height);
        svgEl.style.height = height + 'px';
        svgEl.style.width = (dropdownData.left - elementData.left) + 'px';
        // Set positions
        var top_1 = (elementData.top >= dropdownData.top) ? (elementData.top - dropdownData.top) * -1 : elementData.top;
        svgEl.style.top = top_1 + 'px';
        svgEl.style.left = '0px';
    }
    else {
        // Set dimensions
        svgEl.setAttribute('viewBox', '0 0 ' + dropdownData.width + ' ' + elementData.height);
        svgEl.style.height = elementData.height + 'px';
        svgEl.style.width = dropdownData.width + 'px';
        // Set positions
        svgEl.style.top = '0px';
        svgEl.style.left = (dropdownData.left - elementData.left) + 'px';
    }
};
/***********************************************************************************************************************
 * Update SVG Path
 **********************************************************************************************************************/
var updateSvgPath = function (svgPathEl, elementData, dropdownData, x, y, debug) {
    // Add class for styling
    svgPathEl.classList.add('safe-triangle__path');
    // Add visible styling if debug is true
    if (!debug) {
        svgPathEl.setAttribute('fill', 'transparent');
    }
    else {
        svgPathEl.setAttribute('fill', 'rgb(0 256 0 / 0.1)');
        svgPathEl.setAttribute('stroke', 'green');
        svgPathEl.setAttribute('strokeWidth', '0.5');
    }
    // Set pointer-events style
    svgPathEl.style.pointerEvents = 'auto';
    // Add class for styling if element is a link
    if (elementData.isLink) {
        svgPathEl.classList.add('safe-triangle__path--has-link');
    }
    // Update path according to direction
    if (dropdownData.direction === 'right') {
        var width = (dropdownData.left - elementData.left);
        var height = (elementData.bottom > dropdownData.bottom) ? (elementData.bottom - dropdownData.top) : dropdownData.height;
        svgPathEl.setAttribute('d', 'M ' + (x - elementData.left) + ' ' + (y - dropdownData.top) + ' L ' + width + ' 0 L ' + width + ' ' + height + ' z');
    }
    else {
        svgPathEl.setAttribute('d', 'M ' + (x - dropdownData.left) + ' ' + (y - elementData.top) + ' L ' + dropdownData.width + ' ' + elementData.height + ' L 0 ' + elementData.height + ' z');
    }
};
/***********************************************************************************************************************
 * Get Element Data
 **********************************************************************************************************************/
var getElementData = function (element) {
    // Get element bounding rects
    var elementRect = element.getBoundingClientRect();
    // Create and return data object
    return new ElementData(element, elementRect.width, elementRect.height, elementRect.top, elementRect.right, elementRect.bottom, elementRect.left, (elementRect.width / 2), (elementRect.height / 2), element.hasAttribute('href'));
};
/***********************************************************************************************************************
 * Get Dropdown Data
 **********************************************************************************************************************/
var getDropdownData = function (dropdown, direction) {
    // Save the current style attribute if available
    var style = '';
    if (dropdown.hasAttribute('style')) {
        style = dropdown.getAttribute('style');
    }
    // Set styling of dropdown to get data
    dropdown.style.display = 'block';
    // Get element bounding rects
    var dropdownRect = dropdown.getBoundingClientRect();
    // Reset style attribute
    dropdown.setAttribute('style', style);
    // Create and return data object
    return new DropdownData(dropdown, dropdownRect.width, dropdownRect.height, dropdownRect.top, dropdownRect.right, dropdownRect.bottom, dropdownRect.left, direction, style);
};
/***********************************************************************************************************************
 * Generate Safe Areas
 **********************************************************************************************************************/
var generateSafeTriangles = function (input, options) {
    // Merge default options and custom options
    var defaultOptions = {
        delay: 100,
        debug: false
    };
    options = __assign(__assign({}, defaultOptions), options);
    var elements = document.querySelectorAll('.safe-triangle__item--js');
    if (typeof input === 'string' || input instanceof String) {
        elements = document.querySelectorAll(input.toString());
    }
    else if (NodeList.prototype.isPrototypeOf(input)) {
        elements = input;
    }
    elements.forEach(function (element) {
        var _a;
        // Dropdown
        var dropdownId = element.dataset.safeTriangleDropdown;
        if (dropdownId != '') {
            var dropdown_1 = document.querySelector('div[data-safe-triangle-dropdown="' + dropdownId + '"]');
            if (dropdown_1) {
                var dropdownDirection_1 = (_a = element.dataset.safeTriangleDirection) !== null && _a !== void 0 ? _a : 'down';
                var dropdownData_1 = getDropdownData(dropdown_1, dropdownDirection_1);
                // Add classes to element
                element.classList.add('safe-triangle__item', 'safe-triangle__item--js');
                var elementData_1 = getElementData(element);
                if (options.debug) {
                    // Add extra debug class
                    element.classList.add('safe-triangle__item--debug');
                }
                // Create SVG
                var svgEl_1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                updateSvg(svgEl_1, elementData_1, dropdownData_1);
                // Create SVG Path
                var svgPathEl_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                if (dropdownDirection_1 == 'right') {
                    updateSvgPath(svgPathEl_1, elementData_1, dropdownData_1, 0, 0, options.debug);
                }
                else {
                    updateSvgPath(svgPathEl_1, elementData_1, dropdownData_1, elementData_1.centerX, elementData_1.centerY, options.debug);
                }
                // Add Path to SVG
                svgEl_1.appendChild(svgPathEl_1);
                // Add SVG to element
                element.appendChild(svgEl_1);
                // Redraw SVG on mouseEnter (fix for child dropdowns & transform styling)
                element.addEventListener('mouseenter', function (e) {
                    elementData_1 = getElementData(element);
                    dropdownData_1 = getDropdownData(dropdown_1, dropdownDirection_1);
                    updateSvg(svgEl_1, elementData_1, dropdownData_1);
                });
                // Element mousemove update path
                element.addEventListener('mousemove', function (e) {
                    // Mouse position
                    var x = e.clientX;
                    var y = e.clientY;
                    setTimeout(function () {
                        updateSvgPath(svgPathEl_1, elementData_1, dropdownData_1, x, y, options.debug);
                    }, options.delay);
                });
                // Get width on resize and update SVG width
                window.addEventListener('resize', function () {
                    dropdownData_1 = getDropdownData(dropdown_1, dropdownDirection_1);
                    elementData_1 = getElementData(element);
                    updateSvg(svgEl_1, elementData_1, dropdownData_1);
                });
            }
        }
    });
};
exports["default"] = generateSafeTriangles;
//# sourceMappingURL=index.js.map