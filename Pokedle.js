// creacion variables y constantes
const pokemons = [];
let Pokemon1= document.getElementById("Pokemon1");
let Pokemon2= document.getElementById("Pokemon2");
let Pokemon3= document.getElementById("Pokemon3");
let Pokemon4= document.getElementById("Pokemon4");
let Pokemon5= document.getElementById("Pokemon5");
let pista1 = document.getElementById("pista1");
let pista2 = document.getElementById("pista2");
let pista3 = document.getElementById("pista3");
let contenedor1=document.getElementById("contenedorPista1");
let contenedor2=document.getElementById("contenedorPista2");
let contenedor3=document.getElementById("contenedorPista3");
let fallo1 = document.getElementById("fallo1");
let fallo2 = document.getElementById("fallo2");
let fallo3 = document.getElementById("fallo3");
let mensajeFinal = document.getElementById("mensajeFinal");
let revelacionPista1 = false;
let revelacionPista2 = false;
let revelacionPista3 = false;
let sprite ;
let contadorVerdes = 0;
let contadorFallo = 4;
let tipos;
let etapaEvolutiva;
let generacion;
let nombre;
let adivinoPokemon = false;
let existeEspacio = false;
const modalHeader = document.querySelector("#modalFinal .modal-header");
const tiposArray = {
  water: { nombre: "Agua", color: "#3399ff" },
  fire: { nombre: "Fuego", color: "#ff4500" },
  grass: { nombre: "Planta", color: "#78c850" },
  electric: { nombre: "Eléctrico", color: "#ffcc00" },
  psychic: { nombre: "Psíquico", color: "#f85888" },
  ice: { nombre: "Hielo", color: "#98d8d8" },
  dragon: { nombre: "Dragón", color: "#7038f8" },
  dark: { nombre: "Siniestro", color: "#705848" },
  fairy: { nombre: "Hada", color: "#ee99ac" },
  normal: { nombre: "Normal", color: "#a8a878" },
  fighting: { nombre: "Lucha", color: "#c03028" },
  flying: { nombre: "Volador", color: "#a890f0" },
  poison: { nombre: "Veneno", color: "#a040a0" },
  ground: { nombre: "Tierra", color: "#e0c068" },
  rock: { nombre: "Roca", color: "#b8a038" },
  bug: { nombre: "Bicho", color: "#a8b820" },
  ghost: { nombre: "Fantasma", color: "#705898" },
  steel: { nombre: "Acero", color: "#b8b8d0" },
};
let tituloFinal = document.getElementById("tituloFinal")
const modalEl = document.getElementById('errorModal');
const modal = new bootstrap.Modal(modalEl, { focus: false });
const modalFinalE2 = document.getElementById("modalFinal");
const modalFinal = new bootstrap.Modal(modalFinalE2);
const inputs1 = [];
const inputs2 = []; 
const inputs3 = []; 
const inputs4 = []; 
const inputs5 = []; 
const inputsTotales = [];
let contadorPalabras = 0;
let amarillas = [];

// obtener el pokemon y sus datos
for (let i = 1; i <= 1025; i++) {
  pokemons.push(i);
}
async function obtenerPokemon(){
  const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
try {
    const respuesta =  await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
    const data = await respuesta.json();
    sprite = data.sprites.front_default;
    const respuestaEspecies = await fetch(data.species.url)
    const dataEspecies = await respuestaEspecies.json();
    const respuestaCadena = await fetch(dataEspecies.evolution_chain.url)
    const evolucionData= await respuestaCadena.json();
    nombre = data.name.toLowerCase()
    tipos = data.types.map(t => t.type.name);
    generacion = dataEspecies.generation.name;
    etapaEvolutiva = buscarEtapa(evolucionData.chain,nombre);
    crearCuadrados(nombre);
     if (inputs1.length > 0) {
    actualizarFilasActivas();
    inputsTotales[0][0].focus();
    }
 
// sistema de navegacion entre los inputs    
 inputsTotales.forEach((fila, filaIndex) => {
  fila.forEach((input, j) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        if (fila[j + 1]) {
          fila[j + 1].focus(); 
        } 
      } else if (event.key === "ArrowLeft") {
        if (fila[j - 1]) {
          fila[j - 1].focus();
        } 
      } else if (event.key === "Backspace") {
        event.preventDefault();
        input.value = "";
        if (fila[j - 1]) fila[j - 1].focus();
      }
    });
    input.addEventListener("input", () => {
      if (input.value.length === 1 && fila[j + 1]) {
        fila[j + 1].focus();
      }
    });
  });
});
    }
