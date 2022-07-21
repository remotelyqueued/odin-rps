export function updateModal(html, modal, cover) {
    const form = document.forms['form'];
    const [firstInput, secondInput] = form.elements;
   
    toggle(cover, modal);
    toggleButtons();
    firstInput.focus();

    document.querySelector('pre').innerHTML = html;
    document.getElementById('message').innerHTML = html;

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    function toggle(...elements) {
        elements.forEach(element => element.classList.toggle('hidden'));
    }

    function submit(event) {
        toggle(cover, modal);
        toggleButtons();
        removeEvents();
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

    function cancel(event) {
        toggle(cover, modal);
        removeEvents();
    }

    function isEscape(event) {
        return (
            event.key === 'Escape' ||
            event.key === 'Esc' ||
            event.keyCode === 27
        );
    }

    function isTab(event) {
        return event.key === 'Tab' || event.keyCode === 9;
    }

    function removeEvents() {
        form.removeEventListener('submit', submit);
        form.removeEventListener('keydown', keydown);
        form.cancel.removeEventListener('click', cancel);
    }

    function toggleButtons() {
        document
            .querySelectorAll('button')
            .forEach(button => (button.disabled = !button.disabled));
    }
}
