// document.addEventListener("DOMContentLoaded", async () => {
//     const carouselContainer = document.querySelector("#businessCarousel");
//     const toggleViewButton = document.getElementById("toggleViewButton");
//     const prevButton = document.getElementById("prevButton");
//     const nextButton = document.getElementById("nextButton");

//     let isGridView = true;

//     // Fetch data from the members.json file
//     try {
//         const response = await fetch('data/members.json');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Function to render members as cards (grid view)
//         const renderCards = () => {
//             carouselContainer.innerHTML = "";
//             carouselContainer.classList.add("grid-view");
//             carouselContainer.classList.remove("list-view");

//             data.empresas.forEach(member => {
//                 const card = document.createElement("div");
//                 card.classList.add("business-card");

//                 card.innerHTML = `
//                     <img src="images/${member.imagen}" alt="${member.nombre}">
//                     <h4>${member.nombre}</h4>
//                     <p>${member.direccion}</p>
//                     <p>Teléfono: ${member.telefono}</p>
//                     <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>
//                     <p>Membresía: ${["Miembro", "Plata", "Oro"][member.membresia - 1]}</p>
//                 `;

//                 carouselContainer.appendChild(card);
//             });
//         };

//         // Function to render members as a list
//         const renderList = () => {
//             carouselContainer.innerHTML = "";
//             carouselContainer.classList.add("list-view");
//             carouselContainer.classList.remove("grid-view");

//             data.empresas.forEach((member, index) => {
//                 const listItem = document.createElement("div");
//                 listItem.classList.add("business-card");
//                 listItem.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f0f0f0";

//                 listItem.innerHTML = `
//                     <h4>${member.nombre}</h4>
//                     <p>${member.direccion}</p>
//                     <p>Teléfono: ${member.telefono}</p>
//                     <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>
//                     <p>Membresía: ${["Miembro", "Plata", "Oro"][member.membresia - 1]}</p>
//                 `;

//                 carouselContainer.appendChild(listItem);
//             });
//         };

//         // Initial render as grid view
//         renderCards();

//         // Toggle between grid and list view
//         toggleViewButton.addEventListener("click", () => {
//             isGridView = !isGridView;
//             if (isGridView) {
//                 renderCards();
//             } else {
//                 renderList();
//             }
//         });

//         // Event listener for the previous button
//         prevButton.addEventListener("click", () => {
//             carouselContainer.scrollBy({
//                 top: 0,
//                 left: -300,
//                 behavior: "smooth"
//             });
//         });

//         // Event listener for the next button
//         nextButton.addEventListener("click", () => {
//             carouselContainer.scrollBy({
//                 top: 0,
//                 left: 300,
//                 behavior: "smooth"
//             });
//         });

//     } catch (error) {
//         console.error("Error fetching or processing data:", error);
//     }
// });
document.addEventListener("DOMContentLoaded", async () => { 
    const carouselContainer = document.querySelector("#businessCarousel");
    const toggleViewButton = document.getElementById("toggleViewButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    let isGridView = true;

    // Fetch data from the members.json file
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Function to render members as cards (grid view)
        const renderCards = () => {
            carouselContainer.innerHTML = "";
            carouselContainer.classList.add("grid-view");
            carouselContainer.classList.remove("list-view");
            prevButton.style.display = "block"; // Show previous button
            nextButton.style.display = "block"; // Show next button

            data.empresas.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("business-card");

                card.innerHTML = `
                    <img src="images/${member.imagen}" alt="${member.nombre}">
                    <h4>${member.nombre}</h4>
                    <p>${member.direccion}</p>
                    <p>Teléfono: ${member.telefono}</p>
                    <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>
                    <p>Membresía: ${["Miembro", "Plata", "Oro"][member.membresia -1]}</p>
                `;

                carouselContainer.appendChild(card);
            });
        };

        // Function to render members as a list
        const renderList = () => {
            carouselContainer.innerHTML = "";
            carouselContainer.classList.add("list-view");
            carouselContainer.classList.remove("grid-view");
            prevButton.style.display = "none"; // Hide previous button
            nextButton.style.display = "none"; // Hide next button

            data.empresas.forEach(member => {
                const listItem = document.createElement("div");
                listItem.classList.add("business-card");
                listItem.style.display = "flex"; // Use flexbox for inline layout
                listItem.style.alignItems = "center"; // Center align items
                listItem.style.justifyContent = "space-between"; // Space between items

                // listItem.innerHTML = `
                //     <div style="flex: 1; display: flex; align-items: center;">
                //         <img src="images/${member.imagen}" alt="${member.nombre}" style="width: 50px; height: auto; margin-right: 10px;">
                //         <div>
                //             <h4>${member.nombre}</h4>
                //             <p>${member.direccion}</p>
                //             <p>Teléfono: ${member.telefono}</p>
                //         </div>
                //     </div>
                //     <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>  
                    
                //     <p>Membresía: ${["Miembro", "Plata", "Oro"][member.membresia - 1]}</p>
                //     `;
                listItem.innerHTML = `
                    <div style="flex: 1; display: flex; align-items: center;">
                        <img src="images/${member.imagen}" alt="${member.nombre}" style="width: 50px; height: auto; margin-right: 10px;">
                        <div>
                            <h4>${member.nombre}</h4>
                            <p>${member.direccion}</p>
                            <p>Teléfono: ${member.telefono}</p>
                        </div>
                    </div>
                    <div style="display: block; margin-top: 10px;"> <!-- Contenedor para el sitio web y membresía -->
                        <p><a href="${member.sitio_web}" target="_blank">Sitio web</a></p>
                        <p style="margin-top: 5px;">Membresía: ${["Miembro", "Plata", "Oro"][member.membresia - 1]}</p>
                    </div>
                `;


                carouselContainer.appendChild(listItem);
            });
        };

        // Initial render as grid view
        renderCards();

        // Toggle between grid and list view
        toggleViewButton.addEventListener("click", () => {
            isGridView = !isGridView;
            if (isGridView) {
                renderCards();
            } else {
                renderList();
            }
        });

        // Event listener for the previous button
        prevButton.addEventListener("click", () => {
            carouselContainer.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth"
            });
        });

        // Event listener for the next button
        nextButton.addEventListener("click", () => {
            carouselContainer.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth"
            });
        });

    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
});
  