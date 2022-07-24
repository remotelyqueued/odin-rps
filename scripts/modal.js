export function updateModal(html, modal, cover) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

    // console.log(document.activeElement);

    // const main = document.querySelector('main');
    // const header = document.querySelector('header');
    // const footer = document.querySelector('footer');

    // function toggleInert() {
    //     main.toggleAttribute('inert');
    //     header.toggleAttribute('inert');
    //     footer.toggleAttribute('inert');
    // }

    const form = document.forms.form;
    const [firstInput, secondInput] = form.elements;

    toggleHidden(cover, modal);
    toggleIn(cover, modal);

    firstInput.focus(); // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    document.addEventListener('click', preventEscape);

    document.querySelector('pre').innerHTML = html;
    document.getElementById('message').innerHTML = html;

    form.addEventListener('submit', submit);
    form.addEventListener('keydown', keydown);
    form.cancel.addEventListener('click', cancel);

    function toggleHidden(...elements) {
        elements.forEach(element => element.classList.toggle('hidden'));
    }

    function toggleIn(...elements) {
        elements.forEach(element => element.classList.toggle('in'));
    }

    function toggleOut(...elements) {
        elements.forEach(element => element.classList.toggle('out'));
    }

    function submit(event) {
        toggleIn(modal, cover);
        toggleOut(modal, cover);

        modal.addEventListener('animationend', exit);
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
        toggleIn(modal, cover);
        toggleOut(modal, cover);

        modal.addEventListener('animationend', exit);
    }

    function isEscape(event) {
        return (
            event.key === 'Escape' ||
            event.key === 'Esc' ||
            event.keyCode === 27
        );
    }

    function preventEscape(event) {
        firstInput.focus();
    }

    function isTab(event) {
        return event.key === 'Tab' || event.keyCode === 9;
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
