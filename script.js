const fileInput = document.getElementById("fileInput");
const pixelSlider = document.getElementById("pixelSlider");
const convertBtn = document.getElementById("convertBtn");
const previewContainer = document.getElementById("preview");
const gifExportBtn = document.getElementById("exportGIF");
const mp4ExportBtn = document.getElementById("exportMP4");
const imgExportBtn = document.getElementById("exportImage");
const musicToggleBtn = document.getElementById("toggleMusic");
const filterSelect = document.getElementById("filterSelect");
const stickerOptions = document.querySelectorAll(".sticker-option");

let audio = new Audio("cute-music.mp3");
audio.loop = true;

let currentMedia = null;
let currentPixelLevel = 10;
let currentFilter = "none";
let selectedSticker = null;

musicToggleBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicToggleBtn.textContent = "🔊 Đang phát nhạc";
  } else {
    audio.pause();
    musicToggleBtn.textContent = "🔇 Đã tắt nhạc";
  }
});

filterSelect.addEventListener("change", () => {
  currentFilter = filterSelect.value;
});

stickerOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedSticker = btn.getAttribute("data-sticker");
  });
});

pixelSlider.addEventListener("input", () => {
  currentPixelLevel = parseInt(pixelSlider.value);
});

convertBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("😵 Hãy chọn ảnh hoặc video trước đã nha!");
    return;
  }

  previewContainer.innerHTML = "";

  const reader = new FileReader();
  reader.onload = (e) => {
    const url = e.target.result;
    if (file.type.startsWith("image/")) {
      convertImageToPixel(url);
    } else if (file.type.startsWith("video/")) {
      convertVideoToPixel(url);
    } else {
      alert("Chỉ hỗ trợ ảnh và video thôi nghenn~");
    }
  };
  reader.readAsDataURL(file);
});

function convertImageToPixel(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const pixelSize = currentPixelLevel;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width / pixelSize, img.height / pixelSize);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, img.width / pixelSize, img.height / pixelSize, 0, 0, img.width, img.height);

    if (currentFilter !== "none") {
      ctx.fillStyle = getFilterColor(currentFilter);
      ctx.globalAlpha = 0.2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    }

    if (selectedSticker) {
      const stickerImg = new Image();
      stickerImg.src = `stickers/${selectedSticker}.png`;
      stickerImg.onload = () => {
        ctx.drawImage(stickerImg, 10, 10, 100, 100);
        previewContainer.appendChild(canvas);
        currentMedia = canvas;
      };
    } else {
      previewContainer.appendChild(canvas);
      currentMedia = canvas;
    }
  };
}

function convertVideoToPixel(url) {
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;
  video.play();

  video.addEventListener("play", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    previewContainer.appendChild(canvas);
    currentMedia = video;

    const draw = () => {
      if (video.paused || video.ended) return;

      ctx.drawImage(video, 0, 0, canvas.width / currentPixelLevel, canvas.height / currentPixelLevel);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, canvas.width / currentPixelLevel, canvas.height / currentPixelLevel, 0, 0, canvas.width, canvas.height);

      if (selectedSticker) {
        const stickerImg = new Image();
        stickerImg.src = `stickers/${selectedSticker}.png`;
        stickerImg.onload = () => {
          ctx.drawImage(stickerImg, 10, 10, 100, 100);
        };
      }

      requestAnimationFrame(draw);
    };

    draw();
  });
}

function getFilterColor(type) {
  switch (type) {
    case "gameboy":
      return "#a4c639";
    case "lava":
      return "#ff4500";
    case "pastel":
      return "#ffc0cb";
    default:
      return "transparent";
  }
}

imgExportBtn.addEventListener("click", () => {
  if (!currentMedia) return;
  const link = document.createElement("a");
  link.download = "pixel-image.png";
  link.href = currentMedia.toDataURL("image/png");
  link.click();
});

gifExportBtn.addEventListener("click", () => {
  alert("🎥 Xuất GIF sẽ thêm sau nhé!");
});

mp4ExportBtn.addEventListener("click", () => {
  alert("🎞️ Cần tích hợp FFmpeg WebAssembly để xuất MP4.");
});
