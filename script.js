// Variáveis globais
let isScrolling = false;
let hasAnimatedCounters = false;

// ========================================
// 1. LOGO ANIMADA - EFEITOS EXTRAS
// ========================================
function initLogoEffects() {
    const logoWrapper = document.querySelector('.logo-wrapper');
    const logoImage = document.querySelector('.logo-image');
    const logoCircle = document.querySelector('.logo-circle');
    
    if (logoWrapper && logoImage && logoCircle) {
        // Efeito de pulso no clique
        logoWrapper.addEventListener('click', () => {
            logoImage.style.animation = 'none';
            logoCircle.style.animation = 'none';
            
            setTimeout(() => {
                logoImage.style.animation = 'spin 1s ease-in-out, float 3s ease-in-out infinite';
                logoCircle.style.animation = 'rotate 4s linear infinite';
            }, 10);
            
            showNotification(' VIP Sphere - Conectando pessoas incríveis!', 'info');
        });
        
        // Efeito parallax suave na logo ao mover o mouse
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            if (logoImage) {
                logoImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
            }
        });
    }
}

// ========================================
// 2. NAVBAR COM SCROLL EFFECT
// ========================================
function handleNavbarScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.transition = 'all 0.3s ease';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
}

// ========================================
// 3. INDICADOR DE PROGRESSO DE SCROLL
// ========================================
function updateScrollIndicator() {
    let scrollIndicator = document.getElementById('scrollIndicator');
    
    // Criar indicador se não existir
    if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.id = 'scrollIndicator';
        scrollIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--accent), var(--gold));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollIndicator);
    }
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    scrollIndicator.style.width = scrolled + '%';
}

// ========================================
// 4. BOTÃO VOLTAR AO TOPO
// ========================================
function handleBackToTop() {
    let backToTopBtn = document.getElementById('backToTop');
    
    // Criar botão se não existir
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(123, 31, 162, 0.3);
            z-index: 9998;
        `;
        backToTopBtn.addEventListener('click', scrollToTop);
        document.body.appendChild(backToTopBtn);
    }
    
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// 5. ANIMAÇÃO DE CONTADOR NAS ESTATÍSTICAS
// ========================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + suffix;
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
}

function initCounters() {
    if (hasAnimatedCounters) return; // Evitar animação duplicada
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const index = Array.from(statNumbers).indexOf(entry.target);
                
                if (index === 0) {
                    animateCounter(entry.target, 10, '+'); // 10k+
                } else if (index === 1) {
                    animateCounter(entry.target, 500, '+'); // 500+
                } else if (index === 2) {
                    animateCounter(entry.target, 95, '%'); // 95%
                }
                
                hasAnimatedCounters = true;
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ========================================
// 6. ANIMAÇÃO DE FADE-IN AO SCROLL
// ========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .section-header, .hero-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ========================================
// 7. SISTEMA DE NOTIFICAÇÕES
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                    'linear-gradient(135deg, var(--primary), var(--accent))',
        color: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.4s ease',
        fontWeight: '600',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.styles.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// 8. SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// 9. EFEITO PARALLAX SUAVE
// ========================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

// ========================================
// 10. INTERAÇÕES DOS BOTÕES
// ========================================
function initButtonInteractions() {
    // Botões de CTA
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('Começar') || buttonText.includes('Criar')) {
                showNotification(' Funcionalidade de cadastro em breve!', 'info');
            } else if (buttonText.includes('Explorar')) {
                showNotification(' Eventos exclusivos em desenvolvimento!', 'info');
            } else if (buttonText.includes('Entrar')) {
                showNotification(' Sistema de login em breve!', 'info');
            }
        });
    });
}

// ========================================
// 11. EFEITOS DE HOVER NOS CARDS
// ========================================
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========================================
// 12. EASTER EGG - KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification(' Código Konami ativado! Modo VIP Ultra desbloqueado! ', 'success');
        
        document.body.style.animation = 'rainbow 5s linear infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 5000);
    }
});

// ========================================
// 13. PERFORMANCE - DEBOUNCE PARA SCROLL
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// 14. INICIALIZAÇÃO PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log(' VIP Sphere carregado com sucesso!');
    
    // Inicializar funcionalidades
    initLogoEffects();
    initCounters();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initButtonInteractions();
    initCardEffects();
    
    // Eventos de scroll com debounce para performance
    window.addEventListener('scroll', debounce(() => {
        handleNavbarScroll();
        updateScrollIndicator();
        handleBackToTop();
    }, 10));
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        showNotification(' Bem-vindo ao VIP Sphere!', 'success');
    }, 800);
    
    console.log(' Todas as funcionalidades carregadas!');
});

// ========================================
// 15. LOADING SCREEN (OPCIONAL)
// ========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});