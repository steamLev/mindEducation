// MindEducation - Игровые анимации и интерактивность

class GameAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupCharacterAnimations();
        this.setupLocationAnimations();
        this.setupStageAnimations();
        this.setupParticleEffects();
        this.setupSoundEffects();
    }

    // Анимации персонажей
    setupCharacterAnimations() {
        const characterCards = document.querySelectorAll('.character-card');
        
        characterCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCharacterCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCharacterCard(card, 'leave');
            });
            
            card.addEventListener('click', () => {
                this.animateCharacterSelection(card);
            });
        });
    }

    animateCharacterCard(card, action) {
        const icon = card.querySelector('i.fa-user');
        const title = card.querySelector('.card-title');
        
        if (action === 'enter') {
            // Анимация при наведении
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#007bff';
            }
            
            if (title) {
                title.style.color = '#007bff';
            }
        } else {
            // Возврат к исходному состоянию
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            }
            
            if (title) {
                title.style.color = '';
            }
        }
    }

    animateCharacterSelection(card) {
        // Анимация выбора персонажа
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.8';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
            
            // Добавляем эффект "пульсации"
            card.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        }, 150);
    }

    // Анимации локаций
    setupLocationAnimations() {
        const locationCards = document.querySelectorAll('.location-card');
        
        locationCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateLocationCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateLocationCard(card, 'leave');
            });
        });
    }

    animateLocationCard(card, action) {
        if (action === 'enter') {
            card.style.transform = 'scale(1.05) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            card.style.transition = 'all 0.3s ease';
        } else {
            card.style.transform = 'scale(1) rotateY(0deg)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        }
    }

    // Анимации этапов обучения
    setupStageAnimations() {
        const stageCards = document.querySelectorAll('.stage-card');
        
        stageCards.forEach((card, index) => {
            // Задержка появления карточек
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
            
            card.addEventListener('click', () => {
                this.animateStageSelection(card);
            });
        });
    }

    animateStageSelection(card) {
        // Эффект "волны" при клике
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0,123,255,0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Частицы и эффекты
    setupParticleEffects() {
        // Создаем частицы для фона
        this.createFloatingParticles();
        
        // Эффект "звездного неба" для исторических локаций
        this.createStarField();
    }

    createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(0,123,255,0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s linear infinite`;
        
        container.appendChild(particle);
    }

    createStarField() {
        const starField = document.createElement('div');
        starField.style.position = 'fixed';
        starField.style.top = '0';
        starField.style.left = '0';
        starField.style.width = '100%';
        starField.style.height = '100%';
        starField.style.pointerEvents = 'none';
        starField.style.zIndex = '0';
        starField.style.background = 'radial-gradient(ellipse at center, #1e3c72 0%, #2a5298 100%)';
        
        document.body.insertBefore(starField, document.body.firstChild);
        
        for (let i = 0; i < 100; i++) {
            this.createStar(starField);
        }
    }

    createStar(container) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`;
        
        container.appendChild(star);
    }

    // Звуковые эффекты
    setupSoundEffects() {
        // Создаем аудио контекст для звуковых эффектов
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Добавляем звуковые эффекты к кнопкам
        const buttons = document.querySelectorAll('button, .card');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.playClickSound();
            });
        });
    }

    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Анимация загрузки
    showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.id = 'game-loader';
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.background = 'rgba(0,0,0,0.8)';
        loader.style.display = 'flex';
        loader.style.justifyContent = 'center';
        loader.style.alignItems = 'center';
        loader.style.zIndex = '9999';
        
        loader.innerHTML = `
            <div class="text-center text-white">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <h4>Загружаем игру...</h4>
            </div>
        `;
        
        document.body.appendChild(loader);
    }

    hideLoadingAnimation() {
        const loader = document.getElementById('game-loader');
        if (loader) {
            loader.remove();
        }
    }

    // Анимация появления контента
    animateContentAppearance() {
        const elements = document.querySelectorAll('.card, .btn, .alert');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0px) rotate(360deg); }
    }
    
    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }
    
    .character-card, .location-card, .stage-card {
        transition: all 0.3s ease;
    }
    
    .btn {
        transition: all 0.2s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Инициализация анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const gameAnimations = new GameAnimations();
    gameAnimations.animateContentAppearance();
});

// Экспорт для использования в других модулях
window.GameAnimations = GameAnimations;

