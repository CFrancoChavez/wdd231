document.addEventListener('DOMContentLoaded', async () => {
    async function loadEmpresas() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
            }
            const data = await response.json();
            return data.empresas;
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            return [];
        }
    }

    function mostrarTarjetas(empresas) {
        const filteredMembers = empresas.filter(member => member.membresia >= 2);
        const randomMembers = [];
        while (randomMembers.length < 3 && filteredMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredMembers.length);
            randomMembers.push(filteredMembers.splice(randomIndex, 1)[0]);
        }

        const container = document.getElementById('businessCards');
        container.innerHTML = '';

        randomMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('directory-card');
            card.innerHTML = `
                <img src="images/${member.imagen}" alt="${member.nombre}">
                <h4>${member.nombre}</h4>
                <p>${member.direccion}</p>
                <p>Teléfono: ${member.telefono}</p>
                <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>
                <p>Membresía: ${["Miembro", "Plata", "Oro"][member.membresia - 1]}</p>
            `;
            container.appendChild(card);
        });
    }

    const empresas = await loadEmpresas();
    if (empresas.length > 0) {
        mostrarTarjetas(empresas);
    }
});
