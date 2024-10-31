// // modal.js
// export function showModal(content) {
//     const modal = document.getElementById('infoModal');
//     const modalContent = document.getElementById('modalContent');
//     modalContent.innerHTML = content;
//     modal.style.display = 'flex';
    

// }

// export function closeModal() {
//     document.getElementById('infoModal').style.display = 'none';
// }

// // Event listener for modal close button
// document.querySelectorAll('.close').forEach(closeBtn => {
//     closeBtn.addEventListener('click', closeModal);
// });
// modal.js
export function showModal(content) {
    const modal = document.getElementById('infoModal');
    const modalContent = document.getElementById('modalContent');
    
    // Set modal content and add close button
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <div>${content}</div>
    `;
    modal.style.display = 'flex';
    
    // Add event listener to close the modal on outside click
    window.addEventListener('click', closeModalOnClickOutside);

    // Event listener for "X" close button inside the modal
    document.querySelector('.close').addEventListener('click', closeModal);
}

export function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none';
    
    // Remove outside click event listener to prevent memory leaks
    window.removeEventListener('click', closeModalOnClickOutside);
}

// Function to close modal on outside click
function closeModalOnClickOutside(event) {
    const modal = document.getElementById('infoModal');
    const modalContent = document.getElementById('modalContent');
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeModal();
    }
}

