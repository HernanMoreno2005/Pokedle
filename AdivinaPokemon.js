
export let input = document.getElementById("busqueda");
let modo;
if(location.pathname.includes("infinito")){
  modo="infinito"
}
else{
  modo="diario";
}
let contenedor = document.getElementById("informacion");
let contenedorRacha= document.getElementById("contadorRacha");
let numeroDeRachas;
let corazones
let numeroDeFallos
if(localStorage.getItem("numeroDeFallos")){
numeroDeFallos = fromBase64(localStorage.getItem("numeroDeFallos"))
}
else{
numeroDeFallos=0;
}
  
if(modo != "diario"){
corazones = document.querySelectorAll(".corazon");
}
if( modo == "diario" && localStorage.getItem("racha")){
  numeroDeRachas = fromBase64(localStorage.getItem("racha"))
}
else if(localStorage.getItem("rachaAdivinaInfinito")){
  numeroDeRachas = fromBase64(localStorage.getItem("rachaAdivinaInfinito"))
}
else{
  numeroDeRachas = 0;
}
let numeroDeRachaHoy = numeroDeRachas;
contenedorRacha.textContent = numeroDeRachas;
export let allPokemon = [];
let filteredResults = [];
let infoPokemonSeleccionado = [];
let infoPokemonDia = [];
let aciertos = [];
let pokemonUtilizados;
let botonReiniciar;
if(modo == "diario"){
  pokemonUtilizados = JSON.parse(localStorage.getItem("pokemonUsadosAdivina")) || [];

}
else{
  pokemonUtilizados = JSON.parse(localStorage.getItem("pokemonUsadosAdivinaInfinito")) || [];
  botonReiniciar = document.getElementById("botonReiniciar");
}
let selectedIndex = 0;
let nombrePokemonDelDia;
let contenedorCategorias = document.getElementById("contenedorCategorias");
let img;
let idPokemonSeleccionado;
let modalHeader =  document.querySelector("#modalFinal .modal-header");
let modalFinalE2 =  document.getElementById("modalFinal");
let modalFinal = new bootstrap.Modal(modalFinalE2);
let mensajeFinal =  document.getElementById("mensajeFinal");
let tituloFinal =  document.getElementById("tituloFinal");
let encontroPokemon = false;
const colores = {
  black: "Negro",
  blue: "Azul",
  brown: "Marrón",
  gray: "Gris",
  green: "Verde",
  pink: "Rosa",
  purple: "Morado",
  red: "Rojo",
  white: "Blanco",
  yellow: "Amarillo"
};

const categorias = [
    "Pokemon",
    "Tipo1",
    "Tipo2",
    "Etapa Evolutiva",
    "Altura",
    "Peso",
    "Color",
    "Generacion"
  ];
  function romanoANumero(romano) {
  const mapa = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9
  };

  return mapa[romano] || 0;
}
// Encriptar
export function toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
}

