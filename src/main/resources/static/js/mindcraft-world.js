// MindCraft - Генератор мира и исторических локаций
class MindCraftWorld {
    constructor(engine) {
        this.engine = engine;
        this.scene = engine.scene;
        this.world = engine.world;
        this.blocks = new Map();
        this.historicalLocations = [];
        this.currentLocation = 'rome';
        
        // Текстуры блоков (пиксельный стиль)
        this.textures = {
            grass: this.createPixelTexture(0x4CAF50),
            stone: this.createPixelTexture(0x757575),
            marble: this.createPixelTexture(0xF5F5F5),
            brick: this.createPixelTexture(0xD32F2F),
            sand: this.createPixelTexture(0xFFC107),
            water: this.createPixelTexture(0x2196F3),
            wood: this.createPixelTexture(0x8D6E63),
            gold: this.createPixelTexture(0xFFD700)
        };
        
        // Материалы блоков
        this.materials = {};
        Object.keys(this.textures).forEach(key => {
            this.materials[key] = new THREE.MeshLambertMaterial({ 
                map: this.textures[key],
                transparent: false
            });
        });
    }
    
    // Создать пиксельную текстуру
    createPixelTexture(color) {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        
        // Создать пиксельный паттерн
        ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        ctx.fillRect(0, 0, 16, 16);
        
        // Добавить пиксельные детали
        ctx.fillStyle = '#000000';
        for (let i = 0; i < 16; i += 2) {
            for (let j = 0; j < 16; j += 2) {
                if (Math.random() > 0.7) {
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }
    
    // Генерировать мир
    async generateWorld() {
        console.log('Генерация мира...');
        
        // Создать базовый ландшафт
        this.generateTerrain();
        
        // Создать исторические локации
        await this.generateHistoricalLocations();
        
        console.log('Мир сгенерирован!');
    }
    
    // Генерировать ландшафт
    generateTerrain() {
        const size = 100;
        const blockSize = this.engine.settings.blockSize;
        
        for (let x = -size; x < size; x++) {
            for (let z = -size; z < size; z++) {
                // Простая генерация высоты
                const height = Math.floor(Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3) + 5;
                
                for (let y = 0; y < height; y++) {
                    let blockType = 'stone';
                    if (y === height - 1) {
                        blockType = 'grass';
                    } else if (y > height - 3) {
                        blockType = 'stone';
                    }
                    
                    this.placeBlock(x, y, z, blockType);
                }
            }
        }
    }
    
    // Разместить блок
    placeBlock(x, y, z, type) {
        const key = `${x},${y},${z}`;
        if (this.blocks.has(key)) return;
        
        const geometry = new THREE.BoxGeometry(
            this.engine.settings.blockSize,
            this.engine.settings.blockSize,
            this.engine.settings.blockSize
        );
        
        const mesh = new THREE.Mesh(geometry, this.materials[type]);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { type, x, y, z };
        
        this.scene.add(mesh);
        this.blocks.set(key, mesh);
        
        // Добавить физическое тело
        const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
        const body = new CANNON.Body({ mass: 0 });
        body.addShape(shape);
        body.position.set(x, y, z);
        this.world.add(body);
    }
    
    // Генерировать исторические локации
    async generateHistoricalLocations() {
        // Древний Рим
        await this.generateRome();
        
        // Древние Афины
        await this.generateAthens();
        
        // Древний Крит
        await this.generateCrete();
    }
    
    // Генерировать Древний Рим
    async generateRome() {
        const rome = {
            name: 'Древний Рим',
            position: { x: 0, y: 0, z: 0 },
            buildings: []
        };
        
        // Колизей
        const colosseum = this.createColosseum(0, 0, 0);
        rome.buildings.push(colosseum);
        
        // Римский форум
        const forum = this.createForum(20, 0, 0);
        rome.buildings.push(forum);
        
        // Пантеон
        const pantheon = this.createPantheon(-20, 0, 0);
        rome.buildings.push(pantheon);
        
        this.historicalLocations.push(rome);
    }
    
    // Создать Колизей
    createColosseum(x, y, z) {
        const colosseum = {
            name: 'Колизей',
            position: { x, y, z },
            description: 'Величайший амфитеатр Древнего Рима',
            blocks: []
        };
        
        // Основание Колизея (овальная форма)
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 15; j++) {
                const angle = (i / 20) * Math.PI * 2;
                const radiusX = 8;
                const radiusZ = 6;
                const px = x + Math.cos(angle) * radiusX;
                const pz = z + Math.sin(angle) * radiusZ;
                
                // Стены
                for (let h = 0; h < 8; h++) {
                    this.placeBlock(Math.floor(px), y + h, Math.floor(pz), 'marble');
                    colosseum.blocks.push({ x: Math.floor(px), y: y + h, z: Math.floor(pz) });
                }
            }
        }
        
        // Арена (пустое пространство внутри)
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 8; j++) {
                const angle = (i / 10) * Math.PI * 2;
                const radiusX = 4;
                const radiusZ = 3;
                const px = x + Math.cos(angle) * radiusX;
                const pz = z + Math.sin(angle) * radiusZ;
                
                // Удалить блоки внутри арены
                const key = `${Math.floor(px)},${y + 1},${Math.floor(pz)}`;
                if (this.blocks.has(key)) {
                    this.scene.remove(this.blocks.get(key));
                    this.blocks.delete(key);
                }
            }
        }
        
