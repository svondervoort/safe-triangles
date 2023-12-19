// Inspired by: https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/

/***********************************************************************************************************************
 * Classes
 **********************************************************************************************************************/

class elementData {
    _el: object;
    height: number;
    width: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    centerX: number;
    centerY: number;
    isLink: boolean;
}

class dropdownData {
    _el: object;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    direction: string;
    style: string;
}

class options {
    delay?: number;
    debug?: boolean;
}

/***********************************************************************************************************************
 * Update SVG
 **********************************************************************************************************************/

const updateSvg = (svgEl, elementData, dropdownData) => {
    svgEl.classList.add('safe-area__svg', 'svg--keep-colors');
    svgEl.setAttribute('fill', 'none');
    svgEl.style.pointerEvents = 'none';

    // Update SVG according to direction
    if (dropdownData.direction === 'right') {
        // Set dimensions
        const height: number = (elementData.bottom > dropdownData.bottom) ? (elementData.bottom - dropdownData.top) : dropdownData.height;
        svgEl.setAttribute('viewBox', '0 0 ' + (dropdownData.left - elementData.left) + ' ' + height);
        svgEl.style.height = height + 'px';
        svgEl.style.width = (dropdownData.left - elementData.left) + 'px';

        // Set positions
        const top: number = (elementData.top >= dropdownData.top) ? (elementData.top - dropdownData.top) * -1 : elementData.top;
        svgEl.style.top = top + 'px';
        svgEl.style.left = '0px';
    } else {
        // Set dimensions
        svgEl.setAttribute('viewBox', '0 0 ' + dropdownData.width + ' ' + elementData.height);
        svgEl.style.height = elementData.height + 'px';
        svgEl.style.width = dropdownData.width + 'px';

        // Set positions
        svgEl.style.top = '0px';
        svgEl.style.left = (dropdownData.left - elementData.left) + 'px';
    }
}

/***********************************************************************************************************************
 * Update SVG Path
 **********************************************************************************************************************/

const updateSvgPath = (svgPathEl, elementData, dropdownData, x, y, debug) => {
    // Add class for styling
    svgPathEl.classList.add('safe-area__path');

    // Add visible styling if debug is true
    if (!debug) {
        svgPathEl.setAttribute('fill', 'transparent');
    } else {
        svgPathEl.setAttribute('fill', 'rgb(0 256 0 / 0.1)');
        svgPathEl.setAttribute('stroke', 'green');
        svgPathEl.setAttribute('strokeWidth', '0.5');
    }

    // Set pointer-events style
    svgPathEl.style.pointerEvents = 'auto';

    // Add class for styling if element is a link
    if (elementData.isLink) {
        svgPathEl.classList.add('safe-area__path--has-link');
    }

    // Update path according to direction
    if (dropdownData.direction === 'right') {
        const width: number = (dropdownData.left - elementData.left);
        const height: number = (elementData.bottom > dropdownData.bottom) ? (elementData.bottom - dropdownData.top) : dropdownData.height;
        svgPathEl.setAttribute('d', 'M ' + (x - elementData.left) + ' ' + (y - dropdownData.top) + ' L ' + width + ' 0 L ' + width + ' ' + height + ' z');
    } else {
        svgPathEl.setAttribute('d', 'M ' + (x - dropdownData.left) + ' ' + (y - elementData.top) + ' L ' + dropdownData.width + ' ' + elementData.height + ' L 0 ' + elementData.height + ' z');
    }
}

/***********************************************************************************************************************
 * Get Element Data
 **********************************************************************************************************************/

const getElementData = (element) => {
    // Get element bounding rects
    let elementRect: DOMRect = element.getBoundingClientRect();

    // Create data object
    let elementData: elementData = {
        _el: element,
        height: elementRect.height,
        width: elementRect.width,
        top: elementRect.top,
        right: elementRect.right,
        bottom: elementRect.bottom,
        left: elementRect.left,
        centerX: (elementRect.width / 2),
        centerY: (elementRect.height / 2),
        isLink: element.hasAttribute('href')
    }

    // Return data
    return elementData;
};

