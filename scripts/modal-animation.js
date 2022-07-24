const buttons = document.querySelectorAll('.button');
const container = document.getElementById('modal-container');
const body = document.querySelector('body');

// buttons.forEach(button => {
//     button.addEventListener('click', event => {
//         let buttonId = event.target.getAttribute('id');
        container.classList = '';
        container.classList.add(buttonId);
        body.classList.add('modal-active');
//     });
// });

// all buttons add event click
// buttonId = button id
// set classlist on container to nothing
// add buttonId to classlist on container
// add class to body

// $('.button').click(function () {
//     var buttonId = $(this).attr('id');
//     $('#modal-container').removeAttr('class').addClass(buttonId);
//     $('body').addClass('modal-active');
// });

container.addEventListener('click', event => {
    container.classList.add('out');
    body.classList.remove('modal-active');
});

// add click event to modal container
// add class to container "out"
// remove class from body
// $('#modal-container').click(function () {
//     $(this).addClass('out');
//     $('body').removeClass('modal-active');
// });
