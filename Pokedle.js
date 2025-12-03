localStorage.setItem("modoJuego", "infinito"); 
export const variables = {
    pokemons: [],
    Pokemon1: document.getElementById("Pokemon1"),
    Pokemon2: document.getElementById("Pokemon2"),
    Pokemon3: document.getElementById("Pokemon3"),
    Pokemon4: document.getElementById("Pokemon4"),
    Pokemon5: document.getElementById("Pokemon5"),
    pokemonPuestos: [],
    pokemonPuestosDiario:[],
    pista1: document.getElementById("pista1"),
    pista2: document.getElementById("pista2"),
    pista3: document.getElementById("pista3"),

    contenedor1: document.getElementById("contenedorPista1"),
    contenedor2: document.getElementById("contenedorPista2"),
    contenedor3: document.getElementById("contenedorPista3"),

    fallo1: document.getElementById("fallo1"),
    fallo2: document.getElementById("fallo2"),
    fallo3: document.getElementById("fallo3"),

    mensajeFinal: document.getElementById("mensajeFinal"),
    tituloFinal: document.getElementById("tituloFinal"),

    revelacionPista1: false,
    revelacionPista2: false,
    revelacionPista3: false,

    sprite: null,
    contadorVerdes: 0,
    contadorFallo: 4,
    tipos: null,
    etapaEvolutiva: null,
    generacion: null,
    nombre: null,
    adivinoPokemon: false,
    existeEspacio: false,
    guardarEnArray: true,

    modalHeader: document.querySelector("#modalFinal .modal-header"),
    modalEl: document.getElementById('errorModal'),
    modalFinalE2: document.getElementById("modalFinal"),

    inputs1: [],
    inputs2: [],
    inputs3: [],
    inputs4: [],
    inputs5: [],
    inputsTotales: [],
    contadorPalabras: 0,
    amarillas: [],

    tiposArray: {
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
    }
};
// Encriptar
function toBase64(str) {
    const bytes = new TextEncoder().encode(str); // convierte a Uint8Array
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



// Inicializar los modales
variables.modal = new bootstrap.Modal(variables.modalEl, { focus: false });
variables.modalFinal = new bootstrap.Modal(variables.modalFinalE2);

// llenar array de pokemons
for (let i = 1; i <= 1025; i++) {
    variables.pokemons.push(i);
}

// Obtener un Pokémon aleatorio y sus datos
 async function obtenerPokemon() {
    const randomPokemon = variables.pokemons[Math.floor(Math.random() * variables.pokemons.length)];
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        const data = await respuesta.json();
        variables.sprite = data.sprites.front_default;

        const respuestaEspecies = await fetch(data.species.url);
        const dataEspecies = await respuestaEspecies.json();

        const respuestaCadena = await fetch(dataEspecies.evolution_chain.url);
        const evolucionData = await respuestaCadena.json();

        variables.nombre = data.name.toLowerCase();
        variables.tipos = data.types.map(t => t.type.name);
        variables.generacion = dataEspecies.generation.name;
        variables.etapaEvolutiva = buscarEtapa(evolucionData.chain, variables.nombre);
        localStorage.setItem("nombre", toBase64(variables.nombre));
        localStorage.setItem("tipos", toBase64(JSON.stringify(variables.tipos)));
        localStorage.setItem("generacion", toBase64(variables.generacion));
        localStorage.setItem("etapaEvolutiva", toBase64(variables.etapaEvolutiva));
        crearCuadrados(variables.nombre);
        if (variables.inputs1.length > 0) {
            actualizarFilasActivas();
            variables.inputsTotales[0][0].focus();
        }
     navegacionEntreLetras();
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
    }
}
async function obtenerPokemonNombre(nombre){
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  const data = await respuesta.json();
  variables.sprite = data.sprites.front_default;
}
export function navegacionEntreLetras(){
       variables.inputsTotales.forEach((fila, filaIndex) => {
            fila.forEach((input, j) => {
                input.addEventListener("keydown", (event) => {
                    if (event.key === "ArrowRight") {
                        if (fila[j + 1]) fila[j + 1].focus();
                    } else if (event.key === "ArrowLeft") {
                        if (fila[j - 1]) fila[j - 1].focus();
                    } else if (event.key === "Backspace") {
                        event.preventDefault();
                        input.value = "";
                        if (fila[j - 1]) fila[j - 1].focus();
                    }
                });
                input.addEventListener("input", () => {
                    if (input.value.length === 1 && fila[j + 1]) fila[j + 1].focus();
                });
            });
        });
}
// Crear inputs
export function crearCuadrados(nombre) {
  variables.inputs1 = [];
    variables.inputs2 = [];
    variables.inputs3 = [];
    variables.inputs4 = [];
    variables.inputs5 = [];
    variables.inputsTotales = [];
    for (let i = 0; i < nombre.length; i++) {
        const contenedor = document.createElement("input");
        contenedor.classList.add("letra", `pos${i}`);
        contenedor.maxLength = 1;
        variables.Pokemon1.appendChild(contenedor);
        variables.inputs1.push(contenedor);

        const copia = contenedor.cloneNode(true);
        const copia2 = contenedor.cloneNode(true);
        const copia3 = contenedor.cloneNode(true);
        const copia4 = contenedor.cloneNode(true);

        copia.classList.replace(`pos${i}`, `pos${i + nombre.length}`);
        copia2.classList.replace(`pos${i}`, `pos${i + 2 * nombre.length}`);
        copia3.classList.replace(`pos${i}`, `pos${i + 3 * nombre.length}`);
        copia4.classList.replace(`pos${i}`, `pos${i + 4 * nombre.length}`);

        variables.Pokemon2.appendChild(copia);
        variables.Pokemon3.appendChild(copia2);
        variables.Pokemon4.appendChild(copia3);
        variables.Pokemon5.appendChild(copia4);

        variables.inputs2.push(copia);
        variables.inputs3.push(copia2);
        variables.inputs4.push(copia3);
        variables.inputs5.push(copia4);
    }

    variables.inputsTotales.push(variables.inputs1);
    variables.inputsTotales.push(variables.inputs2);
    variables.inputsTotales.push(variables.inputs3);
    variables.inputsTotales.push(variables.inputs4);
    variables.inputsTotales.push(variables.inputs5);
}

