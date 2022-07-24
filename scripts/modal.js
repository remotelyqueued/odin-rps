/**
 *
 * @param {String} html parsed as HTML
 * @param {HTMLDivElement} modal
 * @param {HTMLDivElement} cover
 */
export function updateModal(html, modal, cover) {
    // another method to do this
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

    const form = document.forms.form;
    const [firstInput, secondInput] = form.elements;

    toggleHidden(cover, modal);
    toggleIn(cover, modal);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    firstInput.focus();
    document.addEventListener('click', preventEscape);

    document.querySelector('pre').innerHTML = html;
    document.getElementById('message').innerHTML = html;

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    function submit(event) {
        event.preventDefault(); // todo: fixes abrubt animation, buttons are inert lol
        modal.addEventListener('animationend', exit);
        toggleIn(modal, cover);
        toggleOut(modal, cover);
    }

    // focus trap
    function keydown(event) {
        if (isEscape(event)) {
            cancel();
        }
        if (event.shiftKey && isTab(event)) {
            event.preventDefault();
            if (document.activeElement == firstInput) {
                secondInput.focus();
            } else {
                firstInput.focus();
            }
        } else if (isTab(event)) {
            event.preventDefault();
            if (document.activeElement == firstInput) {
                secondInput.focus();
            } else {
                firstInput.focus();
            }
        }
    }

    /**
     * cancel() leaves the modal
     * @param {Event} event
     */
    function cancel(event) {
        modal.addEventListener('animationend', exit);
        toggleIn(modal, cover);
        toggleOut(modal, cover);
    }

    /**
     * @param {Event} event
     * @returns {Boolean}
     */
    function isEscape(event) {
        return (
            event.key === 'Escape' ||
            event.key === 'Esc' ||
            event.keyCode === 27
        );
    }

    // --- helper functions ----------------------------------------------------
    /**
     *
     * @param {Event} event
     */
    function preventEscape(event) {
        firstInput.focus();
    }

    function isTab(event) {
        return event.key === 'Tab' || event.keyCode === 9;
    }

    function toggleHidden(...elements) {
        elements.forEach(element => element.classList.toggle('hidden'));
    }

    function toggleIn(...elements) {
        elements.forEach(element => element.classList.toggle('in'));
    }

    function toggleOut(...elements) {
        elements.forEach(element => element.classList.toggle('out'));
    }

    function exit() {
        toggleOut(modal, cover);
        removeEvents();
        cover.classList.add('hidden');
        modal.classList.add('hidden');
    }

    function removeEvents() {
        form.removeEventListener('submit', submit);
        form.removeEventListener('keydown', keydown);
        form.cancel.removeEventListener('click', cancel);
        document.removeEventListener('click', preventEscape);
        modal.removeEventListener('animationend', exit);
    }
}
