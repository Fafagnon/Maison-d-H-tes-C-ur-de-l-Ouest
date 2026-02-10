// ========================================
// VARIABLES GLOBALES
// ========================================
let currentSlide = 0;
let carouselInterval = null;

// ========================================
// INITIALISATION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initCarousel();
    initGalerie();
    initContactForm();
    initScrollEffects();
    updateFooterYear();
    markActiveLink();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');

    if (burger && navMenu) {
        burger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                burger.classList.remove('active');
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
                navMenu.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    }
}

function markActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// CARROUSEL HERO
// ========================================
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots button');

    if (slides.length === 0) return;

    // Fonction pour afficher une slide spécifique
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        currentSlide = index;
    }

    // Fonction pour passer à la slide suivante
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Fonction pour passer à une slide spécifique au clic sur un dot
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                showSlide(index);
                resetCarouselInterval();
            });
        });
    }

    // Démarrage automatique du carrousel
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 2000); // Change toutes les 2 secondes
    }

    function resetCarouselInterval() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        startCarousel();
    }

    // Pause au survol
    carousel.addEventListener('mouseenter', function () {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    });

    carousel.addEventListener('mouseleave', function () {
        startCarousel();
    });

    // Démarrer le carrousel
    startCarousel();
}

// ========================================
// GALERIE INTERACTIVE
// ========================================
function initGalerie() {
    const galerieItems = document.querySelectorAll('.galerie-item');
    const lightbox = document.querySelector('.lightbox');

    if (!lightbox || galerieItems.length === 0) return;

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    // Fonction pour ouvrir l'album
    galerieItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Récupérer l'image principale
            const mainImg = item.querySelector('img');

            // Récupérer les images cachées
            const hiddenPhotos = item.querySelectorAll('.hidden-photos img');

            // Construire la liste des images de l'album
            currentAlbumImages = [];

            // Ajouter l'image principale
            if (mainImg) {
                currentAlbumImages.push({
                    src: mainImg.src,
                    alt: mainImg.alt
                });
            }

            // Ajouter les images cachées
            hiddenPhotos.forEach(photo => {
                currentAlbumImages.push({
                    src: photo.src,
                    alt: photo.alt
                });
            });

            if (currentAlbumImages.length > 0) {
                currentImageIndex = 0;
                updateLightboxImage();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Mettre à jour l'image affichée
    function updateLightboxImage() {
        if (currentAlbumImages.length === 0) return;

        const imgData = currentAlbumImages[currentImageIndex];
        lightboxImg.src = imgData.src;
        lightboxImg.alt = imgData.alt;

        // Gérer visibilité des flèches
        if (currentAlbumImages.length > 1) {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        } else {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        }
    }

    // Navigation Précédent
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function (e) {
            e.stopPropagation(); // Empêcher la fermeture
            currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
            updateLightboxImage();
        });
    }

    // Navigation Suivant
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function (e) {
            e.stopPropagation(); // Empêcher la fermeture
            currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
            updateLightboxImage();
        });
    }

    // Fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Fermer au clic sur le fond (mais pas sur l'image ou les flèches)
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Navigation clavier
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
            updateLightboxImage();
        }
    });
}

// ========================================
// FORMULAIRE DE CONTACT
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    const status = document.getElementById("form-status");

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = new FormData(contactForm);
        const action = contactForm.action;

        // Afficher message de chargement
        status.style.display = "block";
        status.style.color = "var(--vert-fonce)";
        status.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Envoi en cours...";

        fetch(action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.style.color = "green";
                status.innerHTML = "<i class='fas fa-check-circle'></i> Merci ! Votre message a bien été envoyé.";
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.style.color = "red";
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.style.color = "red";
                        status.innerHTML = "Oups ! Une erreur s'est produite lors de l'envoi.";
                    }
                })
            }
        }).catch(error => {
            status.style.color = "red";
            status.innerHTML = "Oups ! Une erreur s'est produite lors de l'envoi.";
        });
    });
}

// ========================================
// EFFETS AU SCROLL
// ========================================
function initScrollEffects() {
    const header = document.querySelector('header');

    if (!header) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation d'apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes
    const cards = document.querySelectorAll('.chambre-card, .galerie-item, .info-card');
    cards.forEach(function (card) {
        observer.observe(card);
    });
}

// ========================================
// UTILITAIRES
// ========================================
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// WHATSAPP
// ========================================
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    const whatsappNumber = '22890051481'; // À remplacer par le vrai numéro

    whatsappButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const message = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur votre maison d\'hôtes.');
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    });
}

// Initialiser les boutons WhatsApp
document.addEventListener('DOMContentLoaded', initWhatsAppButtons);
