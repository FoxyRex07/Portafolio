const mobileMenu = document.getElementById('mobile-menu');
        const menuList = document.querySelector('.menu ul');

        mobileMenu.addEventListener('click', () => {
            menuList.classList.toggle('active');
        });

        window.addEventListener('scroll', function () {
            const nameElement = document.querySelector('.name');
            const menuElement = document.querySelector('.menu');
            const menuBottom = menuElement.getBoundingClientRect().bottom;

            // Si la parte inferior del menú está fuera de la vista
            if (menuBottom < 0) {
                nameElement.classList.add('hidden'); // Oculta el texto
            } else {
                nameElement.classList.remove('hidden'); // Muestra el texto
            }
        });
// Efecto de partículas
window.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.about').appendChild(canvas);
    const aboutSection = document.querySelector('.about');
    canvas.width = aboutSection.offsetWidth;
    canvas.height = aboutSection.offsetHeight;


    const particles = [];
    const particleCount = 100;

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height) this.y = canvas.height;

    }

    Particle.prototype.draw = function () {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
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
}

// Scroll automático
document.getElementById('scrollBtn').addEventListener('click', function () {
    document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
});



/////////////////////////////CONTACTO/////////////////////////////////////////
// Manejo del formulario de contacto
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const nombre = document.querySelector('input[name="nombre"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const mensaje = document.querySelector('textarea[name="mensaje"]').value;

    if (nombre && email && mensaje) {
        alert(`Gracias por tu mensaje, ${nombre}. Me pondré en contacto contigo pronto.`);
        this.reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Partículas de fondo
window.onload = function () {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 100;

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    Particle.prototype.draw = function () {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animateParticles();
};
