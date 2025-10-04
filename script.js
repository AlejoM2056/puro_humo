// Marcar el enlace activo según la página actual
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

function showSection(section) {
  document.getElementById("homeSection").classList.add("hidden");
  document.getElementById("configuratorSection").classList.add("hidden");
  document.getElementById("feedbackSection").classList.add("hidden");

  if (section === "home") {
    document.getElementById("homeSection").classList.remove("hidden");
  } else if (section === "configurator") {
    document.getElementById("configuratorSection").classList.remove("hidden");
  } else if (section === "feedback") {
    document.getElementById("feedbackSection").classList.remove("hidden");
  }

  var menu = document.getElementById("navMenu");
  menu.classList.remove("active");
}

function toggleMenu() {
  var menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}



function rateStar(element, rating) {
  var container = element.parentElement;
  var stars = container.getElementsByClassName("star");

  for (var i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add("active");
    } else {
      stars[i].classList.remove("active");
    }
  }
}

setInterval(function () {
  var viewersElement = document.getElementById("viewers");
  var currentViewers = parseInt(viewersElement.textContent);
  var change = Math.floor(Math.random() * 3) - 1;
  var newViewers = Math.max(15, currentViewers + change);
  viewersElement.textContent = newViewers;
}, 3000);


let currentSlide = 0;
const slides = document.querySelectorAll(".ingredient-card-detailed");
const indicators = document.querySelectorAll(".indicator");
let autoSlideInterval;

// Función para mostrar una diapositiva específica
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        indicators[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
}

// Función para mover el carrusel hacia adelante o atrás
function moveCarousel(direction) {
    let newIndex = currentSlide + direction;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
    resetAutoSlide();
}

// Función para ir directamente a una diapositiva
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Función para activar el auto cambio cada 10s
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // 10 segundos
}

// Reinicia el temporizador cuando el usuario interactúa
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Inicializar carrusel
showSlide(currentSlide);
startAutoSlide();


