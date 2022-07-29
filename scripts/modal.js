/**
 * updateModal() updates and shows the modal with the winner of the 5 round game
 *
 * @param {String} html parsed as HTML
 * @param {HTMLDivElement} modal
 * @param {HTMLDivElement} cover
 */
export function updateModal(html, modal, cover, ...callbacks) {
    const form = document.forms.form;
    const [firstInput, secondInput] = form.elements;

    document.getElementById('message').innerHTML = html;

    toggleClass('hidden', cover, modal);
    addClass('in', cover, modal);

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    firstInput.focus();

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    // event listeners
    function submit(event) {
        event.preventDefault();
        modal.addEventListener('animationend', exit);
        addClass('out', modal, cover);
    }

    function cancel(event) {
        modal.addEventListener('animationend', exit);
        addClass('out', modal, cover);
    }

    function exit(event) {
        toggleClass('hidden', modal, cover);
        removeClass('in', modal, cover);
        removeClass('out', modal, cover);
        removeEvents();

        callbacks.forEach(callback => {
            callback();
        });
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

    // helper functions
    function addClass(className, ...elements) {
        elements.forEach(element => element.classList.add(className));
    }

    function removeClass(className, ...elements) {
        elements.forEach(element => element.classList.remove(className));
    }

    function toggleClass(className, ...elements) {
        elements.forEach(element => element.classList.toggle(className));
    }

    function isTab(eventObject) {
        return eventObject.key === 'Tab' || eventObject.keyCode === 9;
    }

    function isEscape(eventObject) {
        return (
            eventObject.key === 'Escape' ||
            eventObject.key === 'Esc' ||
            eventObject.keyCode === 27
        );
    }

    function removeEvents() {
        form.removeEventListener('submit', submit);
        form.removeEventListener('keydown', keydown);
        form.cancel.removeEventListener('click', cancel);
        modal.removeEventListener('animationend', exit);
    }
}
