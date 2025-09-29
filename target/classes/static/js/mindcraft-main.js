// MindCraft - Главный файл запуска игры
class MindCraftGame {
    constructor() {
        this.engine = null;
        this.isInitialized = false;
    }
    
    // Инициализация игры
    async init() {
        try {
            console.log('Запуск MindCraft...');
            
            // Создать игровой движок
            this.engine = new MindCraftEngine();
            
            // Инициализировать движок
            await this.engine.init();
            
            this.isInitialized = true;
            console.log('MindCraft успешно запущен!');
            
        } catch (error) {
            console.error('Ошибка запуска игры:', error);
            this.showError('Не удалось запустить игру. Проверьте консоль для подробностей.');
        }
    }
    
    // Показать ошибку
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f44336;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            max-width: 500px;
        `;
        errorDiv.innerHTML = `
            <h3>Ошибка запуска игры</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #f44336;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Перезагрузить страницу</button>
        `;
        
        document.body.appendChild(errorDiv);
    }
    
    // Остановить игру
    stop() {
        if (this.engine) {
            this.engine.stop();
        }
    }
}

// Глобальная переменная игры
let mindCraftGame = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM загружен, инициализация MindCraft...');
    
    // Проверить поддержку WebGL
    if (!checkWebGLSupport()) {
        alert('Ваш браузер не поддерживает WebGL. Пожалуйста, используйте современный браузер.');
        return;
    }
    
    // Создать и запустить игру
    mindCraftGame = new MindCraftGame();
    await mindCraftGame.init();
});

// Проверка поддержки WebGL
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    } catch (e) {
        return false;
    }
}

// Обработка ошибок
window.addEventListener('error', (event) => {
    console.error('Глобальная ошибка:', event.error);
});

// Обработка необработанных промисов
window.addEventListener('unhandledrejection', (event) => {
    console.error('Необработанная ошибка промиса:', event.reason);
});

// Экспорт для глобального доступа
window.MindCraftGame = MindCraftGame;
