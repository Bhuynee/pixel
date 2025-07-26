const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const loadingText = document.getElementById("loading-text");
const loadingCircle = document.querySelector(".loading-circle");

const pixelSlider = document.getElementById("pixelSize");
const filterSelect = document.getElementById("filter");
const stickerButtons = document.querySelectorAll(".sticker-btn");
const bgMusic = document.getElementById("bgMusic");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");

// Loading UI
function showLoading() {
  loadingText.innerText = "Đang xử lý nèee ~ chờ chút xíu nha ~";
  loadingCircle.style.display = "inline-block";
}

function hideLoading() {
  loadingText.innerText = "";
  loadingCircle.style.display = "none";
}

// Fake convert (ảnh/video pixel hoá)
function convertMedia() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Chưa chọn file gì hết trơn!");
    hideLoading();
    return;
  }

  showLoading();

  setTimeout(() => {
    preview.innerHTML = `<p style="font-size:1.2em">✅ Đã xử lý xong file: <b>${file.name}</b></p>`;
    hideLoading();
  }, 2000); // giả lập xử lý trong 2 giây
}

// Sticker
let currentSticker = "";
stickerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSticker = btn.dataset.sticker;
    stickerButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Xuất GIF (fake)
function exportGIF() {
  showLoading();
  setTimeout(() => {
    alert("🎉 GIF xuất thành công (fake)");
    hideLoading();
  }, 1500);
}

// Xuất MP4 (fake)
function exportMP4() {
  showLoading();
  setTimeout(() => {
    alert("🎬 MP4 xuất thành công (fake)");
    hideLoading();
  }, 1500);
}

// Nhạc
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusicBtn.innerText = "Tắt nhạc";
  } else {
    bgMusic.pause();
    toggleMusicBtn.innerText = "Mở nhạc";
  }
}

document.getElementById("convertBtn").addEventListener("click", convertMedia);
document.getElementById("gifBtn").addEventListener("click", exportGIF);
document.getElementById("mp4Btn").addEventListener("click", exportMPconst fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const loadingText = document.getElementById("loading-text");
const loadingCircle = document.querySelector(".loading-circle");

const pixelSlider = document.getElementById("pixelSize");
const filterSelect = document.getElementById("filter");
const stickerButtons = document.querySelectorAll(".sticker-btn");
const bgMusic = document.getElementById("bgMusic");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");

// Loading UI
function showLoading() {
  loadingText.innerText = "Đang xử lý nèee ~ chờ chút xíu nha ~";
  loadingCircle.style.display = "inline-block";
}

function hideLoading() {
  loadingText.innerText = "";
  loadingCircle.style.display = "none";
}

// Fake convert (ảnh/video pixel hoá)
function convertMedia() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Chưa chọn file gì hết trơn!");
    hideLoading();
    return;
  }

  showLoading();

  setTimeout(() => {
    preview.innerHTML = `<p style="font-size:1.2em">✅ Đã xử lý xong file: <b>${file.name}</b></p>`;
    hideLoading();
  }, 2000); // giả lập xử lý trong 2 giây
}

// Sticker
let currentSticker = "";
stickerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSticker = btn.dataset.sticker;
    stickerButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Xuất GIF (fake)
function exportGIF() {
  showLoading();
  setTimeout(() => {
    alert("🎉 GIF xuất thành công (fake)");
    hideLoading();
  }, 1500);
}

// Xuất MP4 (fake)
function exportMP4() {
  showLoading();
  setTimeout(() => {
    alert("🎬 MP4 xuất thành công (fake)");
    hideLoading();
  }, 1500);
}

// Nhạc
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusicBtn.innerText = "Tắt nhạc";
  } else {
    bgMusic.pause();
    toggleMusicBtn.innerText = "Mở nhạc";
  }
}

document.getElementById("convertBtn").addEventListener("click", convertMedia);
document.getElementById("gifBtn").addEventListener("click", exportGIF);
document.getElementById("mp4Btn").addEventListener("click", exportMP
