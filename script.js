/* =========================================================
   PORTFOLIO CLARA RAMOS - JavaScript Interactivo
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. MODO CLARO / OSCURO
     ============================================ */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');

    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 300);
  });


  /* ============================================
     2. EFECTO MÁQUINA DE ESCRIBIR
     ============================================ */
  const typedText = document.getElementById('typed-text');
  const textos = [
    'Estudiante de 2º DAW',
    'Apasionada por la programación',
    'Futura desarrolladora web'
  ];

  let textoIndex = 0;
  let charIndex = 0;
  let borrando = false;

  function escribir() {
    if (!typedText) return;

    const textoActual = textos[textoIndex];

    if (!borrando) {
      typedText.textContent = textoActual.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === textoActual.length) {
        borrando = true;
        setTimeout(escribir, 1800);
        return;
      }
    } else {
      typedText.textContent = textoActual.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        borrando = false;
        textoIndex = (textoIndex + 1) % textos.length;
      }
    }

    setTimeout(escribir, borrando ? 40 : 90);
  }

  escribir();


  /* ============================================
     3. SCROLL SUAVE + MENÚ ACTIVO
     ============================================ */
  const enlaces = document.querySelectorAll('.menu a');
  const secciones = document.querySelectorAll('section');
  const sidebar = document.getElementById('sidebar');

  enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = document.querySelector(enlace.getAttribute('href'));
      if (!destino) return;

      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sidebar.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    let actual = '';

    secciones.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        actual = sec.getAttribute('id');
      }
    });

    enlaces.forEach(enlace => {
      enlace.classList.remove('active');
      if (enlace.getAttribute('href') === `#${actual}`) {
        enlace.classList.add('active');
      }
    });
  });


  /* ============================================
     4. ANIMACIONES AL HACER SCROLL
     ============================================ */
  const elementosAnimar = document.querySelectorAll(
    '.sobre-mi, .habilidades, .cursos, .idiomas, .contacto, .hero-text > *'
  );
  elementosAnimar.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ============================================
     5. BARRAS DE IDIOMAS ANIMADAS
     ============================================ */
  const barras = document.querySelectorAll('.progreso');

  const observerBarras = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ancho = entry.target.dataset.width;
        entry.target.style.width = ancho;
        observerBarras.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  barras.forEach(barra => {
    barra.dataset.width = barra.style.width || '0%';
    barra.style.width = '0%';
    observerBarras.observe(barra);
  });


  /* ============================================
     6. BOTÓN VOLVER ARRIBA
     ============================================ */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ============================================
     7. MENÚ MÓVIL
     ============================================ */
  const menuToggle = document.getElementById('menu-toggle');

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
      menuToggle.textContent = '☰';
    }
  });


  /* ============================================
     8. PARTÍCULAS DE FONDO
     ============================================ */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let ancho, alto, particulas;

  function initCanvas() {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
    particulas = [];

    const cantidad = window.innerWidth < 600 ? 30 : 60;

    for (let i = 0; i < cantidad; i++) {
      particulas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        radio: Math.random() * 2 + 0.5,
        velX: (Math.random() - 0.5) * 0.4,
        velY: (Math.random() - 0.5) * 0.4,
        opacidad: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animarParticulas() {
    ctx.clearRect(0, 0, ancho, alto);

    const esClaro = body.classList.contains('light-mode');
    const color = esClaro ? '139, 92, 246' : '167, 139, 250';

    particulas.forEach(p => {
      p.x += p.velX;
      p.y += p.velY;

      if (p.x < 0 || p.x > ancho) p.velX *= -1;
      if (p.y < 0 || p.y > alto)  p.velY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacidad})`;
      ctx.fill();
    });

    particulas.forEach((p1, i) => {
      particulas.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animarParticulas);
  }

  initCanvas();
  animarParticulas();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCanvas, 200);
  });


  /* ============================================
     9. AÑO DINÁMICO EN FOOTER
     ============================================ */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ============================================
     10. MODAL DE CERTIFICADOS
     ============================================ */
  const modal = document.getElementById('modal-certificado');
  const modalImg = document.getElementById('modal-img');
  const botonesCert = document.querySelectorAll('.btn-certificado');

  if (modal && modalImg) {
    botonesCert.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const ruta = btn.dataset.img;
        if (!ruta) return;

        modalImg.style.opacity = '0';
        modalImg.src = ruta;
        modalImg.alt = btn.closest('.curso-card, .idioma-card')
          ?.querySelector('h4')?.textContent || 'Certificado';

        modalImg.onload = () => {
          modalImg.style.transition = 'opacity 0.3s ease';
          modalImg.style.opacity = '1';
        };

        modal.classList.add('open');
        document.body.classList.add('modal-open');
      });
    });

    modal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => cerrarModal());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        cerrarModal();
      }
    });

    function cerrarModal() {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        modalImg.src = '';
        modalImg.style.opacity = '0';
      }, 300);
    }
  }


  /* ============================================
     11. LOG EN CONSOLA 🎉
     ============================================ */
  console.log('%c¡Hola! 👋 Soy Clara Ramos', 'color: #a78bfa; font-size: 18px; font-weight: bold;');
  console.log('%cGracias por inspeccionar mi portfolio 💜', 'color: #8b5cf6; font-size: 14px;');

});