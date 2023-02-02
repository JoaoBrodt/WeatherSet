const cidade = document.querySelector(".card-header");
const data = document.querySelector(".data");
const descricao = document.querySelector(".descricao");
const temperatura = document.querySelector(".temperatura");
const sensacao = document.querySelector(".sensacao");
const humidade = document.querySelector(".humidade");
const vento = document.querySelector(".vento");
const imagem = document.querySelector(".content-img");
const botao = document.getElementById("button-addon2");
const defineCidade = document.getElementById("defineCidade");
const unidade = {
  celcius: "°C",
  farenheit: "°F",
};

const api = {
  key: "46a80a5cb3c21928e15e5f0aabe5995e",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

function searchResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      defineClima(response);
    });
}
function defineClima(clima) {
  cidade.innerHTML = `${clima.name}, ${clima.sys.country}`;
  descricao.innerHTML = clima.weather[0].description;
  temperatura.innerHTML = `${parseInt(clima.main.temp)} ${unidade.celcius}`;
  sensacao.innerHTML = `${parseInt(clima.main.feels_like)} ${unidade.celcius}`;
  humidade.innerHTML = `${clima.main.humidity} %`;
  vento.innerHTML = `${parseInt(clima.wind.speed * 3.6)} Km/h`;
  const iconName = clima.weather[0].icon;
  imagem.innerHTML = `<img src="./icons/${iconName}.png">`;
  data.innerHTML = criaData();
}

function criaData() {
  let now = new Date();
  let dia = now.getDate();
  const options = { month: "long" };
  let mes = Intl.DateTimeFormat("pt-BR", options).format();
  let ano = now.getFullYear();
  return `${dia} de ${mes} de ${ano}`;
}

function selecionaCidade() {
  let city = defineCidade.value;
  searchResults(city);
  defineCidade.value = "";
}

searchResults("Ribeirão Preto");

botao.addEventListener("click", selecionaCidade);

botao.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") selecionaCidade();
});

defineCidade.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") selecionaCidade();
});
