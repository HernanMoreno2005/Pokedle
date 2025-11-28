localStorage.setItem("modoJuego", "diario"); 
import {crearCuadrados,variables,actualizarFilasActivas,contarLetras,buscarEtapa,navegacionEntreLetras, analizarPokemon} from "./Pokedle.js";
  
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
        variables.tipos = data.types.map(t => t.type.name);
        variables.generacion = dataEspecies.generation.name;
        variables.etapaEvolutiva = buscarEtapa(evolucionData.chain, variables.nombre);
}

//iniciar
document.addEventListener("DOMContentLoaded", async () => {
    await obtenerPokemonDiario();   
    crearCuadrados(variables.nombre);
    navegacionEntreLetras();
    actualizarFilasActivas();
    analizarPokemon(variables.nombre);
});
