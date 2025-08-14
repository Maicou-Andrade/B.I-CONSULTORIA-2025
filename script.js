// Carousel functionality - Global variables and functions
let currentSlideIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index] && indicators[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Move carousel
    const carousel = document.querySelector('.carousel-slides');
    if (carousel) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('header nav a, .hero-buttons a, .cta-content a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header fixo com mudança de estilo ao rolar
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
        
        lastScrollTop = scrollTop;
    });

    // Initialize carousel
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        startAutoSlide();
        
        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
    }
    
    // Animação de fade-in para elementos ao rolar
    const fadeElements = document.querySelectorAll('.solution-card, .feature-card, .testimonial');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Adicionar classe para elementos visíveis inicialmente
    window.addEventListener('load', checkFade);
    // Verificar elementos ao rolar
    window.addEventListener('scroll', checkFade);
    
    // Adicionar estilos CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .solution-card, .feature-card, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .solution-card.visible, .feature-card.visible, .testimonial.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .solution-card:nth-child(2), .feature-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .solution-card:nth-child(3), .feature-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .solution-card:nth-child(4), .feature-card:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
    
    // Validação simples do formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simular um atraso de envio
            setTimeout(function() {
                // Criar elemento de mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMessage.style.backgroundColor = '#10b981';
                successMessage.style.color = 'white';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '20px';
                
                // Adicionar mensagem após o formulário
                contactForm.appendChild(successMessage);
                
                // Resetar formulário
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remover mensagem após alguns segundos
                setTimeout(function() {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(function() {
                        contactForm.removeChild(successMessage);
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // Simulação de slider de depoimentos para telas menores
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 1 && window.innerWidth < 768) {
        let currentSlide = 0;
        const slideWidth = testimonials[0].offsetWidth;
        
        // Criar botões de navegação
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        sliderNav.style.display = 'flex';
        sliderNav.style.justifyContent = 'center';
        sliderNav.style.marginTop = '20px';
        sliderNav.style.gap = '10px';
        
        // Botão anterior
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.className = 'btn btn-secondary';
        prevButton.style.padding = '8px 16px';
        
        // Botão próximo
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.className = 'btn';
        nextButton.style.padding = '8px 16px';
        
        sliderNav.appendChild(prevButton);
        sliderNav.appendChild(nextButton);
        
        // Adicionar navegação após o slider
        testimonialSlider.parentNode.insertBefore(sliderNav, testimonialSlider.nextSibling);
        
        // Função para navegar entre slides
        function goToSlide(index) {
            if (index < 0) {
                index = testimonials.length - 1;
            } else if (index >= testimonials.length) {
                index = 0;
            }
            
            currentSlide = index;
            testimonialSlider.scrollTo({
                left: slideWidth * currentSlide,
                behavior: 'smooth'
            });
        }
        
        // Event listeners para botões
        prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
});