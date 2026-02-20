document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // Sticky Navigation
    // ========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ========================================
    // Scroll Animations (Fade In)
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Contact Form Validation & Submission
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Validate name
        if (name === '') {
            document.getElementById('name-error').textContent = 'Please enter your name';
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('email-error').textContent = 'Please enter your email';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate message
        if (message === '') {
            document.getElementById('message-error').textContent = 'Please enter your message';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (isValid) {
            // Log form data to console (demo purposes)
            console.log('Form Submitted:', {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                message: message,
                timestamp: new Date().toISOString()
            });

            // Show success message
            formSuccess.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }
    });

    // ========================================
    // Button Click Effects
    // ========================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only apply to anchor buttons (not form submit)
            if (this.tagName === 'A') {
                // Let smooth scroll handle it
                return;
            }
            
            // Scale effect for click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ========================================
    // Menu Card Hover Effect
    // ========================================
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

    // ========================================
    // Header Animation on Page Load
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }

    // ========================================
    // Parallax Effect (Optional - for hero)
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // ========================================
    // Testimonial Auto-Rotate (Simple version)
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.display = 'block';
            if (index !== currentTestimonial) {
                // On mobile, show all; on desktop, only current
                if (window.innerWidth > 768) {
                    card.style.display = 'none';
                }
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Only rotate on desktop
    if (window.innerWidth > 768 && testimonialCards.length > 1) {
        rotateTestimonials();
        setInterval(rotateTestimonials, 5000);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            rotateTestimonials();
        }
    });

    console.log('The Velvet Bean Cafe - Website loaded successfully!');
});
