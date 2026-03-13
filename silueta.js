let pokemonDiario;
let contenedorSilueta = document.getElementById("imagen");
let input = document.getElementById("busqueda");
let allPokemon = [];
let filteredResults = [];
let pokemonUtilizados = [];
let modo;
let idpokemonDia;
let nombrepokemonDia;
let ContenedorRespuestas = document.getElementById("contenedorRespuestas");
let fotoPokemonSeleccionado;
let img
let imgDiario;
let zoom = 2.5;
let corazones = document.querySelectorAll(".corazon");
let contadorFallos = 0;
let modalHeader =  document.querySelector("#modalFinal .modal-header");
let modalFinalE2 =  document.getElementById("modalFinal");
let modalFinal = new bootstrap.Modal(modalFinalE2);
let mensajeFinal =  document.getElementById("mensajeFinal");
let tituloFinal =  document.getElementById("tituloFinal");
let botoncerrar = document.querySelector(".btn-close");
let botonReiniciar = document.querySelector("#botonReiniciar");
let contenedorRacha = document.getElementById("contadorRacha");
let contadorMejorRacha = document.getElementById("contadorRachaInfinita");
let racha;
if(localStorage.getItem("rachaInfinitaSilueta")){
  racha = fromBase64(localStorage.getItem("rachaInfinitaSilueta"));
}
else{
  racha = 0 ;
}
contenedorRacha.textContent = racha;
let mejorRacha;
if(localStorage.getItem("mejorRachaSilueta")){
  mejorRacha = fromBase64(localStorage.getItem("mejorRachaSilueta"));
}
else{
  mejorRacha = 0;
}
contadorMejorRacha.textContent = mejorRacha;

botonReiniciar.addEventListener("click",() =>{
  location.reload();
})
botoncerrar.addEventListener("click", () => {
setTimeout(() => {
    img.style.filter = "brightness(1)";
    img.style.transform = "scale(1)";
  }, 150); 
})

// Encriptar
function toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
}

// Desencriptar
 function fromBase64(str) {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}
function pokemonUsados(){
    if(localStorage.getItem("pokemonUsadosSilueta")){
        pokemonUtilizados = JSON.parse(localStorage.getItem("pokemonUsadosSilueta"))
    }
    for(let x = 0; x< pokemonUtilizados.length;x++){
        compararPokemon(pokemonUtilizados[x],true);
    }
}
if(location.pathname.includes("infinito")){
  modo="infinito"
}
else{
  modo="diario";
}
function crearImagen(id) {
  img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  imgDiario = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  img.id = "silueta";
  contenedorSilueta.appendChild(img);
}
async function obtenerTodosLospokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1302");
  const data = await res.json();
  allPokemon = data.results;
}
const paradojaES_EN = {
  "Colmilargo": "great-tusk",
  "Colagrito": "scream-tail",
  "Furioseta": "brute-bonnet",
  "melenaleteo": "flutter-mane",
  "reptalada": "slither-wing",
  "Pelarena": "sandy-shocks",
  "Bramaluna": "roaring-moon",

  "Ferrodada": "iron-treads",
  "Ferrosaco":"iron-bundle" ,
  "ferropalmas": "iron-hands",
  "ferrocuello": "iron-jugulis",
  "ferropolilla": "iron-moth",
  "ferropuas": "iron-thorns",
  "Ferropaladin": "iron-valiant",

  "ondulagua": "walking-wake",
  "Ferroverdor": "iron-leaves",

  "Ferromole": "iron-boulder",
  "Ferrotesta": "iron-crown",

  "Flamariete": "gouging-fire",
  "Electrofuria": "raging-bolt"
};
const paradojaEN_ES = {
  "great-tusk": "Colmilargo",
  "scream-tail": "Colagrito",
  "brute-bonnet": "Furioseta",
  "flutter-mane": "Melenaleteo",
  "slither-wing": "Reptalada",
  "sandy-shocks": "Pelarena",
  "roaring-moon": "Bramaluna",

  "iron-treads": "Ferrodada",
  "iron-bundle":"Ferrosaco" ,
  "iron-hands": "Ferropalmas",
  "iron-jugulis": "Ferrocuello",
  "iron-moth": "Ferropolilla",
  "iron-thorns": "Ferropuas",
  "iron-valiant": "Ferropaladin",

  "walking-wake": "Ondulagua",
  "iron-leaves": "Ferroverdor",

  "iron-boulder": "Ferromole",
  "iron-crown": "Ferrotesta",

  "gouging-fire": "Flamariete",
  "raging-bolt": "Electrofuria"
};
async function compararPokemon(nombrePokemonSeleccionado,pokemonUtilizados){
    let resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemonSeleccionado}`);
    let dataSpecies = await resSpecies.json();
    let foto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dataSpecies.id}.png`;
    let respuestas = document.createElement("div");
    respuestas.innerHTML =  `<img src=${foto}>
    <span>${nombrePokemonSeleccionado}</span>`
     if(nombrePokemonSeleccionado == nombrepokemonDia){
        localStorage.removeItem ("NombreSiluetaDiario");
        localStorage.removeItem("pokemonDiarioSilueta");
        localStorage.removeItem("pokemonUsadosSilueta");
        respuestas.className = "respuestas acierto";
        modalHeader.style.backgroundColor = "#0dc616";
        tituloFinal.textContent = "Ganaste";
        input.placeholder = "¡ Encontraste el pokemon !"
        input.disabled = true;
        modalFinal.show();
        botonReiniciar.style.display = "block";
        racha++;
        localStorage.setItem("rachaInfinitaSilueta",toBase64(racha));
        contenedorRacha.textContent = racha;
        if(racha > mejorRacha){
          localStorage.setItem("mejorRachaSilueta",toBase64(racha));
          contadorMejorRacha.textContent=racha;
        }
    }
    else{  
           corazones[contadorFallos].style.filter = "grayscale(100%)";
           corazones[contadorFallos].style.zIndex = "-1";
           contadorFallos++;
           if(contadorFallos == 5){
             localStorage.removeItem ("NombreSiluetaDiario");
             localStorage.removeItem("pokemonDiarioSilueta");
             localStorage.removeItem("pokemonUsadosSilueta");
             modalHeader.style.backgroundColor = "#e20b0bff";
             tituloFinal.textContent = "Perdiste";
             input.placeholder = "No encontraste el pokemon"
             input.disabled = true;
             modalFinal.show();
             botonReiniciar.style.display = "block";
             localStorage.removeItem("rachaInfinitaSilueta");
             contenedorRacha.textContent = 0;
           }
           else{
                if(zoom != 1.0){
                  if(zoom <= 2.0){
                    zoom = zoom-0.2;
                  }
                else{
                  zoom = zoom - 0.3;
                    }
            img.style.transform = `scale(${zoom})`;
          }
           }
             
        respuestas.className = "respuestas fallo";
        
    }
    ContenedorRespuestas.appendChild(respuestas);
}
// Navegación con teclado
input.addEventListener("keydown", async (e) => {

  if (filteredResults.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();

    if (selectedIndex < filteredResults.length - 1) {
      selectedIndex++;
      actualizarSeleccion();
    }
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();

    if (selectedIndex > 0) {
      selectedIndex--;
      actualizarSeleccion();
    }
  }

  if (e.key === "Enter") {

    const selectedPokemon = filteredResults[selectedIndex];
    if (selectedPokemon) {
      input.value = selectedPokemon.name;
      pokemonUtilizados.push(selectedPokemon.name);
      localStorage.setItem("pokemonUsadosSilueta", JSON.stringify(pokemonUtilizados));
      document.getElementById("results").innerHTML = "";  
      compararPokemon(selectedPokemon.name,false);
    }
    input.value = "";
  }


});