catch{
    }
    }
// crear inputs
function crearCuadrados(nombre){
   for(let i = 0 ;i < nombre.length; i++){
     const contenedor = document.createElement("input");
     contenedor.classList.add("letra");
     contenedor.classList.add(`pos${i}`);
     contenedor.maxLength = 1;
     Pokemon1.appendChild(contenedor);
     inputs1.push(contenedor);
     const copia = contenedor.cloneNode(true);
     const copia2 = contenedor.cloneNode(true);
     const copia3 = contenedor.cloneNode(true);
     const copia4 = contenedor.cloneNode(true); 
     copia.classList.replace(`pos${i}`, `pos${i + nombre.length}`); 
     copia2.classList.replace(`pos${i}`, `pos${i + 2  * nombre.length}`); 
     copia3.classList.replace(`pos${i}`, `pos${i + 3 * nombre.length}`); 
     copia4.classList.replace(`pos${i}`, `pos${i + 4 * nombre.length}`); 
     Pokemon2.appendChild(copia); 
     Pokemon3.appendChild(copia2); 
     Pokemon4.appendChild(copia3); 
     Pokemon5.appendChild(copia4); 
     inputs2.push(copia);
     inputs3.push(copia2);
     inputs4.push(copia3);
     inputs5.push(copia4);
   }
   inputsTotales.push(inputs1);
   inputsTotales.push(inputs2);
   inputsTotales.push(inputs3);
   inputsTotales.push(inputs4);
   inputsTotales.push(inputs5);
}
obtenerPokemon();
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    analizarPokemon(nombre);
    termino = false;
  }
});


function contarLetras(nombre) {
  let letrasPokemons = [];
  for (let i = 0; i < nombre.length; i++) {
    const letra = nombre.charAt(i);
    if (letrasPokemons[letra]) {
      letrasPokemons[letra]++;
    } else {
      letrasPokemons[letra] = 1;
    } 
  }
  return letrasPokemons;
}
// recorrer arbol de evoluciones del pokemon para pista 2
 function buscarEtapa(chain, nombreBuscado, etapaActual = 1) {
    if (chain.species.name.toLowerCase() === nombreBuscado.toLowerCase()) {
      return etapaActual;
    }

    for (let evo of chain.evolves_to) {
      const etapaEncontrada = buscarEtapa(evo, nombreBuscado, etapaActual + 1);
      if (etapaEncontrada) return etapaEncontrada;
    }

    return null; 
  }


