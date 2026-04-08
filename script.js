// Esperar DOM listo
document.addEventListener('DOMContentLoaded', () => {
  /* ====== Menu mobile ====== */
  const mobileMenu = document.getElementById('mobile-menu');
  const menuList = document.querySelector('.menu ul');
  if (mobileMenu && menuList) {
    mobileMenu.addEventListener('click', () => menuList.classList.toggle('active'));
  }

  /* ====== Scroll listener seguro (evita errores si .name no existe) ====== */
  const menuElement = document.querySelector('.menu');
  const nameElement = document.querySelector('.name'); // si no existe, lo comprobamos
  if (menuElement && nameElement) {
    window.addEventListener('scroll', () => {
      const menuBottom = menuElement.getBoundingClientRect().bottom;
      if (menuBottom < 0) nameElement.classList.add('hidden');
      else nameElement.classList.remove('hidden');
    });
  }

  /* ====== Partículas reutilizable (crea un canvas dentro del contenedor) ====== */
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.6,
    vx: (Math.random() * 0.6) - 0.3,
    vy: (Math.random() * 0.6) - 0.3,
    alpha: 0.4 + Math.random() * 0.6
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();


  /* ====== Carrusel dinámico (lee data.json) ====== */
  const carouselEl = document.getElementById('carousel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const viewport = document.querySelector('.carousel-viewport');

  if (!carouselEl) return; // sin carousel no seguimos

  // fetch robusto: acepta array directo o { novedades: [...] }
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar data.json: ' + res.status);
      return res.json();
    })
    .then(raw => {
      const items = Array.isArray(raw) ? raw : (raw.novedades || raw.items || []);
      if (!items.length) {
        carouselEl.innerHTML = `<div style="color:#ddd;padding:20px;">No hay novedades por mostrar.</div>`;
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
      }

      // renderizar items
      items.forEach(it => {
        const imagePath = it.imagen || it.image || '';
        const title = it.titulo || it.title || '';
        const desc = it.descripcion || it.description || '';
        const link = it.link || it.url || '#';

        const card = document.createElement('article');
        card.className = 'carousel-item';
        card.innerHTML = `
          <a href="${link}">
            <img src="${imagePath}" alt="${title}">
          <div class="card-body">
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>
          </a>
        `;
        carouselEl.appendChild(card);
      });

      // Esperar a que las imágenes carguen para calcular anchos correctamente
      const imgs = Array.from(carouselEl.querySelectorAll('img'));
      let imagesLoaded = 0;
      imgs.forEach(img => {
        if (img.complete) imagesLoaded++;
        else img.addEventListener('load', () => {
          imagesLoaded++;
          if (imagesLoaded === imgs.length) initCarousel();
        });
        img.addEventListener('error', () => {
          imagesLoaded++;
          if (imagesLoaded === imgs.length) initCarousel();
        });
      });
      if (imagesLoaded === imgs.length) initCarousel();

      // inicializa comportamiento del carrusel
      function initCarousel() {
        let index = 0;
        let itemWidth = computeItemWidth();
        let visibleCount = Math.max(1, Math.floor(viewport.clientWidth / itemWidth));
        let maxIndex = Math.max(0, items.length - visibleCount);

        // recalcula en resize
        window.addEventListener('resize', () => {
          itemWidth = computeItemWidth();
          visibleCount = Math.max(1, Math.floor(viewport.clientWidth / itemWidth));
          maxIndex = Math.max(0, items.length - visibleCount);
          if (index > maxIndex) index = maxIndex;
          update();
        });

        // Desplazamiento automático cada 5 segundos
        let autoSlideInterval = setInterval(() => {
          index++;
          if (index > maxIndex) index = 0;
          update();
        }, 5000);

        // Detener auto-slide mientras arrastras o haces hover
        carouselEl.addEventListener('pointerdown', () => clearInterval(autoSlideInterval));
        carouselEl.addEventListener('pointerup', () => {
          autoSlideInterval = setInterval(() => {
            index++;
            if (index > maxIndex) index = 0;
            update();
          }, 3000);
        });

        carouselEl.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselEl.addEventListener('mouseleave', () => {
          autoSlideInterval = setInterval(() => {
            index++;
            if (index > maxIndex) index = 0;
            update();
          }, 5000);
        });


        // actualizar transform y estado botones
        function update() {
          const translate = -(index * itemWidth);
          carouselEl.style.transform = `translateX(${translate}px)`;
          if (prevBtn) prevBtn.disabled = index <= 0;
          if (nextBtn) nextBtn.disabled = index >= maxIndex;
        }

        // calcular ancho de un item (incluye gap)
        function computeItemWidth() {
          const first = carouselEl.querySelector('.carousel-item');
          if (!first) return 300;
          const style = getComputedStyle(first);
          const marginLeft = parseFloat(style.marginLeft) || 0;
          const marginRight = parseFloat(style.marginRight) || 0;
          const rect = first.getBoundingClientRect();
          return rect.width + marginLeft + marginRight;
        }

        // handlers botones
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            index = Math.min(maxIndex, index + 1);
            update();
          });
        }
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            index = Math.max(0, index - 1);
            update();
          });
        }

        // ---- Reemplazar sección touch / swipe ----
        let pointerStartX = 0;
        let pointerDelta = 0;
        let isPointerDown = false;
        let didMove = false;
        let startAnchor = null;

        carouselEl.addEventListener('pointerdown', (e) => {
          isPointerDown = true;
          didMove = false;
          pointerStartX = e.clientX;
          pointerDelta = 0;
          startAnchor = e.target.closest('a') || null; // guardamos el <a> donde empezó el touch/click
          carouselEl.style.transition = 'none';
          // NO usamos setPointerCapture, para no interferir con el click nativo
        });

        carouselEl.addEventListener('pointermove', (e) => {
          if (!isPointerDown) return;
          pointerDelta = e.clientX - pointerStartX;
          if (Math.abs(pointerDelta) > 5) didMove = true; // diferencia entre click y drag
          carouselEl.style.transform = `translateX(${-(index * itemWidth) + pointerDelta}px)`;
        });

        function finishPointer(e) {
          if (!isPointerDown) return;
          isPointerDown = false;
          carouselEl.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.3,1)';

          if (Math.abs(pointerDelta) > 50) {
            // swipe real → cambiar slide
            if (pointerDelta < 0 && index < maxIndex) index++;
            if (pointerDelta > 0 && index > 0) index--;
            update();
          } else {
            // casi no hubo movimiento → tratamos como click
            if (!didMove) {
              let link = startAnchor;
              if (!link && e && typeof e.clientX === 'number') {
                const elem = document.elementFromPoint(e.clientX, e.clientY);
                link = elem ? elem.closest('a') : null;
              }
              if (link && link.href) {
                link.click();
              }
            }
          }

          pointerDelta = 0;
          didMove = false;
          startAnchor = null;
        }

        carouselEl.addEventListener('pointerup', finishPointer);
        window.addEventListener('pointerup', finishPointer);

        carouselEl.addEventListener('pointercancel', () => {
          isPointerDown = false;
          pointerDelta = 0;
          didMove = false;
          carouselEl.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.3,1)';
          update();
        });
        window.addEventListener('pointercancel', () => {
          isPointerDown = false;
          pointerDelta = 0;
          didMove = false;
        });


        // keyboard support
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
            index = Math.min(maxIndex, index + 1); update();
          } else if (e.key === 'ArrowLeft') {
            index = Math.max(0, index - 1); update();
          }
        });

        // inicio
        update();
      } // fin initCarousel

    })
    .catch(err => {
      console.error('Error cargando novedades (data.json):', err);
      carouselEl.innerHTML = `<div style="color:#eee;padding:20px;">Error cargando novedades. Revisa la consola.</div>`;
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
    });


});
