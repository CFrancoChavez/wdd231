// Obtén el elemento del footer donde deseas mostrar la fecha y hora
var lastModifiedElement = document.getElementById("lastModified");

// Obtiene la fecha y hora actual
var currentDate = new Date();

// Formatea la fecha y hora actual como deseas
var formattedDate = currentDate.toLocaleString();

// Establece el texto dentro del elemento del footer
lastModifiedElement.textContent = formattedDate;
