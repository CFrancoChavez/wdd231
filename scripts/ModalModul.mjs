export function showModal(courses) {
    // Crear el modal si no existe en el DOM
    let modal = document.getElementById('courseModal');
    if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'courseModal';
        modal.classList.add('modal');
        document.body.appendChild(modal);
    }

    // Configurar el contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${courses.subject} ${courses.number}: ${courses.title}</h2>
            <p><strong>Credits:</strong> ${courses.credits}</p>
            <p><strong>Certificate:</strong> ${courses.certificate}</p>
            <p>${courses.description}</p>
            <p><strong>Technology:</strong> ${courses.technology.join(', ')}</p>
        </div>
    `;

    // Mostrar el modal
    modal.showModal();

    // Event listener para cerrar el modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    // Cerrar el modal cuando se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}
