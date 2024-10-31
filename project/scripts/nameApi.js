
// nameApi.js
import { showModal } from './modal.js';

export function initNameSearch() {
    const searchButton = document.getElementById('search-button');
    searchButton.onclick = buscarNombre;
}

// Function to fetch data from API and display result in container
async function buscarNombre() {
    const name = document.getElementById('name-input').value.trim();
   // const learnMoreBtn = document.getElementById('learn-more-button');
    if (!name) return; // Exit if input is empty to avoid unnecessary API calls

    const apiUrl = `https://www.behindthename.com/api/lookup.json?name=${name}&key=fr999226124`;
    const resultContainer = document.getElementById('name-results');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API response error');
        const data = await response.json();

        // Clear and update results in a single operation to avoid excess DOM manipulation
        resultContainer.innerHTML = ''; 
        if (data && data.length > 0) {
            const { name: fetchedName, gender } = data[0];
            const genderLabel = gender === 'f' ? 'Female' : gender === 'm' ? 'Male' : 'Unisex';

            // Create result item with name and gender
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Name:</strong> ${fetchedName} <br> <strong>Gender:</strong> ${genderLabel}  `;
            resultContainer.appendChild(listItem);

            // Add "Learn More" button
            const learnMoreBtn = document.createElement('button');
            learnMoreBtn.textContent = 'Learn More';
            learnMoreBtn.classList.add('info-link');
            resultContainer.appendChild(learnMoreBtn);
            learnMoreBtn.style.display = 'inline-block';
            learnMoreBtn.onclick = () => fetchNameInfo(name);
            listItem.appendChild(learnMoreBtn);
        } else {
            resultContainer.textContent = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
        resultContainer.textContent = 'Error fetching data from API.';
    }
}

// Function to fetch additional info from local JSON and open modal
async function fetchNameInfo(name) {
    try {
        const response = await fetch('data/names.json');
        if (!response.ok) throw new Error("Error fetching JSON data.");

        const data = await response.json();
        const matchedName = data.namesData.find(n => n.name.toLowerCase() === name.toLowerCase());

        if (matchedName) {
            showModal(`<strong>Name:</strong> ${matchedName.name} <br>
                       <strong>Origin:</strong> ${matchedName.origin} <br>
                       <strong>Meaning:</strong> ${matchedName.meaning}`);
        } else {
            showModal("No information available.");
        }
    } catch (error) {
        console.error('Error fetching name data:', error);
        showModal("Error fetching data.");
    }
}

