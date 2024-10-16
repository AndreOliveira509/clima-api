document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

// Api do viaCEP

    const cep = document.querySelector('#city_name').value;

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    const cityName = data.localidade;
    const logradouro = data.logradouro;
    const bairro = data.bairro;
    const uf = data.uf;

    // Verifica se os dados foram retornados corretamente
    if (!cityName) {
        return showAlert('Digite um CEP válido!');
    }


    // API do OpenWeatherMap
    const apiKey = 'affff9ad98f321cfc2baf6cbba1320cb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    const results = await fetch(apiUrl);
    const json = await results.json();

    // Se a API retornar sucesso, mostrar informações, caso contrário, mostrar alerta
    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        showAlert('Não foi possível localizar...');
    }
});
// mostrando Informações
function showInfo(json){
    showAlert('');
    document.querySelector("#weather").classList.add('show');
    document.querySelector("#header").classList.add('show');


    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
    
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace(".", ",")} <sup>°C </sup>`;

    document.querySelector("#temp_description").innerHTML = `${json.description}`;

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1).toString().replace(".", ",")} <sup>°C </sup>`;

    document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1).toString().replace(".", ",")} <sup>°C </sup>`;

    document.querySelector("#humidity").innerHTML = `${json.humidity}%`;

    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)}km/h`;


}

// a msg de erro no html
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
// mostrar hora em tempo real
function Carregar(){
    var hratual = new Date();
    var hr = hratual.getHours();
    var minatual = new Date();
    var min = minatual.getMinutes().toString().padStart(2, '0');
    var hrdia = document.getElementById("horadia");
    var fundo = document.getElementById("temp");
    var header = document.getElementById("header")
    let vermaisbutton = document.getElementById("vermaisbnt");

    if (fundo) { // Verifica se a div foi encontrada
        if (hr >= 6 && hr < 12) {
            hrdia.innerHTML = `${hr}:${min}, Bom dia!`;
            fundo.style.backgroundColor = "#4FC3F7"; // Cor para manhã #4FC3F7"
            header.style.backgroundColor = "#4FC3F7";
            vermaisbutton.style.backgroundColor = "#4FC3F7";
            hrdia.style.fontSize = "1.5em";
        } else if (hr >= 12 && hr < 18) {
            hrdia.innerHTML = `${hr}:${min}, Boa Tarde!`;
            fundo.style.backgroundColor = "#CC5500"; // Cor para tarde ;
            header.style.backgroundColor = "#CC5500";
            vermaisbutton.style.backgroundColor = "#CC5500";
            hrdia.style.fontSize = "1.5em";

        } else if (hr >= 18 && hr < 24) {
            hrdia.innerHTML = `${hr}:${min}, Boa Noite!`;
            fundo.style.backgroundColor = "#191970"; // Cor para noite
            header.style.backgroundColor = "#191970";
            vermaisbutton.style.backgroundColor = "#191970";
            hrdia.style.fontSize = "1.5em";
        } else {
            hrdia.innerHTML = `${hr}:${min}, Boa Madrugada!`;
            fundo.style.backgroundColor = "#2C6C8B"; // Cor para madrugada
            header.style.backgroundColor = "#2C6C8B";
            vermaisbutton.style.backgroundColor = "#2C6C8B";
            hrdia.style.fontSize = "1.5em";
        }
    } else {
    }
}
// Função para o usuario ver mais coisas

function Vermais() {
    let mostrar = document.getElementById("other_infos");
    let vermaisbutton = document.getElementById("vermaisbnt");
    let weather = document.getElementById("weather");

    if (mostrar.style.display === "none" || mostrar.style.display === "") {
        mostrar.style.display = "grid"; 
        setTimeout(() => {
            mostrar.classList.add("show");
        }, 100); 
        weather.style.height = "71vh";
        vermaisbutton.textContent = "Ver menos";
    } else {
        mostrar.classList.remove("show");
        setTimeout(() => {
            mostrar.style.display = "none"; 
        }, 0); 
        vermaisbutton.textContent = "Ver mais";
        weather.style.height = "36vh";
    }
}