function actualizarFilasActivas() {
  if(adivinoPokemon){
    inputsTotales.forEach((fila) => {
    fila.forEach(input => {
      input.disabled = true;
    });
  });
  }
  else{
    inputsTotales.forEach((fila, filaIndex) => {
    fila.forEach(input => {
      input.disabled = filaIndex !== contadorPalabras;
    });
  });
  }
}

 async function analizarPokemon(nombre) {
  const letras = [];
  letrasPokemons = contarLetras(nombre);
  // juntar las letras ingresadas y formar palabra
  for (let i = 0; i < nombre.length;i++){
    let letra
    if (contadorPalabras == 0){
       letra = document.querySelector(`.letra.pos${i}`);
    }
    else{
      letra = document.querySelector(`.letra.pos${nombre.length * contadorPalabras +i}`); 
    }
    let valorLetra = letra.value.toLowerCase();
    letras[i] = valorLetra;
  }
  let palabra = "";
  letras.forEach(l => {
  palabra += l; 
  if(l == ""){
    existeEspacio = true;
  }
  });
  try{
    const respuesta =  await fetch(`https://pokeapi.co/api/v2/pokemon/${palabra}`);
    lastFocused = document.activeElement;
    if(!respuesta.ok){
      modal.show();
      setTimeout(() => {
      modal.hide();
      }, 1000);
    }
    else if(!existeEspacio){
//verificar las letras y sus posiciones
for (let i = 0; i < nombre.length; i++) {
     let letraInput;
     let letra = nombre.charAt(i);
     if(contadorPalabras == 0){
      letraInput = document.querySelector(`.letra.pos${i}`);
     }
     else{
      letraInput = document.querySelector(`.letra.pos${ nombre.length * contadorPalabras +i }`)
     }
    letraInput.style.backgroundColor = ""; 
    if (letras[i] === nombre.charAt(i)) {
      letraInput.style.backgroundColor = "#77fb77";
      contadorVerdes++;
      if(letrasPokemons[letras[i]] != 0 ){
        letrasPokemons[letras[i]]--;
      }
      else{
        let input = amarillas.pop();
        input.style.backgroundColor = "#bb2323";
      }
    } else if (nombre.includes(letras[i])) {
      if(letrasPokemons[letras[i]] != 0){
        letraInput.style.backgroundColor = "#f9f965";
        amarillas.push(letraInput);
        letrasPokemons[letras[i]]--;
      }
      else{
        letraInput.style.backgroundColor = "#bb2323";
      }
    } else {
      letraInput.style.backgroundColor = "#bb2323";
    }
  }

  // mensaje final del juego 
  if(contadorVerdes == palabra.length || contadorPalabras == 4){
    RevelarPokemon = document.createElement("h4");
    RevelarPokemon.textContent = "El  pokemon era " + nombre.toUpperCase();
    const img = document.createElement("img");
    img.src = sprite;
    img.alt = nombre;
    img.style.width = "50%"
    mensajeFinal.appendChild(RevelarPokemon);
    mensajeFinal.appendChild(img);
    modalFinal.show();
    adivinoPokemon= true;
    if(contadorVerdes == palabra.length){
      tituloFinal.textContent= "Ganaste";
      modalHeader.style.backgroundColor = "#0dc616";
    }
    else{
      tituloFinal.textContent= "Perdiste";
      modalHeader.style.backgroundColor = "#e20b0bff";
    }
  }
  else{
  inputsTotales[contadorPalabras + 1][0].focus(); 
  contadorVerdes = 0;
  }
  contadorPalabras++;

  // revelar pista 1 
  if(contadorPalabras == 2 && !revelacionPista1){
    let revelarPista1 = document.createElement("h3");
    revelarPista1.setAttribute("id", "primerTipo");
    let segundoTipo;
    tiposSeparados= tipos.map(tipo => tipo.trim());
    let nombre;
    let color;
    let nombreTipo2 ;
    let colorTipo2;
    const tipo = tiposSeparados[0].trim();  
    color = tiposArray[tipo].color;
    nombre =  tiposArray[tipo].nombre;
    if(tiposSeparados.length != 1){
      segundoTipo = document.createElement("h3");
      segundoTipo.setAttribute("id", "segundoTipo");
      const tipo = tiposSeparados[1].trim();  
      colorTipo2 = tiposArray[tipo].color;
      nombreTipo2 =  tiposArray[tipo].nombre;
    }
    revelarPista1.textContent = "Revelar Pista";
    revelarPista1.style.color = "white";
    pista1.style.display = "none"
    fallo1.style.display = "none"
    contenedor1.style.backgroundColor = "#00405c";
    pista1.style.marginTop = "0";
    contenedor1.appendChild(revelarPista1);
    contenedor1.style.cursor = "pointer";
    revelacionPista1 = true;
    contenedor1.addEventListener("click", () => {
    contenedor1.style.width = "206px"
    revelarPista1.textContent = nombre;
    revelarPista1.style.color = "black"; 
    contenedor1.style.textAlign = "center";
    contenedor1.style.cursor = "default";
    if(tiposSeparados.length == 1){
      contenedor1.style.backgroundColor = color;
    }
    else{
      contenedor1.appendChild(segundoTipo);
      revelarPista1.style.backgroundColor = color;
      segundoTipo.style.backgroundColor = colorTipo2;
      segundoTipo.textContent = nombreTipo2;
      revelarPista1.style.width = "50%";
      revelarPista1.style.margin = "0";
      revelarPista1.style.padding = "2%";
      revelarPista1.style.borderTopLeftRadius = "8%";
      revelarPista1.style.borderBottomLeftRadius = "8%";
      revelarPista1.style.fontSize = "150%"
      segundoTipo.style.width = "50%";
      segundoTipo.style.margin = "0";
      segundoTipo.style.padding = "2%";
      segundoTipo.style.borderTopRightRadius = "8%";
      segundoTipo.style.borderBottomRightRadius = "8%";
      segundoTipo.style.color = "black";
      segundoTipo.style.fontSize = "150%";
      contenedor1.style.display = "flex";
    }
});
  }
    // revelar pista 2
  else if (contadorPalabras == 3 && !revelacionPista2){
        let revelarPista2 = document.createElement("h3");
        revelarPista2.textContent = "Revelar Pista";
        revelarPista2.style.color = "white";
        pista2.style.display = "none"
        fallo2.style.display = "none"
        contenedor2.style.backgroundColor = "#00405c";
        pista2.style.marginTop = "0";
        contenedor2.appendChild(revelarPista2);
        contenedor2.style.cursor = "pointer";
        revelacionPista2 = true;
        contenedor2.addEventListener("click", () => {
        contenedor2.style.width = "206px"
        contenedor2.style.backgroundColor = "white"
        revelarPista2.textContent = etapaEvolutiva;
        revelarPista2.style.color = "black"; 
        contenedor2.style.textAlign = "center";
        contenedor2.style.cursor = "default";
});
  }
  // revelar pista 3
  else if (contadorPalabras == 4 && !revelacionPista3){
        let revelarPista3 = document.createElement("h3");
        revelarPista3.textContent = "Revelar Pista";
        revelarPista3.style.color = "white";
        pista3.style.display = "none"
        fallo3.style.display = "none"
        contenedor3.style.backgroundColor = "#00405c";
        pista3.style.marginTop = "0";
        contenedor3.appendChild(revelarPista3);
        contenedor3.style.cursor = "pointer";
        revelacionPista3 = true;
        contenedor3.addEventListener("click", () => {
        contenedor3.style.width = "206px"
        contenedor3.style.backgroundColor = "white"
        revelarPista3.textContent = generacion;
        revelarPista3.style.color = "black"; 
        contenedor3.style.textAlign = "center";
        contenedor3.style.cursor = "default";
});
  }
  actualizarFilasActivas();
  inputsTotales[contadorPalabras][0].focus();
  if(contadorFallo -3  > 0){
      fallo1.textContent = "fallos restantes: " + (contadorFallo - 3) ;  
    }
    if(contadorFallo -2 > 0){
      fallo2.textContent = "fallos restantes: " + (contadorFallo - 2) ;
    }
    if(contadorFallo -1 > 0){
      fallo3.textContent = "fallos restantes: " + (contadorFallo - 1);
    }
    contadorFallo--;
    }
    else{
      existeEspacio = false;
    }
  }
  catch{

  }
}
