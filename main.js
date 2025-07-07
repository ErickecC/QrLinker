"use strict";

const qrContainer = document.getElementById("qrcode");
const inputLink = document.getElementById("link");
const btn = document.getElementById("btn");
const downloadBtn = document.getElementById("downloadBtn");

const QR = new QRCode(qrContainer, {
  width: 800,
  height: 800,
  useSVG: false,
});



function createQRCode() {
  if (!inputLink.value) {
    alert("Introduce una URL");
    inputLink.focus();
    return;
  } else {
    QR.makeCode(inputLink.value);
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  createQRCode();
});

downloadBtn.addEventListener("click", () => {
  const canvasOriginal = qrContainer.querySelector("canvas");
  if (!canvasOriginal) {
    alert("Primero genera un código QR.");
    return;
  }

  const escala = 4;
  const padding = 20;
  const tamañoOriginal = canvasOriginal.width;
  const tamañoNuevo = (tamañoOriginal + padding * 2) * escala;

  const nuevoCanvas = document.createElement("canvas");
  nuevoCanvas.width = tamañoNuevo;
  nuevoCanvas.height = tamañoNuevo;

  const ctx = nuevoCanvas.getContext("2d");
  ctx.scale(escala, escala);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, tamañoNuevo / escala, tamañoNuevo / escala);

  ctx.drawImage(canvasOriginal, padding, padding);

  const enlace = document.createElement("a");
  enlace.href = nuevoCanvas.toDataURL("image/png");
  enlace.download = "codigo-qr.png";
  enlace.click();
});