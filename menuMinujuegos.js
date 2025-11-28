const modal = document.getElementById("modal");
const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");

const DUR = 350; 


abrir.addEventListener("click", () => {
  modal.classList.remove("hideRight"); 
  modal.classList.add("show");
});

cerrar.addEventListener("click", () => {
  modal.classList.add("hideRight");   
  modal.classList.remove("show");     

  setTimeout(() => {
    modal.classList.remove("hideRight"); 
  }, DUR);
});

// CLICK AFUERA
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hideRight");
    modal.classList.remove("show");

    setTimeout(() => {
      modal.classList.remove("hideRight");
    }, DUR);
  }
});