// Funciones auxiliares
export function contarLetras(nombre) {
    const letrasPokemons = {};
    for (let i = 0; i < nombre.length; i++) {
        const letra = nombre.charAt(i);
        letrasPokemons[letra] = (letrasPokemons[letra] || 0) + 1;
    }
    return letrasPokemons;
}

export function buscarEtapa(chain, nombreBuscado, etapaActual = 1) {
    if (chain.species.name.toLowerCase() === nombreBuscado.toLowerCase()) return etapaActual;
    for (let evo of chain.evolves_to) {
        const etapaEncontrada = buscarEtapa(evo, nombreBuscado, etapaActual + 1);
        if (etapaEncontrada) return etapaEncontrada;
    }
    return null;
}

export function actualizarFilasActivas() {
    if (variables.adivinoPokemon) {
        variables.inputsTotales.forEach((fila) => fila.forEach(input => input.disabled = true));
    } else {
        variables.inputsTotales.forEach((fila, filaIndex) => {
            fila.forEach(input => input.disabled = filaIndex !== variables.contadorPalabras);
        });
    }
}
// Iniciar
document.addEventListener("DOMContentLoaded", async() => {
  const modo = localStorage.getItem("modoJuego");
  const final = localStorage.getItem("final");
  if (modo === "infinito" && (final == "true" || final === null)) {
    obtenerPokemon();
    localStorage.setItem("final", "false"); 
  }
  else if (modo === "infinito"){
variables.nombre = fromBase64(localStorage.getItem("nombre"));
variables.tipos = JSON.parse(fromBase64(localStorage.getItem("tipos")));
variables.generacion = fromBase64(localStorage.getItem("generacion"));
variables.etapaEvolutiva = fromBase64(localStorage.getItem("etapaEvolutiva"));
    obtenerPokemonNombre(variables.nombre);
    crearCuadrados(variables.nombre);
    actualizarFilasActivas();
    navegacionEntreLetras()
let palabrasUsadas = parseInt(localStorage.getItem("contadorPalabras")) || 0;
variables.pokemonPuestos = JSON.parse(localStorage.getItem("pokemonPuestos")) || [];
variables.guardarEnArray = false;
pokemonUsados(palabrasUsadas,variables.pokemonPuestos,"infinito");
  }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        analizarPokemon(variables.nombre);
    }
});