/***********************************************************************************************************************
 * Get Dropdown Data
 **********************************************************************************************************************/

const getDropdownData = (dropdown, direction) => {
    // Save the current style attribute if available
    let style: string = '';
    if (dropdown.hasAttribute('style')) {
        style = dropdown.getAttribute('style');
    }

    // Set styling of dropdown to get data
    dropdown.style.display = 'block';

    // Get element bounding rects
    let dropdownRect: DOMRect = dropdown.getBoundingClientRect();

    // Create data object
    const dropdownData: dropdownData = {
        _el: dropdown,
        height: dropdownRect.height,
        width: dropdownRect.width,
        top: dropdownRect.top,
        right: dropdownRect.right,
        bottom: dropdownRect.bottom,
        left: dropdownRect.left,
        direction: direction,
        style: style
    }

    // Reset style attribute
    dropdown.setAttribute('style', style);

    // Return data
    return dropdownData;
};

/***********************************************************************************************************************
 * Generate Safe Areas
 **********************************************************************************************************************/

const generateSafeTriangles = (input, options: options) => {

    // Merge default options and custom options
    let defaultOptions: options = {
        delay: 100,
        debug: false
    };
    options = {...defaultOptions, ...options};

    let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.safe-area__item--js');

    if (typeof input === 'string' || input instanceof String) {
        elements = document.querySelectorAll(input.toString());
    } else if (NodeList.prototype.isPrototypeOf(input)) {
        elements = input;
    }

    elements.forEach((element: HTMLElement) => {
        // Dropdown
        const dropdownId: string = element.dataset.safeTriangleDropdown;
        if (dropdownId != '') {
            const dropdown: HTMLElement = document.querySelector('div[data-safe-triangle-dropdown="' + dropdownId + '"]');
            if (dropdown) {
                const dropdownDirection: string = element.dataset.safeTriangleDirection ?? 'down';
                let dropdownData: dropdownData = getDropdownData(dropdown, dropdownDirection);

                // Add classes to element
                element.classList.add('safe-area__item', 'safe-area__item--js');

                let elementData: elementData = getElementData(element);

                if (options.debug) {
                    // Add extra debug class
                    element.classList.add('safe-area__item--debug');
                }

                // Create SVG
                const svgEl: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                updateSvg(svgEl, elementData, dropdownData);

                // Create SVG Path
                const svgPathEl: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                if (dropdownDirection == 'right') {
                    updateSvgPath(svgPathEl, elementData, dropdownData, 0, 0, options.debug);
                } else {
                    updateSvgPath(svgPathEl, elementData, dropdownData, elementData.centerX, elementData.centerY, options.debug);
                }

                // Add Path to SVG
                svgEl.appendChild(svgPathEl);

                // Add SVG to element
                element.appendChild(svgEl);

                // Redraw SVG on mouseEnter (fix for child dropdowns & transform styling)
                element.addEventListener('mouseenter', (e: MouseEvent) => {
                    elementData = getElementData(element);
                    dropdownData = getDropdownData(dropdown, dropdownDirection);
                    updateSvg(svgEl, elementData, dropdownData);
                });

                // Element mousemove update path
                element.addEventListener('mousemove', (e: MouseEvent) => {
                    // Mouse position
                    const x: number = e.clientX;
                    const y: number = e.clientY;

                    setTimeout(() => {
                        updateSvgPath(svgPathEl, elementData, dropdownData, x, y, options.debug);
                    }, options.delay);
                });

                // Get width on resize and update SVG width
                window.addEventListener('resize', () => {
                    dropdownData = getDropdownData(dropdown, dropdownDirection);
                    elementData = getElementData(element);
                    updateSvg(svgEl, elementData, dropdownData);
                });
            }
        }
    });
};

export default generateSafeTriangles;
