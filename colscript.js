document.addEventListener("DOMContentLoaded", () => {
  // Carrusel general para múltiples instancias
  document.querySelectorAll(".carrusel").forEach((carousel, carouselIndex) => {
    const slides = carousel.querySelectorAll(".slide");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    const indicators = carousel.querySelector(".indicators");
    let current = 0;

    // Crear indicadores
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active-indicator");
      indicators.appendChild(dot);
    });

    const dots = indicators.querySelectorAll("span");

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active-indicator", i === index);
      });
      current = index;
    }

    prev.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    next.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    // Autoplay
    //setInterval(() => {
    //  current = (current + 1) % slides.length;
    //  showSlide(current);
    //}, 8000); // cada 5 segundos

    // Click en indicadores
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });

    showSlide(current);
  });

  // Modal para imágenes
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".clickable-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;

    // Oculta todas las flechas del carrusel mientras el modal está activo
    document.querySelectorAll(".prev, .next").forEach(el => {
      el.style.display = "none";
    });
  });
});


closeModal.onclick = () => {
  modal.style.display = "none";

  // Muestra nuevamente las flechas del carrusel
  document.querySelectorAll(".prev, .next").forEach(el => {
    el.style.display = "";
  });
};
window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";

    // Muestra nuevamente las flechas del carrusel
    document.querySelectorAll(".prev, .next").forEach(el => {
      el.style.display = "";
    });
  }
};

  // Partículas (se mantiene igual)
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