export async function  pokemonUsados(palabrasUsadas,lista,modo){
let largo = variables.nombre.length;
let palabra
for (let i = 0; i < palabrasUsadas; i++) {
  if(modo == "infinito"){
    palabra = variables.pokemonPuestos[i];
  }
  else{
    palabra = variables.pokemonPuestosDiario[i];
  }
  for (let j = 0; j < palabra.length; j++) {
    let pos = i * largo + j;
    let letraInput = document.querySelector(`.letra.pos${pos}`);
    if (letraInput) letraInput.value = palabra[j];
  }
await analizarPokemon(variables.nombre); 
if(modo == "diario"){
  const contadorOriginal = variables.contadorPalabras;
        variables.contadorPalabras = i;  
        await analizarPokemon(variables.nombre);
        variables.contadorPalabras = contadorOriginal;
}
}
variables.guardarEnArray = true;
}
 export async function analizarPokemon(nombre) {
  const letras = [];
  variables.letrasPokemons = contarLetras(nombre);

  // juntar las letras ingresadas y formar palabra
  for (let i = 0; i < nombre.length; i++) {
    let letraInput;
    if (variables.contadorPalabras === 0) {
      letraInput = document.querySelector(`.letra.pos${i}`);
    } else {
      letraInput = document.querySelector(`.letra.pos${nombre.length * variables.contadorPalabras + i}`);
    }
    letras[i] = letraInput.value.toLowerCase();
  }

  let palabra = letras.join("");
  variables.existeEspacio = letras.includes("");
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${palabra}`);
    if (!respuesta.ok) {
      variables.modal.show();
      setTimeout(() => variables.modal.hide(), 1000);
      return;
    }

    if (!variables.existeEspacio) {
      let modo = localStorage.getItem("modoJuego"); 
      if(variables.guardarEnArray && modo == "infinito"){
        variables.pokemonPuestos.push(palabra);
        localStorage.setItem(`pokemonPuestos`,JSON.stringify(variables.pokemonPuestos));
      }
      else if (variables.guardarEnArray && modo == "diario"){
        variables.pokemonPuestosDiario.push(palabra);
        localStorage.setItem(`pokemonPuestosDiario`,JSON.stringify(variables.pokemonPuestosDiario));
      }
      // verificar letras y posiciones
      for (let i = 0; i < nombre.length; i++) {
        let letraInput;
        const letra = nombre.charAt(i);

        if (variables.contadorPalabras === 0) {
          letraInput = document.querySelector(`.letra.pos${i}`);
        } else {
          letraInput = document.querySelector(`.letra.pos${nombre.length * variables.contadorPalabras + i}`);
        }

        letraInput.style.backgroundColor = "";

        if (letras[i] === letra) {
          letraInput.style.backgroundColor = "#77fb77";
          variables.contadorVerdes++;
          if (variables.letrasPokemons[letras[i]] !== 0) {
            variables.letrasPokemons[letras[i]]--;
          } else {
            const input = variables.amarillas.pop();
            if (input) input.style.backgroundColor = "#bb2323";
          }
        } else if (nombre.includes(letras[i])) {
          if (variables.letrasPokemons[letras[i]] !== 0) {
            letraInput.style.backgroundColor = "#f9f965";
            variables.amarillas.push(letraInput);
            variables.letrasPokemons[letras[i]]--;
          } else {
            letraInput.style.backgroundColor = "#bb2323";
          }
        } else {
          letraInput.style.backgroundColor = "#bb2323";
        }
      }

      // mensaje final del juego
      if (variables.contadorVerdes === palabra.length || variables.contadorPalabras === 4) {
        const revelar = document.createElement("h4");
        revelar.textContent = "El pokemon era " + nombre.toUpperCase();
        const img = document.createElement("img");
        img.src = variables.sprite;
        img.alt = nombre;
        img.style.width = "50%";
        variables.mensajeFinal.appendChild(revelar);
        variables.mensajeFinal.appendChild(img);
        variables.modalFinal.show();
        localStorage.setItem("contadorPalabras",0);
        localStorage.setItem("final", "true");
        variables.adivinoPokemon = true;

        if (variables.contadorVerdes === palabra.length) {
          variables.tituloFinal.textContent = "Ganaste";
          variables.modalHeader.style.backgroundColor = "#0dc616";
        } else {
          variables.tituloFinal.textContent = "Perdiste";
          variables.modalHeader.style.backgroundColor = "#e20b0bff";
        }
        localStorage.setItem("pokemonPuestos","");
      } else {
        variables.contadorVerdes = 0;
        if (variables.inputsTotales[variables.contadorPalabras + 1])
          variables.inputsTotales[variables.contadorPalabras + 1][0].focus();
      }

      variables.contadorPalabras++;
      if(modo == "infinito"){
        localStorage.setItem("contadorPalabras",variables.contadorPalabras);
      }
      else{
        localStorage.setItem("ContadorPalabrasDiario",variables.contadorPalabras);
      }

      //  Revelar pista 1
      if (variables.contadorPalabras === 2 && !variables.revelacionPista1) {
        const revelarPista1 = document.createElement("h3");
        revelarPista1.setAttribute("id", "primerTipo");
        revelarPista1.textContent = "Revelar Pista";
        revelarPista1.style.color = "white";
        revelarPista1.style.fontSize = "100%"

        variables.pista1.style.display = "none";
        variables.fallo1.style.display = "none";
        variables.contenedor1.style.backgroundColor = "#00405c";
        variables.contenedor1.style.cursor = "pointer";

        const tiposSeparados = variables.tipos.map(t => t.type ? t.type.name : t); 
        const tipo1 = tiposSeparados[0].trim();
        const color1 = variables.tiposArray[tipo1].color;
        const nombreTipo1 = variables.tiposArray[tipo1].nombre;

        let segundoTipo, color2, nombreTipo2;
        if (tiposSeparados.length > 1) {
          segundoTipo = document.createElement("h3");
          const tipo2 = tiposSeparados[1].trim();
          color2 = variables.tiposArray[tipo2].color;
          nombreTipo2 = variables.tiposArray[tipo2].nombre;
        }

        variables.contenedor1.appendChild(revelarPista1);
        variables.revelacionPista1 = true;

        variables.contenedor1.addEventListener("click", () => {
          variables.contenedor1.style.width = "206px";
          revelarPista1.textContent = nombreTipo1;
          revelarPista1.style.color = "black";
          variables.contenedor1.style.textAlign = "center";
          variables.contenedor1.style.cursor = "default";

          if (segundoTipo) {
            segundoTipo.textContent = nombreTipo2;
            segundoTipo.style.backgroundColor = color2;
            revelarPista1.style.backgroundColor = color1;
            revelarPista1.style.width = "50%";
            revelarPista1.style.margin = 0;
            revelarPista1.style.fontSize = "100%";
            segundoTipo.style.width = "50%";
            segundoTipo.style.margin = 0;
            segundoTipo.style.fontSize = "100%";
            variables.contenedor1.appendChild(segundoTipo);
            variables.contenedor1.style.display = "flex";
          } else {
            variables.contenedor1.style.backgroundColor = color1;
          }
        });
      }

      // Revelar pista 2
      if (variables.contadorPalabras === 3 && !variables.revelacionPista2) {
        const revelarPista2 = document.createElement("h3");
        revelarPista2.textContent = "Revelar Pista";
        revelarPista2.style.color = "white";
        revelarPista2.style.fontSize = "100%"; 

        variables.pista2.style.display = "none";
        variables.fallo2.style.display = "none";
        variables.contenedor2.style.backgroundColor = "#00405c";
        variables.contenedor2.style.cursor = "pointer";

        variables.contenedor2.appendChild(revelarPista2);
        variables.revelacionPista2 = true;

        variables.contenedor2.addEventListener("click", () => {
          variables.contenedor2.style.width = "206px";
          variables.contenedor2.style.backgroundColor = "white";
          revelarPista2.textContent = variables.etapaEvolutiva;
          revelarPista2.style.color = "black";
          variables.contenedor2.style.textAlign = "center";
          variables.contenedor2.style.cursor = "default";
        });
      }

      //  Revelar pista 3 
      if (variables.contadorPalabras === 4 && !variables.revelacionPista3) {
        const revelarPista3 = document.createElement("h3");
        revelarPista3.textContent = "Revelar Pista";
        revelarPista3.style.color = "white";
        revelarPista3.style.fontSize = "100%"

        variables.pista3.style.display = "none";
        variables.fallo3.style.display = "none";
        variables.contenedor3.style.backgroundColor = "#00405c";
        variables.contenedor3.style.cursor = "pointer";

        variables.contenedor3.appendChild(revelarPista3);
        variables.revelacionPista3 = true;

        variables.contenedor3.addEventListener("click", () => {
          variables.contenedor3.style.width = "206px";
          variables.contenedor3.style.backgroundColor = "white";
          revelarPista3.textContent = variables.generacion;
          revelarPista3.style.color = "black";
          variables.contenedor3.style.textAlign = "center";
          variables.contenedor3.style.cursor = "default";
        });
      }

      actualizarFilasActivas();
      if (variables.inputsTotales[variables.contadorPalabras])
        variables.inputsTotales[variables.contadorPalabras][0].focus();

      // actualizar fallos
      if (variables.contadorFallo - 3 > 0) variables.fallo1.textContent = "fallos restantes: " + (variables.contadorFallo - 3);
      if (variables.contadorFallo - 2 > 0) variables.fallo2.textContent = "fallos restantes: " + (variables.contadorFallo - 2);
      if (variables.contadorFallo - 1 > 0) variables.fallo3.textContent = "fallos restantes: " + (variables.contadorFallo - 1);
      variables.contadorFallo--;
    }
  } catch (err) {
    console.error(err);
  }
}
