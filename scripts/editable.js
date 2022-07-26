/**
 * makeEditable(elem) makes the Array of elements editable
 * 
 * @param {Array} elements HTMLElements
 */
export function makeEditable(...elements) {
    elements.forEach(element => {   
        element.setAttribute('contenteditable', true);
        element.setAttribute('spellcheck', false);
    });
}
