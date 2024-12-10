const hamburger = document.querySelector('.hamburger-lines');
const menu = document.querySelector('.main-left');
const autoz = document.querySelector('.main-right');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    autoz.classList.toggle('open');
});
