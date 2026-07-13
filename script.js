// --- MENU RESPONSIVE TOGGLE ---
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const icon = document.getElementById('menu-icon');
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
}

// --- EFFET HEADER SCROLL ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- ANIMATION REVEAL (SCROLL) ---
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Lancement au chargement

// --- ANIMATION DES COMPTEURS (STATS) ---
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = target / 50; // Ajustement de la vitesse

            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(runCounters, 30);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Déclenchement des compteurs quand ils sont visibles à l'écran
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runCounters();
                observer.disconnect(); // S'exécute une seule fois
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
}

// --- INITIALISATION PARTICLES.JS ---
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00d4ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00d4ff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.6 } } }
        },
        "retina_detect": true
    });
}

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêche la redirection de la page
        
        const data = new FormData(event.target);
        
        status.innerHTML = "Envoi en cours...";
        status.style.color = "#00d4ff";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Merci ! Votre message a été envoyé avec succès.";
                status.style.color = "#00ff88";
                form.reset(); // Vide les champs du formulaire
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    status.innerHTML = result.errors.map(error => error.message).join(", ");
                } else {
                    status.innerHTML = "Oups ! Un problème est survenu lors de l'envoi.";
                }
                status.style.color = "#ff4a4a";
            }
        } catch (error) {
            status.innerHTML = "Impossible d'envoyer le message. Vérifiez votre connexion.";
            status.style.color = "#ff4a4a";
        }
    });
}
