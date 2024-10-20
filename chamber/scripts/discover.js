// Lazy loading for images
// document.addEventListener("DOMContentLoaded", function () {
//     const lazyloadImages = document.querySelectorAll("img.lazyload");
    
//     if ("IntersectionObserver" in window) {
//         const imageObserver = new IntersectionObserver(function (entries, observer) {
//             entries.forEach(function (entry) {
//                 if (entry.isIntersecting) {
//                     const image = entry.target;
//                     image.src = image.dataset.src;
//                     image.classList.remove("lazyload");
//                     imageObserver.unobserve(image);
//                 }
//             });
//         });

//         lazyloadImages.forEach(function (image) {
//             imageObserver.observe(image);
//         });
//     }
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const lazyloadImages = document.querySelectorAll("img.lazyload");
    
//     if ("IntersectionObserver" in window) {
//         const imageObserver = new IntersectionObserver(function (entries, observer) {
//             entries.forEach(function (entry) {
//                 if (entry.isIntersecting) {
//                     const image = entry.target;
//                     image.src = image.dataset.src;  // Aquí se establece el atributo src solo cuando es visible
//                     image.classList.remove("lazyload");
//                     imageObserver.unobserve(image);
//                 }
//             });
//         }, {
//             rootMargin: "0px 0px 200px 0px",  // Cargar las imágenes 200px antes de que entren a la vista
//             threshold: 0.1  // Cargar cuando el 10% de la imagen esté visible
//         });

//         lazyloadImages.forEach(function (image) {
//             imageObserver.observe(image);
//         });
//     }
// });
// Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
    const lazyloadImages = document.querySelectorAll("img.lazyload");
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src; // Usamos data-src para la carga diferida
                    image.classList.remove("lazyload"); // Eliminamos la clase lazyload
                    image.classList.add("fade-in"); // Añadimos una clase para animación
                    imageObserver.unobserve(image); // Dejar de observar una vez cargada
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    }
});

// Visitor Info with localStorage
window.onload = function () {
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetweenVisits = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysBetweenVisits < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetweenVisits === 1) {
            visitorMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitorMessage.textContent = `You last visited ${daysBetweenVisits} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
};
