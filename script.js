document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Detectar performance do dispositivo
    const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                            navigator.deviceMemory < 4 ||
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Desabilitar animações pesadas em dispositivos de baixa performance
    if (isLowPerformance) {
        console.log('Dispositivo de baixa performance detectado - otimizando animações');
        // Desabilitar partículas
        clearInterval(window.particleInterval);
        // Desabilitar cursor trail
        cursorTrailEnabled = false;
    }
    
    // Botão de toggle de animações
    const toggleBtn = document.getElementById('toggle-animations');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const isDisabled = this.classList.contains('disabled');
            
            if (isDisabled) {
                // Habilitar animações
                this.classList.remove('disabled');
                this.innerHTML = '<i class="fas fa-magic"></i>';
                showNotification('Animações habilitadas', 'success');
                
                // Retomar partículas
                if (!window.particleInterval) {
                    window.particleInterval = setInterval(createParticle, 5000);
                }
            } else {
                // Desabilitar animações
                this.classList.add('disabled');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                showNotification('Animações desabilitadas', 'info');
                
                // Pausar partículas
                if (window.particleInterval) {
                    clearInterval(window.particleInterval);
                    window.particleInterval = null;
                }
                
                // Limpar partículas existentes
                document.querySelectorAll('.particle').forEach(particle => {
                    particle.remove();
                });
            }
        });
    }
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 3000);

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.style) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        if (shape && shape.style) {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        }
    });
});

const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillObserver.observe(grid);
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle && heroTitle.textContent) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação dos campos
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Validações
        if (!name || name.length < 2) {
            showNotification('Nome deve ter pelo menos 2 caracteres', 'error');
            return;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            showNotification('Email inválido', 'error');
            return;
        }
        
        if (!subject || subject.length < 5) {
            showNotification('Assunto deve ter pelo menos 5 caracteres', 'error');
            return;
        }
        
        if (!message || message.length < 10) {
            showNotification('Mensagem deve ter pelo menos 10 caracteres', 'error');
            return;
        }
        
        try {
            // Simulação de envio
            showNotification('Enviando mensagem...', 'info');
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso!', 'success');
                this.reset();
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

document.querySelectorAll('.project-card').forEach(card => {
    if (card && card.style) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

document.querySelectorAll('.skill-card').forEach(card => {
    if (card && card.style) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];
let cursorTrailEnabled = false; // Desabilitando o cursor trail para evitar travamento

function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

// Comentando o cursor trail para evitar travamento
/*
if (cursorTrailEnabled) {
    for (let i = 0; i < 5; i++) {
        cursorTrail.push(createCursorTrail());
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursorTrail() {
        cursorTrail.forEach((trail, index) => {
            const delay = index * 2;
            setTimeout(() => {
                if (trail && trail.style) {
                    trail.style.left = mouseX + 'px';
                    trail.style.top = mouseY + 'px';
                    trail.style.opacity = '0.8';
                }
            }, delay);
        });
    }

    setInterval(updateCursorTrail, 16);
}
*/

let particleCount = 0;
const maxParticles = 5; // Reduzindo o número máximo de partículas

function createParticle() {
    if (particleCount >= maxParticles) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    particleCount++;
    
    let opacity = 0.3;
    let direction = 1;
    
    const animate = () => {
        if (!document.body.contains(particle)) return;
        
        opacity += 0.01 * direction;
        particle.style.opacity = opacity;
        
        if (opacity >= 0.6) direction = -1;
        if (opacity <= 0.1) direction = 1;
        
        requestAnimationFrame(animate);
    };
    
    animate();
    
    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
            particleCount--;
        }
    }, 6000); // Reduzindo o tempo de vida das partículas
}

// Reduzindo a frequência de criação de partículas
window.particleInterval = setInterval(createParticle, 5000);

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        if (progressBar && progressBar.style) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    });
}

createScrollProgress();

// Função para limpar elementos órfãos e melhorar performance
function cleanupOrphanedElements() {
    // Limpar partículas órfãs
    const orphanedParticles = document.querySelectorAll('.particle');
    orphanedParticles.forEach(particle => {
        if (!document.body.contains(particle)) {
            particle.remove();
        }
    });
    
    // Limpar cursor trails órfãos
    const orphanedTrails = document.querySelectorAll('.cursor-trail');
    orphanedTrails.forEach(trail => {
        if (!document.body.contains(trail)) {
            trail.remove();
        }
    });
}

// Executar limpeza periodicamente
setInterval(cleanupOrphanedElements, 10000);

// Pausar animações quando a aba não está visível
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar partículas quando a aba não está visível
        if (window.particleInterval) {
            clearInterval(window.particleInterval);
        }
    } else {
        // Retomar partículas quando a aba volta a ficar visível
        if (!window.particleInterval) {
            window.particleInterval = setInterval(createParticle, 5000);
        }
    }
});

const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target && entry.target.style) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animationObserverOptions);

