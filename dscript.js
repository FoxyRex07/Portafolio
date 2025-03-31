document.addEventListener("DOMContentLoaded", function () {
    // Menú móvil
    const mobileMenu = document.getElementById("mobile-menu");
    const menuList = document.querySelector(".menu ul");

    mobileMenu.addEventListener("click", () => {
        menuList.classList.toggle("active");
    });

    // Efecto de partículas
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
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});

/////////////MODAL////////////////////

// Obtener el modal
var modal = document.getElementById("imageModal");

// Obtener las imágenes de la galería
var images = document.querySelectorAll(".gallery-item img");

// Obtener el elemento <img> dentro del modal
var modalImg = document.getElementById("modalImage");

// Función para abrir el modal con la imagen clickeada
images.forEach(image => {
    image.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src; // Establece la imagen clickeada en el modal
    }
});

// Función para cerrar el modal al hacer clic en la "X"
document.getElementById("closeModal").onclick = function() {
    modal.style.display = "none";
}

// Función para cerrar el modal al hacer clic fuera de la imagen (zona oscura)
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
