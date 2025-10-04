document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active'); 
        
        const href = link.getAttribute('href');
        const cleanHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
        
        if (cleanHref === currentPage || 
            (currentPage === '' && cleanHref === 'index.html') ||
            cleanHref.endsWith(currentPage)) {
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



let currentSlide = 0;
const slides = document.querySelectorAll(".ingredient-card-detailed");
const indicators = document.querySelectorAll(".indicator");
let autoSlideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        indicators[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
}

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

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); 
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

showSlide(currentSlide);
startAutoSlide();


// Intersection Observer para animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase scroll-reveal
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});