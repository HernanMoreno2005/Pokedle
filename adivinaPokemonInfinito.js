import * as datos from "./AdivinaPokemon.js";
let contadorRachaInfinita = document.getElementById("contadorRachaInfinita");

if(localStorage.getItem("rachaMaximaAdivina")){
    contadorRachaInfinita.textContent = datos.fromBase64(localStorage.getItem("rachaMaximaAdivina"));
}
else{
    contadorRachaInfinita.textContent = 0;
}
datos.input.addEventListener("input", () => {
  const value = datos.input.value;

  if (!value) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  let filteredResults = datos.filterPokemon(datos.allPokemon, value);

  let visibleStart = 0;
  let selectedIndex = 0;

  datos.renderVisible();
});