// Set timestamp in hidden field
document.getElementById('timestamp').value = new Date().toISOString();

// Handle form submission
document.getElementById('membershipForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        orgTitle: document.getElementById('orgTitle').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        orgName: document.getElementById('orgName').value,
        membership: document.getElementById('membership').value,
        description: document.getElementById('description').value,
        timestamp: document.getElementById('timestamp').value
    };

    // Store data in localStorage
    localStorage.setItem('membershipFormData', JSON.stringify(formData));

    // Redirect to thankyou.html
    window.location.href = 'thankyou.html';
});

// Modal functionality remains unchanged
document.querySelectorAll('.info-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'flex';
    });
});

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});
