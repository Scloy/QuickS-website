// Initialize Lucide Icons
try {
    lucide.createIcons();
} catch (e) {
    console.error("Lucide failed to load:", e);
}

/**
 * TYPEWRITER LOGIC
 */
const typewriterElement = document.getElementById('typewriter');
const words = ["oftware", "ystem", "ervice", "olution", "aaS"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];
    const baseText = "QuickS"; 
    
    if (isDeleting) {
        typewriterElement.textContent = baseText + currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = baseText + currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    } else {
        typeSpeed = isDeleting ? 70 : 130;
    }

    setTimeout(type, typeSpeed);
}

/**
 * REVEAL ON SCROLL
 */
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * INITIALIZATION & LOADING
 */
function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            type();
        }, 1000);
    }
}

function startApp() {
    initReveal();
    setTimeout(hideLoading, 2500);
}

setTimeout(hideLoading, 6000);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

/**
 * NAVBAR EFFECT
 */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else if (navbar) {
        navbar.classList.remove('nav-scrolled');
    }
});

/**
 * ADVANCED FORM HANDLING (Formspree)
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const status = document.createElement('div');
        status.className = 'fixed bottom-10 right-10 bg-white text-ig-text px-8 py-4 shadow-2xl font-sans text-xs uppercase tracking-widest z-50 reveal active';
        status.innerHTML = 'Enviando solicitação...';
        document.body.appendChild(status);

        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = 'Solicitação enviada! Entraremos em contato.';
                status.style.backgroundColor = '#1A1A1A';
                status.style.color = 'white';
                contactForm.reset();
                setTimeout(() => status.remove(), 5000);
            } else {
                status.innerHTML = 'Ocorreu um erro. Tente novamente.';
                setTimeout(() => status.remove(), 4000);
            }
        } catch (error) {
            status.innerHTML = 'Erro de conexão. Verifique sua internet.';
            setTimeout(() => status.remove(), 4000);
        }
    });
}
