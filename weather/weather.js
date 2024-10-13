const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.6357&appid=b9a2874331405faf841f67a3ecd83769&units=metric';  //``

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        //console.log(data); // testing only
         displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  
   function displayResults(data) {
    //console.log('hello')
    //console.log(data)
    currentTemp.innerHTML = `${data.list[0].main.temp} °C`
    const iconsrc = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    let desc =  data.list[0].weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
  
    // Mostrar la descripción del clima
    captionDesc.textContent = `${desc}`;
   }
   apiFetch();
//    

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}