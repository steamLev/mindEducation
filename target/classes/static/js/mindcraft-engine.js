// MindCraft - Основной игровой движок
class MindCraftEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.world = null;
        this.player = null;
        this.questManager = null;
        this.isRunning = false;
        this.clock = new THREE.Clock();
        
        // Настройки игры
        this.settings = {
            renderDistance: 8,
            blockSize: 1,
            gravity: -9.82,
            playerSpeed: 5,
            jumpForce: 8
        };
        
        // Состояние игры
        this.gameState = {
            currentCharacter: null,
            currentLocation: 'rome',
            currentQuest: null,
            isPaused: false
        };
    }
    
    // Инициализация движка
    async init() {
        try {
            this.setupRenderer();
            this.setupScene();
            this.setupLighting();
            this.setupPhysics();
            this.setupControls();
            
            // Показать выбор персонажа
            this.showCharacterSelect();
            
            console.log('MindCraft Engine инициализирован');
        } catch (error) {
            console.error('Ошибка инициализации движка:', error);
        }
    }
    
    // Настройка рендерера
    setupRenderer() {
        const canvas = document.getElementById('gameCanvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x87CEEB, 1); // Небесно-голубой цвет
    }
    
    // Настройка сцены
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
        
        // Настройка камеры
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 10, 10);
    }
    
    // Настройка освещения
    setupLighting() {
        // Направленный свет (солнце)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);
        
        // Окружающий свет
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
    }
    
    // Настройка физики
    setupPhysics() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, this.settings.gravity, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10;
        
        // Материалы
        this.materials = {
            ground: new CANNON.Material('ground'),
            player: new CANNON.Material('player'),
            block: new CANNON.Material('block')
        };
        
        // Контакты между материалами
        const groundPlayerContact = new CANNON.ContactMaterial(
            this.materials.ground,
            this.materials.player,
            { friction: 0.4, restitution: 0.3 }
        );
        this.world.addContactMaterial(groundPlayerContact);
    }
    
    // Настройка управления
    setupControls() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            jump: false,
            interact: false
        };
        
        // Обработка клавиатуры
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'KeyW': this.keys.forward = true; break;
                case 'KeyS': this.keys.backward = true; break;
                case 'KeyA': this.keys.left = true; break;
                case 'KeyD': this.keys.right = true; break;
                case 'Space': 
                    event.preventDefault();
                    this.keys.jump = true; 
                    break;
                case 'KeyE': this.keys.interact = true; break;
                case 'KeyQ': this.toggleQuestPanel(); break;
            }
        });
        
        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'KeyW': this.keys.forward = false; break;
                case 'KeyS': this.keys.backward = false; break;
                case 'KeyA': this.keys.left = false; break;
                case 'KeyD': this.keys.right = false; break;
                case 'Space': this.keys.jump = false; break;
                case 'KeyE': this.keys.interact = false; break;
            }
        });
        
        // Обработка мыши
        let isPointerLocked = false;
        document.addEventListener('click', () => {
            if (!isPointerLocked) {
                document.body.requestPointerLock();
            }
        });
        
        document.addEventListener('pointerlockchange', () => {
            isPointerLocked = document.pointerLockElement === document.body;
        });
        
        document.addEventListener('mousemove', (event) => {
            if (isPointerLocked && this.player) {
                this.player.handleMouseMove(event);
            }
        });
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    // Показать выбор персонажа
    showCharacterSelect() {
        const loadingScreen = document.getElementById('loadingScreen');
        const characterSelect = document.getElementById('characterSelect');
        
        loadingScreen.style.display = 'none';
        characterSelect.style.display = 'block';
        
        // Обработка выбора персонажа
        const characterOptions = document.querySelectorAll('.character-option');
        characterOptions.forEach(option => {
            option.addEventListener('click', () => {
                characterOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.gameState.currentCharacter = option.dataset.character;
            });
        });
        
        // Кнопка начала игры
        document.getElementById('startGame').addEventListener('click', () => {
            if (this.gameState.currentCharacter) {
                this.startGame();
            } else {
                alert('Пожалуйста, выберите персонажа!');
            }
        });
    }
    
    // Начать игру
    async startGame() {
        const characterSelect = document.getElementById('characterSelect');
        characterSelect.style.display = 'none';
        
        // Создать игрока
        this.player = new MindCraftPlayer(this, this.gameState.currentCharacter);
        await this.player.init();
        
        // Создать мир
        this.worldGenerator = new MindCraftWorld(this);
        await this.worldGenerator.generateWorld();
        
        // Инициализировать квесты
        this.questManager = new MindCraftQuests(this);
        await this.questManager.init();
        
        // Обновить UI
        this.updateUI();
        
        // Запустить игровой цикл
        this.isRunning = true;
        this.gameLoop();
        
        console.log('Игра началась!');
    }
    
    // Игровой цикл
    gameLoop() {
        if (!this.isRunning) return;
        
        const deltaTime = this.clock.getDelta();
        
        // Обновить физику
        this.world.step(deltaTime);
        
        // Обновить игрока
        if (this.player) {
            this.player.update(deltaTime);
        }
        
        // Обновить мир
        if (this.worldGenerator) {
            this.worldGenerator.update(deltaTime);
        }
        
        // Обновить квесты
        if (this.questManager) {
            this.questManager.update(deltaTime);
        }
        
        // Рендер
        this.renderer.render(this.scene, this.camera);
        
        // Следующий кадр
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // Обновить UI
    updateUI() {
        const playerName = document.getElementById('playerName');
        const currentLocation = document.getElementById('currentLocation');
        const currentQuest = document.getElementById('currentQuest');
        
        if (this.gameState.currentCharacter === 'mark') {
            playerName.textContent = 'Марк (12 лет)';
        } else if (this.gameState.currentCharacter === 'lucia') {
            playerName.textContent = 'Луция (6 лет)';
        }
        
        currentLocation.textContent = this.getLocationName(this.gameState.currentLocation);
        currentQuest.textContent = this.gameState.currentQuest || 'Исследуйте мир';
    }
    
    // Получить название локации
    getLocationName(location) {
        const locations = {
            'rome': 'Древний Рим',
            'athens': 'Древние Афины',
            'crete': 'Древний Крит'
        };
        return locations[location] || 'Неизвестная локация';
    }
    
    // Переключить панель квестов
    toggleQuestPanel() {
        const questPanel = document.getElementById('questPanel');
        if (questPanel.style.display === 'none' || questPanel.style.display === '') {
            questPanel.style.display = 'block';
            if (this.questManager) {
                this.questManager.updateQuestDisplay();
            }
        } else {
            questPanel.style.display = 'none';
        }
    }
    
    // Остановить игру
    stop() {
        this.isRunning = false;
    }
}

// Глобальная переменная для движка
window.MindCraftEngine = MindCraftEngine;