obtenerTodosLospokemon();

// buscar pokemon diario
async function obtenerPokemonDiario(){
if (localStorage.getItem("pokemonDiarioSilueta")) {
  pokemonDiario = fromBase64(localStorage.getItem("pokemonDiarioSilueta"));
  crearImagen(pokemonDiario);
  nombrepokemonDia = fromBase64(localStorage.getItem("NombreSiluetaDiario"));
} else {
  let pokemons = [];

  for (let x = 1; x <= 1028; x++) {
    pokemons.push(x);
  }
 let pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
 localStorage.setItem("pokemonDiarioSilueta", toBase64(pokemon));
 const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
 let dataSpecies = await resSpecies.json();
 nombreInfinito = dataSpecies.name;
 nombrepokemonDia = nombreInfinito;
 localStorage.setItem("NombreSiluetaDiario", toBase64(nombreInfinito));
 crearImagen(pokemon);
}
const revelar = document.createElement("h4");
        revelar.textContent = "El pokemon era " + nombrepokemonDia.toUpperCase();
        const imgFinal = document.createElement("img");
        let imagen =  imgDiario;
        imgFinal.src = imagen;
        imgFinal.alt = nombrepokemonDia;
        imgFinal.style.width = "50%";
        mensajeFinal.appendChild(revelar);
        mensajeFinal.appendChild(imgFinal);
}
obtenerPokemonDiario();
pokemonUsados();
function actualizarSeleccion() {

  const container = document.getElementById("results");

  const anterior = container.querySelector(".active");
  if (anterior) anterior.classList.remove("active");

  const nuevo = container.querySelector(`[data-index="${selectedIndex}"]`);
  if (nuevo) {
    nuevo.classList.add("active");
    nuevo.scrollIntoView({ block: "nearest" });
  }
}

function normalize(text) {
  return text.toLowerCase();
}
 function filterPokemon(list, value) {

  const search = normalize(value);

  return list.filter(p => {

    const nombreEN = normalize(p.name);
    const nombreES = normalize(paradojaEN_ES[p.name] || "");

    return nombreEN.includes(search) || nombreES.includes(search);
  });

}
function renderVisible() {

  const container = document.getElementById("results");
  container.innerHTML = "";

  filteredResults.forEach((pokemon, index) => {

    const id = pokemon.url.split("/").filter(Boolean).pop();
    const nombreMostrar = paradojaEN_ES[pokemon.name] || pokemon.name;

    const div = document.createElement("div");
    div.classList.add("result");
    div.dataset.index = index;
   
    div.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
      <span>${nombreMostrar}</span>
    `;

    div.addEventListener("click", async () => {

      selectedIndex = index;
      actualizarSeleccion();

      input.value = nombreMostrar;
      container.innerHTML = "";

      pokemonUtilizados.push(pokemon.name);
      if(modo == "diario"){
        localStorage.setItem("pokemonUsadosSilueta", JSON.stringify(pokemonUtilizados));
      }
      else{
        localStorage.setItem("pokemonUsadosSiluetaInfinito",  JSON.stringify(pokemonUtilizados))
      }
      
       compararPokemon(pokemon.name,false);
      
      input.value = "";
    });

    container.appendChild(div);
  });

  actualizarSeleccion();
}
input.addEventListener("input", () => {
  const value = input.value;

  if (!value) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  filteredResults = filterPokemon(allPokemon, value);

  let visibleStart = 0;
  selectedIndex = 0;

  renderVisible();
});