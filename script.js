const fileInput = document.getElementById("fileInput");
const convertBtn = document.getElementById("convertBtn");
const exportGif = document.getElementById("exportGif");
const exportMp4 = document.getElementById("exportMp4");
const pixelRange = document.getElementById("pixelRange");
const filterSelect = document.getElementById("filterSelect");
const previewArea = document.getElementById("previewArea");
const loading = document.getElementById("loading");
const stickers = document.querySelectorAll(".sticker");

let selectedFile = null;
let selectedSticker = null;

fileInput.addEventListener("change", (e) => {
  selectedFile = e.target.files[0];
  previewArea.textContent = `📁 Đã chọn: ${selectedFile.name}`;
});

stickers.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedSticker = btn.dataset.type;
    btn.classList.toggle("active");
  });
});

convertBtn.addEventListener("click", () => {
  if (!selectedFile) return alert("Chưa chọn file đâu nè!");
  showLoading();

  setTimeout(() => {
    previewArea.innerHTML = `<canvas id="canvas" width="300" height="300"></canvas>`;
    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#ffc0cb";
    ctx.fillRect(0, 0, 300, 300);

    ctx.font = "20px monospace";
    ctx.fillStyle = "#333";
    ctx.fillText("Đã pixel hoá ảnh/video!", 20, 150);

    if (selectedSticker) ctx.fillText(`+ ${selectedSticker}`, 20, 180);
    hideLoading();
  }, 2000);
});

exportGif.addEventListener("click", () => {
  alert("🎞 Xuất GIF nè (demo thôi, bản full dùng ffmpeg)");
});

exportMp4.addEventListener("click", () => {
  alert("🎬 Xuất MP4 nè (demo thôi, bản full dùng ffmpeg)");
});

function showLoading() {
  loading.classList.remove("loading-hidden");
}

function hideLoading() {
  loading.classList.add("loading-hidden");
      
