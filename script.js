let selectedFile = null;
const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

const exportBtn = document.getElementById("exportBtn");
const filterSelect = document.getElementById("filterSelect");
const sticker = new Image();
sticker.src = "sticker.png"; // ảnh sticker PNG pixel nhỏ dễ thương

fileInput.addEventListener("change", (e) => {
  selectedFile = e.target.files[0];
});

function handleConvert() {
  if (selectedFile) {
    convertToPixel(selectedFile);
  } else {
    alert("Bạn chưa chọn ảnh kìa!");
  }
}

function convertToPixel(file) {
  const img = new Image();
  img.onload = function () {
    const scale = 0.08;
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

    applyFilter();
    drawSticker();
  };
  img.src = URL.createObjectURL(file);
}

function applyFilter() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const filter = filterSelect.value;

  for (let i = 0; i < data.length; i += 4) {
    if (filter === "gameboy") {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      let level = avg > 128 ? 255 : 80;
      data[i] = data[i + 1] = data[i + 2] = level;
    } else if (filter === "lava") {
      data[i] = data[i];
      data[i + 1] = 20;
      data[i + 2] = 0;
    } else if (filter === "pastel") {
      data[i] = (data[i] + 255) / 2;
      data[i + 1] = (data[i + 1] + 200) / 2;
      data[i + 2] = (data[i + 2] + 255) / 2;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawSticker() {
  ctx.drawImage(sticker, canvas.width - 64, canvas.height - 64, 48, 48);
}

exportBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixel-image.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Nhạc nền cute loop
const bgm = new Audio("cute-music.mp3");
bgm.loop = true;
bgm.volume = 0.4;
document.addEventListener("click", () => bgm.play(), { once: true });
