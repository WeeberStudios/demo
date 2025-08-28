// forked from the hero https://codepen.io/osublake/pen/BYwgBg & added GSAP gradients.

console.clear();

let overlay = document.querySelector(".shape-overlays");
let pagina = document.body;
let paths = document.querySelectorAll(".shape-overlays__path");
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });

let numPoints = 10;
let numPaths = paths.length;
let delayPointsMax = 0.3;
let delayPerPath = 0.25;
let duration = 0.9;
let isOpened = false;
let pointsDelay = [];
let allPoints = [];

let tl = gsap.timeline({
  onUpdate: render,
  defaults: {
    ease: "power2.inOut",
    duration: 0.9,
  },
});

for (let i = 0; i < numPaths; i++) {
  let points = [];
  allPoints.push(points);
  for (let j = 0; j < numPoints; j++) {
    points.push(100);
  }
}
function cambiar() {
  overlay.style.zIndex = "-100";
  pagina.style.zIndex = "100";
}

toggle();
function toggle() {
  tl.progress(0).clear();

  for (let i = 0; i < numPoints; i++) {
    pointsDelay[i] = Math.random() * delayPointsMax;
  }

  for (let i = 0; i < numPaths; i++) {
    let points = allPoints[i];
    let pathDelay = delayPerPath * (isOpened ? i : numPaths - i - 1);

    for (let j = 0; j < numPoints; j++) {
      let delay = pointsDelay[j];
      tl.to(
        points,
        {
          [j]: 0,
        },
        delay + pathDelay
      );
    }
  }
  setTimeout(cambiar, 2000);
}

function render() {
  for (let i = 0; i < numPaths; i++) {
    let path = paths[i];
    let points = allPoints[i];

    let d = "";
    d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;

    for (let j = 0; j < numPoints - 1; j++) {
      let p = ((j + 1) / (numPoints - 1)) * 100;
      let cp = p - ((1 / (numPoints - 1)) * 100) / 2;
      d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
    }

    d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
    path.setAttribute("d", d);
  }
}


gsap.from(".hero .text h1", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 1,
  ease: "power2.out",
});

gsap.from(".hero .text p", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 1.1,
  ease: "power2.out",
});

gsap.from(".hero .cta", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 1.4,
  ease: "power2.out",
});
gsap.from(".hero .text .rating", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 1.4,
  ease: "power2.out",
});

// Parallax para la tarjeta de presentación
gsap.from(".hero-card", {
  x: 40,
  opacity: 0,
  duration: 1,
  delay: 1,
  ease: "power2.out",
});
//Flotante
gsap.to(".hero-card", {
  y: -20,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
  duration: 4,
});

 // Optional floating effect (independent of scroll)
  gsap.to(".blob", {
    y: -15,
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "sine.inOut"
  });

  
  gsap.utils.toArray(".float-icon").forEach(icon => {
    gsap.to(icon, {
      y: -15,
      repeat: -1,
      yoyo: true,
      duration: 3 + Math.random(),
      ease: "sine.inOut"
    });
  });

  ///******GSAP SCROLLSMOOTHER
  // Inicia GSAP ScrollSmoother
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    smoothTouch: 0.1,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true

  });

  // Navegación con scroll animado
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      smoother.scrollTo(target, true, "top top");
    }
  });
});
// Animación de entrada agresiva para el logo tipo "parallax"
gsap.from(".about-left", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
  y: 100,
  opacity: 0,
  scale: 0.8,
  ease: "power4.out",
});

// Animación del quote tipo “reveal”
gsap.from(".about-quote", {
  scrollTrigger: {
    trigger: ".about-quote",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "expo.out",
});

// Animación secuencial para los iconos
gsap.from(".gsap-about-icon", {
  scrollTrigger: {
    trigger: ".about-icons",
    start: "top 80%",
    end: "bottom top",
    scrub: true
  },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Animación del contenido a la derecha con desplazamiento suave
gsap.from(".about-right", {
  scrollTrigger: {
    trigger: ".about-right",
    start: "top 85%",
    end: "bottom center",
    scrub: true,
  },
  y: 100,
  opacity: 0,
  ease: "power2.out",
});

//Section Services
// Título animación
 gsap.fromTo(
  ".services-title",
  {
    opacity: 0,
    y: -50,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".services-title",
      start: "top 90%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none none reverse", // <- Esto permite que se repita en scroll up/down
    },
  }
);


  // Animación tipo acordeón para cada tarjeta
  gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true, // hace que la animación siga el scroll
        once: false,
      },
    }
  );
});


  //SECTION ENCOURAGEMENT

// Title: efecto tipo wavy + follow through
gsap.from(".encouragement-title", {
  scrollTrigger: {
    trigger: ".encouragement-section",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
  y: 80,
  rotation: 3,
  skewY: 8,
  opacity: 0,
  delay: 1.1,
  duration: 1.8,
  ease: "elastic.out(1, 0.5)",
});

// Text: fade in + slide
gsap.from(".encouragement-text", {
  scrollTrigger: {
    trigger: ".encouragement-section",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
  y: 65,
  opacity: 0,
  duration: 1.5,
  delay: 1.3,
  ease: "power3.out",
});

//CONTACTO
// Animaciones
gsap.from(".contact-title", {
  scrollTrigger: {
    trigger: ".contact-title",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#contact-form input, .whatsapp-button", {
  scrollTrigger: {
    trigger: "#contact-form",
    start: "top 85%",
    toggleActions: "play reverse play reverse",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out",
  stagger: 0.15,
});

// Enviar mensaje a WhatsApp
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const servicio = document.getElementById("servicio").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  const mensaje = `Hola, soy ${nombre}, estoy interesado en el servicio de ${servicio} el día ${fecha} a las ${hora}. ¿Está disponible?`;
  const numeroWhatsApp = "6861558987";

  const url = `https://wa.me/52${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

