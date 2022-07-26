/**
 * updateModal() updates the modal with the winner of the 5 round game
 *
 * @param {String} html parsed as HTML
 * @param {HTMLDivElement} modal
 * @param {HTMLDivElement} cover
 */
export function updateModal(html, modal, cover, callback) {
    const form = document.forms.form;
    const [firstInput, secondInput] = form.elements;

    document.querySelector('pre').innerHTML = html;
    document.getElementById('message').innerHTML = html;

    removeOut(modal, cover);
    toggleHidden(cover, modal);
    setIn(cover, modal);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    firstInput.focus();

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    function submit(event) {
        event.preventDefault();
        modal.addEventListener('animationend', exit);
        removeIn(cover, modal);
        setOut(modal, cover);
    }

    function cancel(event) {
        modal.addEventListener('animationend', exit);
        removeIn(modal, cover);
        setOut(modal, cover);
    }

    function exit() {
        toggleHidden(modal, cover);
        removeOut(modal, cover);
        callback();
        removeEvents();
    }

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

    function toggleHidden(...elements) {
        elements.forEach(element => element.classList.toggle('hidden'));
    }

    function removeOut(...elements) {
        elements.forEach(element => element.classList.remove('out'));
    }

    function removeIn(...elements) {
        elements.forEach(element => element.classList.remove('in'));
    }

    function setOut(...elements) {
        elements.forEach(element => element.classList.add('out'));
    }

    function setIn(...elements) {
        elements.forEach(element => element.classList.add('in'));
    }

    function isTab(event) {
        return event.key === 'Tab' || event.keyCode === 9;
    }

    function isEscape(event) {
        return (
            event.key === 'Escape' ||
            event.key === 'Esc' ||
            event.keyCode === 27
        );
    }

    function removeEvents() {
        form.removeEventListener('submit', submit);
        form.removeEventListener('keydown', keydown);
        form.cancel.removeEventListener('click', cancel);
        modal.removeEventListener('animationend', exit);
    }
}