document.querySelectorAll('.skill-card, .project-card, .about-card').forEach(el => {
    if (el && el.style) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    }
});

function initProjectModals() {
    const modals = document.querySelectorAll('.project-modal');
    const modalButtons = document.querySelectorAll('.project-modal-btn, .project-view-btn');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const modal = document.getElementById(`${projectId}-modal`);
                
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    initDemoInteractions(modal);
                }
            });
        }
    });

    closeButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                const modal = this.closest('.project-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    modals.forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.project-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

function initDemoInteractions(modal) {
    const demoButtons = modal.querySelectorAll('.demo-btn');
    const demoTabs = modal.querySelectorAll('.demo-tab');

    demoButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                demoButtons.forEach(btn => btn.classList.remove('active'));
                demoTabs.forEach(tab => tab.classList.remove('active'));
                
                this.classList.add('active');
                const targetTab = modal.querySelector(`#${tabId}-tab`);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        }
    });

    const addToCartButtons = modal.querySelectorAll('.add-to-cart-btn');
    const cartItems = modal.querySelector('.cart-items');
    const cartTotal = modal.querySelector('.cart-total');
    
    if (addToCartButtons.length > 0) {
        let cart = [];
        const products = {
            iphone: { name: 'iPhone 15', price: 4999 },
            macbook: { name: 'MacBook Pro', price: 12999 },
            watch: { name: 'Apple Watch', price: 2999 }
        };

        addToCartButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product');
                    const product = products[productId];
                    
                    if (product) {
                        cart.push(product);
                        updateCart();
                        this.textContent = 'Adicionado!';
                        this.style.background = '#10b981';
                        
                        setTimeout(() => {
                            this.textContent = 'Adicionar';
                            this.style.background = '';
                        }, 1000);
                    }
                });
            }
        });

        function updateCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
                cartTotal.innerHTML = '<strong>Total: R$ 0,00</strong>';
            } else {
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                cartItems.innerHTML = cart.map(item => 
                    `<div class="cart-item">
                        <span>${item.name}</span>
                        <span>R$ ${item.price.toLocaleString()}</span>
                    </div>`
                ).join('');
                cartTotal.innerHTML = `<strong>Total: R$ ${total.toLocaleString()}</strong>`;
            }
        }
    }

    const taskCheckboxes = modal.querySelectorAll('.task-item input[type="checkbox"]');
    const addTaskForm = modal.querySelector('.add-task-form');
    const taskList = modal.querySelector('.task-list');
    const statNumbers = modal.querySelectorAll('.stat-number');

    taskCheckboxes.forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                const taskItem = this.closest('.task-item');
                if (this.checked) {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.remove('completed');
                }
                updateTaskStats();
            });
        }
    });

    if (addTaskForm) {
        const addButton = addTaskForm.querySelector('.btn');
        const taskInput = addTaskForm.querySelector('input[type="text"]');
        
        if (addButton && taskInput) {
            addButton.addEventListener('click', function() {
                const taskText = taskInput.value.trim();
                if (taskText) {
                    const newTask = document.createElement('div');
                    newTask.className = 'task-item';
                    newTask.innerHTML = `
                        <input type="checkbox">
                        <span>${taskText}</span>
                        <span class="task-date">Hoje</span>
                    `;
                    
                    taskList.appendChild(newTask);
                    taskInput.value = '';
                    updateTaskStats();
                    
                    const newCheckbox = newTask.querySelector('input[type="checkbox"]');
                    newCheckbox.addEventListener('change', function() {
                        if (this.checked) {
                            newTask.classList.add('completed');
                        } else {
                            newTask.classList.remove('completed');
                        }
                        updateTaskStats();
                    });
                }
            });
        }
    }

    function updateTaskStats() {
        const tasks = modal.querySelectorAll('.task-item');
        const completed = modal.querySelectorAll('.task-item.completed');
        
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = tasks.length;
            statNumbers[1].textContent = completed.length;
            statNumbers[2].textContent = tasks.length - completed.length;
        }
    }

    const chartBars = modal.querySelectorAll('.bar');
    const downloadButtons = modal.querySelectorAll('.report-item .btn');

    chartBars.forEach(bar => {
        if (bar) {
            bar.addEventListener('click', function() {
                this.style.background = 'var(--secondary-color)';
                setTimeout(() => {
                    this.style.background = '';
                }, 500);
            });
        }
    });

    downloadButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                this.textContent = 'Downloading...';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = this.textContent.includes('PDF') ? 'Download PDF' : 'Download Excel';
                    this.style.background = '';
                    showNotification('Download iniciado!', 'success');
                }, 2000);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();

    document.querySelectorAll('.btn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                try {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        if (ripple && ripple.parentNode) {
                            ripple.remove();
                        }
                    }, 600);
                } catch (error) {
                    console.error('Ripple effect error:', error);
                }
            });
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 