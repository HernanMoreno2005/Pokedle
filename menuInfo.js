const modalInfo = document.querySelector(".modalInfo");
const overlay = document.querySelector(".overlay");
const cerrarModalInfo = document.getElementById("cerrarModalInfo");
const botonInfo = document.getElementById("botonInfo");
botonInfo.addEventListener("click",()=>{
  overlay.style.display = "flex";
  modalInfo.style.display = "block";

})

cerrarModalInfo.addEventListener("click",() => {
  overlay.style.display = "none";
  modalInfo.style.display = "none";
})