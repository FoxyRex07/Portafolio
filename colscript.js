document.addEventListener("DOMContentLoaded", () => {
  // Carruseles
  const carousels = document.querySelectorAll('.carrusel');
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImage");
  let closeModal = document.getElementById("closeModal");
  let modalPrev = document.querySelector(".modal-prev");
  let modalNext = document.querySelector(".modal-next");

  let currentImgs = []; // imágenes del carrusel activo
  let currentIndex = 0;

  carousels.forEach(carrusel => {
    const imagenes = carrusel.querySelector('.imagenes');
    const imgs = imagenes.querySelectorAll('img');
    let index = 0;

    carrusel.querySelector('.prev').addEventListener('click', () => {
      index = (index - 1 + imgs.length) % imgs.length;
      imagenes.style.transform = `translateX(-${index * 100}%)`;
    });

    carrusel.querySelector('.next').addEventListener('click', () => {
      index = (index + 1) % imgs.length;
      imagenes.style.transform = `translateX(-${index * 100}%)`;
    });

    // Abrir modal al hacer clic en una imagen
    imgs.forEach((img, i) => {
      img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src;
        currentImgs = Array.from(imgs);
        currentIndex = i;
      });
    });
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Navegar dentro del modal
  modalPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImgs.length) % currentImgs.length;
    modalImg.src = currentImgs[currentIndex].src;
  });

  modalNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImgs.length;
    modalImg.src = currentImgs[currentIndex].src;
  });

  // Cerrar modal clicando fuera de la imagen
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Partículas de fondo (como ya tenías)
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  const numParticles = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
