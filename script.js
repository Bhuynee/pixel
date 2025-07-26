const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
let image = new Image();

document.getElementById("convertBtn").addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) return alert("Chưa chọn ảnh!");

  const reader = new FileReader();
  reader.onload = function(e) {
    image.onload = () => {
      const scale = 0.1; // pixelation scale
      const w = image.width;
      const h = image.height;
      canvas.width = w;
      canvas.height = h;

      // Draw small image to temp canvas
      const tempCanvas = document.createElement("canvas");
      const tctx = tempCanvas.getContext("2d");
      tempCanvas.width = w * scale;
      tempCanvas.height = h * scale;
      tctx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);

      // Scale it back up with no smoothing
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, w, h);
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixel-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
