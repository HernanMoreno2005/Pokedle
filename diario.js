localStorage.setItem("modoJuego", "diario"); 
import {crearCuadrados,variables,actualizarFilasActivas,contarLetras,buscarEtapa,navegacionEntreLetras, analizarPokemon,pokemonUsados,toBase64,fromBase64,obtenerFechaLocal} from "./Pokedle.js";
let cambioPokemon = false;
// Genera un  pokemon dependiendo la fecha.
function numeroDiario() {
    const hoy = new Date();
    const seed = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;

    return Math.abs(
        seed.split("")
            .map(c => c.charCodeAt(0))
            .reduce((a, b) => a * 31 + b, 7)
    );
}

function esMayorPorDosDias(fecha) {
  const hoy = new Date(obtenerFechaLocal());
  const fechaComparar = new Date(fecha);

  const diferenciaMs = hoy - fechaComparar;
  const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

  return diferenciaDias >= 2;
}
let fechaGuardada;
let comparacion = false;
if(localStorage.getItem("fechaDiariaClassic")) {
    fechaGuardada=fromBase64(localStorage.getItem("fechaDiariaClassic"));
    comparacion= true;
}

let fechaHoy=obtenerFechaLocal(); 
if(comparacion){
    if(esMayorPorDosDias(fechaGuardada)){
        variables.racha.textContent = 0;
        variables.numeroRachaDiaria = 0;
        localStorage.removeItem("fechaDiariaClassic");
    }
}

async function obtenerPokemonDiario() {
    let seed = numeroDiario();
    seed = (seed % 1025) + 1;
    let respuesta  = await fetch(`https://pokeapi.co/api/v2/pokemon/${seed}`);
    let data = await respuesta.json();
     variables.sprite = data.sprites.front_default;

        const respuestaEspecies = await fetch(data.species.url);
        const dataEspecies = await respuestaEspecies.json();

        const respuestaCadena = await fetch(dataEspecies.evolution_chain.url);
        const evolucionData = await respuestaCadena.json();

        variables.nombre = data.name.toLowerCase();
        let nombreDecodificado= fromBase64(localStorage.getItem("pokemonDiario"));
       if(nombreDecodificado != variables.nombre){
         let nombreEncriptado = toBase64(variables.nombre);
         localStorage.setItem("pokemonDiario",nombreEncriptado);
         localStorage.removeItem("pokemonPuestosDiario");
         localStorage.setItem("ContadorPalabrasDiario", 0);
       }
       else if( localStorage.getItem(localStorage.getItem("pokemonDiario"))=== null){
           let nombreEncriptado = toBase64(variables.nombre);
         localStorage.setItem("pokemonDiario",nombreEncriptado);
       }
        variables.tipos = data.types.map(t => t.type.name);
        variables.generacion = dataEspecies.generation.name;
        variables.etapaEvolutiva = buscarEtapa(evolucionData.chain, variables.nombre);
}

//iniciar
document.addEventListener("DOMContentLoaded", async () => {
   
    await obtenerPokemonDiario();
     let contadorPalabras = parseInt(localStorage.getItem("ContadorPalabrasDiario")) || 0;
    if(contadorPalabras){
        variables.contadorPalabras = contadorPalabras;
    }
    
    crearCuadrados(variables.nombre);
    if(contadorPalabras > 0){
        variables.pokemonPuestosDiario = JSON.parse(localStorage.getItem("pokemonPuestosDiario")) || []
        await pokemonUsados(variables.contadorPalabras,variables.pokemonPuestosDiario,"diario");
    }
    else{
        variables.inputsTotales[0][0].focus();
    }
    navegacionEntreLetras();
    actualizarFilasActivas();
    analizarPokemon(variables.nombre);
});
