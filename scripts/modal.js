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

    toggleClass('hidden', cover, modal);
    addClass('in', cover, modal);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    firstInput.focus();

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    function submit(event) {
        event.preventDefault();
        modal.addEventListener('animationend', exit);
        addClass('out', modal, cover);
    }

    function cancel(event) {
        modal.addEventListener('animationend', exit);
        addClass('out', modal, cover);
    }

    function exit() {
        toggleClass('hidden', modal, cover);
        removeClass('in', modal, cover);
        removeClass('out', modal, cover);
        removeEvents();
        callback();
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

    function toggleClass(className, ...elements) {
        elements.forEach(element => element.classList.toggle(className));
    }

    function removeClass(className, ...elements) {
        elements.forEach(element => element.classList.remove(className));
    }

    function addClass(className, ...elements) {
        elements.forEach(element => element.classList.add(className));
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
