// Retrieve data from localStorage
const formData = JSON.parse(localStorage.getItem('membershipFormData'));

// Display the form data
if (formData) {
    const formDataList = document.getElementById('formDataList');
    formDataList.innerHTML = `
        <li><strong>First Name:</strong> ${formData.firstName}</li>
        <li><strong>Last Name:</strong> ${formData.lastName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Mobile Phone:</strong> ${formData.phone}</li>
        <li><strong>Organization Name:</strong> ${formData.orgName}</li>
        <li><strong>Membership Level:</strong> ${formData.membership}</li>
        <li><strong>Timestamp:</strong> ${new Date(formData.timestamp).toLocaleString()}</li>
    `;
} else {
    document.body.innerHTML = '<p>No data found. Please fill out the form first.</p>';
}