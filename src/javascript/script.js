
//Fazer q a pag n atualize qnd lupa é clicicada
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;
// Se n hover nd apacerá uma msg de erro
    if(!cityName) {
        return showAlert('Digite uma cidade!');
    }
// importação API
    const apiKey = 'affff9ad98f321cfc2baf6cbba1320cb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    const results = await fetch(apiUrl);
    const json = await results.json();

// condicional para pegar tudos os dados, e caso n for possivel aparecer na tela terá um aviso
    if (json.cod === 200){
        // recebendo infomações
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
        showAlert('Não foi possivel localizar...')
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

    if (fundo) { // Verifica se a div foi encontrada
        if (hr >= 6 && hr < 12) {
            hrdia.innerHTML = `${hr}:${min}, Bom dia!`;
            fundo.style.backgroundColor = "#4FC3F7"; // Cor para manhã #4FC3F7"
            header.style.backgroundColor = "#4FC3F7";
            hrdia.style.fontSize = "1.5em";
        } else if (hr >= 12 && hr < 18) {
            hrdia.innerHTML = `${hr}:${min}, Boa Tarde!`;
            fundo.style.backgroundColor = "#CC5500"; // Cor para tarde #FF7F50";
            header.style.backgroundColor = "#CC5500";
            hrdia.style.fontSize = "1.5em";

        } else if (hr >= 18 && hr < 24) {
            hrdia.innerHTML = `${hr}:${min}, Boa Noite!`;
            fundo.style.backgroundColor = "#191970"; // Cor para noite
            header.style.backgroundColor = "#191970";
            hrdia.style.fontSize = "1.5em";
        } else {
            hrdia.innerHTML = `${hr}:${min}, Boa Madrugada!`;
            fundo.style.backgroundColor = "#2C6C8B"; // Cor para madrugada
            header.style.backgroundColor = "#2C6C8B";
            hrdia.style.fontSize = "1.5em";
        }
    } else {
    }
}
