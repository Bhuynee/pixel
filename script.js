const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    convertToPixel(file);
  }
});

function convertToPixel(file) {
  const img = new Image();
  img.onload = function () {
    const scale = 0.08; // Giảm scale để pixel hóa mạnh hơn
    const w = img.width * scale;
    const h = img.height * scale;

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = w;
    tempCanvas.height = h;
    tempCtx.drawImage(img, 0, 0, w, h);

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, w, h, 0, 0, img.width, img.height);
  };
  img.src = URL.createObjectURL(file);
}