        return colosseum;
    }
    
    // Создать Римский форум
    createForum(x, y, z) {
        const forum = {
            name: 'Римский форум',
            position: { x, y, z },
            description: 'Центр политической жизни Древнего Рима',
            blocks: []
        };
        
        // Храм Сатурна
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 6; j++) {
                for (let h = 0; h < 6; h++) {
                    this.placeBlock(x + i, y + h, z + j, 'marble');
                    forum.blocks.push({ x: x + i, y: y + h, z: z + j });
                }
            }
        }
        
        // Колонны
        for (let i = 0; i < 8; i += 2) {
            for (let j = 0; j < 6; j += 2) {
                for (let h = 6; h < 10; h++) {
                    this.placeBlock(x + i, y + h, z + j, 'marble');
                    forum.blocks.push({ x: x + i, y: y + h, z: z + j });
                }
            }
        }
        
        return forum;
    }
    
    // Создать Пантеон
    createPantheon(x, y, z) {
        const pantheon = {
            name: 'Пантеон',
            position: { x, y, z },
            description: 'Храм всех богов',
            blocks: []
        };
        
        // Круглое основание
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                const distance = Math.sqrt((i - 8) ** 2 + (j - 8) ** 2);
                if (distance <= 7) {
                    for (let h = 0; h < 8; h++) {
                        this.placeBlock(x + i - 8, y + h, z + j - 8, 'marble');
                        pantheon.blocks.push({ x: x + i - 8, y: y + h, z: z + j - 8 });
                    }
                }
            }
        }
        
        return pantheon;
    }
    
    // Генерировать Древние Афины
    async generateAthens() {
        const athens = {
            name: 'Древние Афины',
            position: { x: 50, y: 0, z: 0 },
            buildings: []
        };
        
        // Акрополь
        const acropolis = this.createAcropolis(50, 0, 0);
        athens.buildings.push(acropolis);
        
        this.historicalLocations.push(athens);
    }
    
    // Создать Акрополь
    createAcropolis(x, y, z) {
        const acropolis = {
            name: 'Акрополь',
            position: { x, y, z },
            description: 'Священная гора Афин с Парфеноном',
            blocks: []
        };
        
        // Основание холма
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const distance = Math.sqrt((i - 10) ** 2 + (j - 10) ** 2);
                if (distance <= 10) {
                    const height = Math.floor(10 - distance);
                    for (let h = 0; h < height; h++) {
                        this.placeBlock(x + i - 10, y + h, z + j - 10, 'stone');
                        acropolis.blocks.push({ x: x + i - 10, y: y + h, z: z + j - 10 });
                    }
                }
            }
        }
        
        // Парфенон на вершине
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 8; j++) {
                for (let h = 0; h < 6; h++) {
                    this.placeBlock(x + i - 6, y + 10 + h, z + j - 4, 'marble');
                    acropolis.blocks.push({ x: x + i - 6, y: y + 10 + h, z: z + j - 4 });
                }
            }
        }
        
        return acropolis;
    }
    
    // Генерировать Древний Крит
    async generateCrete() {
        const crete = {
            name: 'Древний Крит',
            position: { x: -50, y: 0, z: 0 },
            buildings: []
        };
        
        // Кносский дворец
        const knossos = this.createKnossos(-50, 0, 0);
        crete.buildings.push(knossos);
        
        this.historicalLocations.push(crete);
    }
    
    // Создать Кносский дворец
    createKnossos(x, y, z) {
        const knossos = {
            name: 'Кносский дворец',
            position: { x, y, z },
            description: 'Легендарный дворец царя Миноса',
            blocks: []
        };
        
        // Лабиринт дворца
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                // Создать лабиринтоподобную структуру
                if ((i + j) % 3 !== 0) {
                    for (let h = 0; h < 4; h++) {
                        this.placeBlock(x + i - 8, y + h, z + j - 8, 'brick');
                        knossos.blocks.push({ x: x + i - 8, y: y + h, z: z + j - 8 });
                    }
                }
            }
        }
        
        return knossos;
    }
    
    // Обновление мира
    update(deltaTime) {
        // Здесь можно добавить анимации, частицы и т.д.
    }
    
    // Получить блок по координатам
    getBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        return this.blocks.get(key);
    }
    
    // Удалить блок
    removeBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        const block = this.blocks.get(key);
        if (block) {
            this.scene.remove(block);
            this.blocks.delete(key);
            return true;
        }
        return false;
    }
}

// Глобальная переменная
window.MindCraftWorld = MindCraftWorld;
