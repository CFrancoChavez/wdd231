import { showModal } from './ModalModul.mjs';

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const courseGrid = document.querySelector('.course-grid');

function renderCourses(filter = 'all') {
    courseGrid.innerHTML = '';
    courses.filter(course => filter === 'all' || course.subject === filter)
           .forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.classList.add('course');
                if (course.completed) courseDiv.classList.add('completed');

                courseDiv.innerHTML = `
                    <h3>${course.subject} ${course.number} </h3>`
                    // <p><strong>Credits:</strong> ${course.credits}</p>
                    // <p><strong>Certificate:</strong> ${course.certificate}</p>
                    // <p>${course.description}</p>
                    // <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
                ;
                courseDiv.addEventListener('click', () => {
                    showModal(course); // Mostrar el modal con la información del curso
                });
                courseGrid.appendChild(courseDiv);
            });
}

document.getElementById('all').addEventListener('click', () => renderCourses('all'));
document.getElementById('cse').addEventListener('click', () => renderCourses('CSE'));
document.getElementById('wdd').addEventListener('click', () => renderCourses('WDD'));

// Initial render
renderCourses();
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');

    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        if (hamburgerButton.innerHTML === '&#9776;') {
            hamburgerButton.innerHTML = '&#10005;'; // Cambia al icono de "X"
        } else {
            hamburgerButton.innerHTML = '&#9776;'; // Cambia al icono de hamburguesa
        }
    });
});

// Función para observar la visibilidad de los elementos
function revealOnScroll() {
    const images = document.querySelectorAll('.profile-pic, .location-pic');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    images.forEach(image => observer.observe(image));
}

// Ejecutar la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', revealOnScroll);
