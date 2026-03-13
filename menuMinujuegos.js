const modal = document.getElementById("modal");
const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");
let silueta = location.pathname.includes("silueta");
let imagenSilueta;
if(silueta){
  imagenSilueta = document.getElementById("silueta");
}
const DUR = 350; 

abrir.addEventListener("click", () => {
  modal.classList.remove("hideRight"); 
  modal.classList.add("show");
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
 imagenSilueta.style.zIndex = -1;
}
});

cerrar.addEventListener("click", () => {
  modal.classList.add("hideRight");   
  modal.classList.remove("show");     
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
 imagenSilueta.style.zIndex = 999;
}
  setTimeout(() => {
    modal.classList.remove("hideRight"); 
  }, DUR);
});


window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hideRight");
    modal.classList.remove("show");

    setTimeout(() => {
      modal.classList.remove("hideRight");
    }, DUR);
  }
});
