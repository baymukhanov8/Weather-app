const API_KEY = '2cd95b6e598abf047fe17cbf057abe97';

const searchBtn = document.querySelector('.search');
const searchInput = document.querySelector('#city-input');
const warningHeading = document.querySelector('.warning');

function getURL(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
}
function getFlagURL(country) {
    return `https://flagsapi.com/${country}/flat/32.png`;
}
function getWeatherIcon(icon) {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

async function clickHandler() {
    const request = searchInput.value;
    const response = await fetch(getURL(request), {
        method: 'GET',
    });
    const data = await response.json();
    warningHeading.remove();
    document.querySelector('.result').innerHTML = init();
    document.querySelector('.name h2').textContent = data.name;
    document.querySelector('.name img').src = getFlagURL(data.sys.country);
    document.querySelector('.temperature img').src = getWeatherIcon(
        data.weather[0].icon,
    );
    document.querySelector(
        '.temperature .temp span',
    ).textContent = `${Math.floor(data.main.temp)}°C`;
    document.querySelector('.description').textContent =
        data.weather[0].description;
    document.querySelector('#clouds').textContent = data.clouds.all;
    document.querySelector('#humidity').textContent = data.main.humidity;
    document.querySelector('#pressure').textContent = data.main.pressure;
    document.querySelector('#wind').textContent = data.wind.speed;
}

function init() {
    return `
        <div class="name">
            <h2></h2>
            <img src="" alt="" />
        </div>

        <div class="temperature">
            <img
                src=""
                alt=""
            />
            <div class="temp">
                <span></span>
            </div>
        </div>
        <p class="description"></p>
        <ul>
            <li>
                <span>clouds</span>
                <i class="fa-solid fa-cloud"></i>
                <span id="clouds"></span>%
            </li>
            <li>
                <span>humidity</span>
                <i class="fa-solid fa-droplet"></i>
                <span id="humidity"></span>%
            </li>
            <li>
                <span>pressure</span>
                <i class="fa-solid fa-gauge"></i>
                <span id="pressure"></span>hPa
            </li>
            <li>
                <span>wind speed</span>
                <i class="fa-solid fa-wind"></i>
                <span id="wind"></span>km/h
            </li>
        </ul>
    `;
}

searchBtn.addEventListener('click', clickHandler);