// Desencriptar
export function fromBase64(str) {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
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
function convertirBusqueda(nombre){
  const n = normalize(nombre);
  if(paradojaES_EN[n]){
    return paradojaES_EN[n];
  }

  return n;
}
function esMayorPorDosDias(fecha) {
  const hoy = new Date(obtenerFechaLocal());
  const fechaComparar = new Date(fecha);

  const diferenciaMs = hoy - fechaComparar;
  const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

  return diferenciaDias >= 2;
}
function numeroDiario() {
  const hoy = obtenerFechaLocal();
  const fechaGuardada = fromBase64(localStorage.getItem("fecha"));
  if(esMayorPorDosDias(fechaGuardada)){
    let ceroEncriptado = toBase64(0);
    localStorage.setItem("racha",ceroEncriptado);
    contenedorRacha.textContent = 0;
    numeroDeRachaHoy = 0;
    numeroDeRachas = 0;
  }

  if (fechaGuardada !== hoy && modo == "diario") {
    localStorage.removeItem("pokemonUsadosAdivina");
    pokemonUtilizados = [];
    let fechaEncriptada = toBase64(hoy);
    localStorage.setItem("fecha", fechaEncriptada);
  }
  

  const seed = hoy;

  return Math.abs(
    seed.split("")
      .map(c => c.charCodeAt(0))
      .reduce((a, b) => a * 31 + b, 7)
  );
}

function obtenerFechaLocal() {
  const d = new Date();
  return d.getFullYear() + "-" +
         String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(d.getDate()).padStart(2, "0");
}

function tiempoHastaManana() {
  const ahora = new Date();

  const manana = new Date(ahora);
  manana.setDate(ahora.getDate() + 1);
  manana.setHours(0, 0, 0, 0);

  return manana - ahora;
}
function iniciarContador(elemento) {

  function tiempoHastaManana() {
    const ahora = new Date();
    const manana = new Date(ahora);
    manana.setDate(ahora.getDate() + 1);
    manana.setHours(0, 0, 0, 0);
    return manana - ahora;
  }

  function actualizarContador() {
    const restante = tiempoHastaManana();

    if (restante <= 0) {
      location.reload();
      return;
    }

    const horas = Math.floor(restante / (1000 * 60 * 60));
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);

    elemento.textContent =
      "Nuevo Pokemon en: " +
      String(horas).padStart(2, "0") + ":" +
      String(minutos).padStart(2, "0") + ":" +
      String(segundos).padStart(2, "0");
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}

function actualizarContador() {
  const restante = tiempoHastaManana();

  if (restante <= 0) {
    activarNuevoDia();
    return;
  }

  const horas = Math.floor(restante / (1000 * 60 * 60));
  const minutos = Math.floor((restante / (1000 * 60)) % 60);
  const segundos = Math.floor((restante / 1000) % 60);

  const texto =
    String(horas).padStart(2, "0") + ":" +
    String(minutos).padStart(2, "0") + ":" +
    String(segundos).padStart(2, "0");

  document.getElementById("contador").textContent = texto;
}



async function funcionObtenerPokemonDiario() {

    let seed = numeroDiario();

    // Asegurararse de que ya cargó la lista
    if (allPokemon.length === 0) {
        await obtenerTodosLospokemon();
    }

    const index = (seed * 9301 + 49297) % allPokemon.length;
    return allPokemon[index].name;
  }
  async function datosPokemonDia(){
if(modo == "diario"){
nombrePokemonDelDia = await funcionObtenerPokemonDiario();
infoPokemonDia = await obtenerPokemonEnEspanol(nombrePokemonDelDia);
}
else{
  let nombreInfinito;
  if(localStorage.getItem("AdivinaInfinito")){
     nombreInfinito = fromBase64(localStorage.getItem("AdivinaInfinito"));
  }
  else{
  let pokemons = [];
    for(let x=1;x<=1028;x++){
        pokemons[x-1]=x;
    }
   let pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
   const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
   let dataSpecies = await resSpecies.json();
   nombreInfinito = dataSpecies.name;
  }
     localStorage.setItem("AdivinaInfinito",toBase64(nombreInfinito));
     infoPokemonDia = await obtenerPokemonEnEspanol(nombreInfinito);
     nombrePokemonDelDia=nombreInfinito;
}
}
  async function pokemonYaUsados() {
  await datosPokemonDia();
  let guardados;
  if(modo == "diario"){
  guardados = localStorage.getItem("pokemonUsadosAdivina");
  }
  else{
    guardados = localStorage.getItem("pokemonUsadosAdivinaInfinito");
  }
 
  if (!guardados){
    return;
  } 
  const pokemonUtilizados = JSON.parse(guardados);

  for (let x = 0; x < pokemonUtilizados.length; x++) {

      infoPokemonSeleccionado = await obtenerPokemonEnEspanol(pokemonUtilizados[x]);

      compararPokemon(infoPokemonSeleccionado, infoPokemonDia);

      ContenedorInformacion(infoPokemonSeleccionado,infoPokemonDia,true);
  }
}
pokemonYaUsados();

async function obtenerPokemonEnEspanol(nombrePokemon) {
    try {

        let dataPokemon;
        let dataSpecies;

      
        let resPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`
        );

        if (resPokemon.ok) {
            dataPokemon = await resPokemon.json();

            const resSpecies = await fetch(dataPokemon.species.url);
            dataSpecies = await resSpecies.json();

        } else {
            //  Si falla usar species
            const resSpecies = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon.toLowerCase()}`
            );

            if (!resSpecies.ok) throw new Error("Pokémon no encontrado");

            dataSpecies = await resSpecies.json();

            // Buscar forma default
            const formaDefault = dataSpecies.varieties.find(v => v.is_default);

            const resForma = await fetch(formaDefault.pokemon.url);
            dataPokemon = await resForma.json();
        }

        idPokemonSeleccionado = dataSpecies.id;

        //  Tipos en español
        const tipos = await Promise.all(
            dataPokemon.types.map(async (t) => {
                const resTipo = await fetch(t.type.url);
                const dataTipo = await resTipo.json();
                const tipoES = dataTipo.names.find(n => n.language.name === "es");
                return tipoES ? tipoES.name : t.type.name;
            })
        );

        //  Generación en español
        const resGen = await fetch(dataSpecies.generation.url);
        const dataGen = await resGen.json();
        let generacionES = dataGen.names.find(n => n.language.name === "es");

        if (generacionES) {
            generacionES = generacionES.name.replace("Generación ", "");
        }

        // 🔹 Evolución
        const resEvo = await fetch(dataSpecies.evolution_chain.url);
        const dataEvo = await resEvo.json();

        function obtenerEtapa(chain, nombre) {
            if (chain.species.name === nombre) return 1;
            for (let evo of chain.evolves_to) {
                if (evo.species.name === nombre) return 2;
                for (let evo2 of evo.evolves_to) {
                    if (evo2.species.name === nombre) return 3;
                }
            }
            return 1;
        }

        const etapa = obtenerEtapa(dataEvo.chain, dataSpecies.name);

        return {
            tipo1: tipos[0] || null,
            tipo2: tipos[1] || null,
            "etapa evolutiva": etapa,
            altura: dataPokemon.height / 10,
            peso: dataPokemon.weight / 10,
            color: colores[dataSpecies.color.name],
            generacion: generacionES || null,
            pokemon: dataSpecies.name
        };

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function compararPokemon(pokemonSeleccionado,pokemonDia){
  categorias.forEach((texto,index) =>{
     if(pokemonSeleccionado[texto.toLocaleLowerCase()] === pokemonDia[texto.toLocaleLowerCase()]){
       aciertos[index] = "acierto";
       if(index == 0) {
          encontroPokemon = true;
       }
     }
     else{
      aciertos[index] = "fallo";
       if(index == 1){
        if(pokemonSeleccionado[texto.toLocaleLowerCase()] === pokemonDia[categorias[index + 1].toLocaleLowerCase()]){
           aciertos[index] = "falloPorOrden";
        }
       }
       else if (index == 2){
        if(pokemonSeleccionado[texto.toLocaleLowerCase()] === pokemonDia[categorias[index - 1].toLocaleLowerCase()]){
           aciertos[index] = "falloPorOrden";
        }
       }
       else if((index>=3 && index <=5)){
        if(pokemonSeleccionado[texto.toLocaleLowerCase()] > pokemonDia[texto.toLocaleLowerCase()]){
            aciertos[index] = "falloPorAbajo";
        }
        else{
          aciertos[index] = "falloPorArriba";
        }
       }
       else if(index == 7){
          let numero1 = romanoANumero(pokemonSeleccionado[texto.toLocaleLowerCase()]);
          let numero2 = romanoANumero(pokemonDia[texto.toLocaleLowerCase()]);
          if(numero1 > numero2){
            aciertos[index] = "falloPorAbajo";
          }
          else{
            aciertos[index] = "falloPorArriba";
          }
       }
     }
  });
 if(!encontroPokemon && modo != "diario"){
        corazones[numeroDeFallos].style.filter = "grayscale(100%)";
        corazones[numeroDeFallos].style.zIndex = "-1";
        numeroDeFallos++;
 }
}
async function obtenerImgPokemon(nombre) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  const data = await respuesta.json();
  return  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;;
}
export async function ContenedorInformacion(infoPokemonSeleccionado,infoPokemonDia,pokemonUsados){

  // Crear el div opciones
  const opciones = document.createElement("div");
  opciones.id = "opciones";

  //  Agregarlo dentro de contenedor
  contenedor.appendChild(opciones);
  categorias.forEach((texto,index) => {

    const elemento = document.createElement("div");
    elemento.classList.add("elemento");
    const cuadrado = document.createElement("div");
    if(index != 0){
    cuadrado.textContent = infoPokemonSeleccionado[texto.toLocaleLowerCase()];
    cuadrado.classList.add(aciertos[index]);
    }
    else{
         img = document.createElement("img");
         img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemonSeleccionado}.png`; 
         cuadrado.appendChild(img);
    }
    cuadrado.classList.add("cuadrado");
    elemento.appendChild(cuadrado);
    opciones.appendChild(elemento);
  });
  infoPokemonSeleccionado = []
  if(encontroPokemon || (modo == "infinito" && numeroDeFallos == 8)){
        const revelar = document.createElement("h4");
        revelar.textContent = "El pokemon era " + nombrePokemonDelDia.toUpperCase();
        const imgFinal = document.createElement("img");
        let nombrePokemonImagen = infoPokemonDia["pokemon"];
        let imagen =  await obtenerImgPokemon(nombrePokemonImagen);
        imgFinal.src = imagen;
        imgFinal.alt = nombrePokemonDelDia;
        imgFinal.style.width = "50%";
        mensajeFinal.appendChild(revelar);
        mensajeFinal.appendChild(imgFinal);
        if(encontroPokemon){
          modalHeader.style.backgroundColor = "#0dc616";
          tituloFinal.textContent = "Ganaste";
        }
        else{
          modalHeader.style.backgroundColor = "#e20b0bff";
          tituloFinal.textContent = "Perdiste";
          contenedorRacha.textContent = 0;
          localStorage.removeItem("rachaAdivinaInfinito");
          numeroDeRachas = 0;
        }
        const contenedor = document.createElement("div");
        contenedor.id = "contador";
        contenedor.style.marginTop = "15px";
        contenedor.style.fontSize = "1.5rem";
        contenedor.style.fontWeight = "bold";
        contenedor.style.textAlign = "center";
        contenedor.style.fontFamily = "pokemon";
        mensajeFinal.appendChild(contenedor);
        if(modo == "diario"){
          iniciarContador(contenedor);
        }
        else{
          localStorage.removeItem("AdivinaInfinito")
          localStorage.removeItem("pokemonUsadosAdivinaInfinito");
        }
        modalFinal.show();
        if(!pokemonUsados){
        if(modo=="diario"){
          localStorage.setItem("racha",rachaEncriptada);
        }
        else{
          if(encontroPokemon){
            numeroDeRachas++;
            let rachaEncriptada = toBase64(numeroDeRachas);
            localStorage.setItem("rachaAdivinaInfinito",rachaEncriptada);
            let rachaMaxima=0;
            if(localStorage.getItem("rachaMaximaAdivina")){
              rachaMaxima= fromBase64(localStorage.getItem("rachaMaximaAdivina"))
            }
            if(numeroDeRachas > rachaMaxima){
              localStorage.setItem("rachaMaximaAdivina", toBase64(numeroDeRachas));
              let contenedorRachaInfinita = document.getElementById("contadorRachaInfinita");
              contenedorRachaInfinita.textContent = numeroDeRachas;
            }
          }
          botonReiniciar.style.display="block";
          botonReiniciar.addEventListener("click",() =>{
          location.reload();
        })
        }
        
        contenedorRacha.textContent = numeroDeRachas;
        }
        if(modo=="diario"){
          input.placeholder = "¡Encontraste el pokemon!";
        }
        if(modo != "diario" && encontroPokemon) {
          input.placeholder = "¡Encontraste el pokemon!";
        }
        else if(modo != "diario"){
          input.placeholder = "No encontraste el pokemon";
        }
        input.disabled = true;
}

 }
// Obtener todos los Pokémon
async function obtenerTodosLospokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1302");
  const data = await res.json();
  allPokemon = data.results;
}

obtenerTodosLospokemon();

//  Normalizador
function normalize(text) {
  return text.toLowerCase();
}

// Filtrado
export function filterPokemon(list, value) {

  const search = normalize(value);

  return list.filter(p => {

    const nombreEN = normalize(p.name);
    const nombreES = normalize(paradojaEN_ES[p.name] || "");

    return nombreEN.includes(search) || nombreES.includes(search);
  });

}

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

export function renderVisible() {

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

      infoPokemonSeleccionado =await obtenerPokemonEnEspanol(pokemon.name);

      pokemonUtilizados.push(pokemon.name);
      if(modo == "diario"){
        localStorage.setItem("pokemonUsadosAdivina", JSON.stringify(pokemonUtilizados));
      }
      else{
        localStorage.setItem("pokemonUsadosAdivinaInfinito",  JSON.stringify(pokemonUtilizados))
      }
      
        compararPokemon(infoPokemonSeleccionado, infoPokemonDia);
      
      
      
      ContenedorInformacion(infoPokemonSeleccionado, infoPokemonDia,false);

      input.value = "";
    });

    container.appendChild(div);
  });

  actualizarSeleccion();
}


// Cuando el usuario escribe
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
document.addEventListener("click", (e) => {

  const container = document.getElementById("results");

  const clickDentroInput = input.contains(e.target);
  const clickDentroResultados = container.contains(e.target);

  if (!clickDentroInput && !clickDentroResultados) {
    container.innerHTML = "";
  }

});
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
      localStorage.setItem("pokemonUsadosAdivina", JSON.stringify(pokemonUtilizados));
      document.getElementById("results").innerHTML = "";

      infoPokemonSeleccionado = await obtenerPokemonEnEspanol(selectedPokemon.name);
        
      compararPokemon(infoPokemonSeleccionado, infoPokemonDia);
      ContenedorInformacion(infoPokemonSeleccionado, infoPokemonDia,false);
    }
    input.value = "";
  }


});
