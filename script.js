const locationInput = document.querySelector(".card-search__input");
const divEl = document.querySelector(".card-data");

async function getData(location) {
  const _URL = `http://api.weatherapi.com/v1/current.json?key=4613355854ed4061bc9101712220910=${location}`;
  try {
    const response = await fetch(_URL);
    const data = await response.json();
    renderData(data);
  } catch (error) {
    divEl.append(`Something went wrong, please try again.`);
  }
}

function renderData(data) {
  const html = ` 
    <div class="card-data__primary">
    <h2 class="card-data__primary__location">${data.location.name}</h2>
    <p>${data.location.country}</p>
    <p class="card-data__primary__temp">${data.current.temp_c}°C</p>
  </div>
    <ul class="card-data__secondary">
    <li>Condition: ${data.current.condition.text}</li>
    <li>Wind: ${data.current.wind_kph}km/h</li>
    <li>Wind direction: ${data.current.wind_dir}</li>
    <li>Humidity: ${data.current.humidity}</li>
    <li> UV index: ${data.current.uv}</li>
    </ul>
    `;
  divEl.insertAdjacentHTML("beforeend", html);
}

document.querySelector(".fa-magnifying-glass").addEventListener("click", () => {
  locationInput.focus();
  if (locationInput.value !== "") {
    divEl.replaceChildren();
    getData(locationInput.value);
    locationInput.blur();
    locationInput.value = "";
  }
});

document.querySelector(".fa-location-arrow").addEventListener("click", () => {
  divEl.replaceChildren();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
      getData(coords);
    },
    (err) => {
      divEl.append(
        `Please allow device to use geolocation or search for it manually.`
      );
    }
  );
});
