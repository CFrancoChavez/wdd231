const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});
