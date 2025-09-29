// MindCraft - Система игрока
class MindCraftPlayer {
    constructor(engine, character) {
        this.engine = engine;
        this.character = character;
        this.scene = engine.scene;
        this.world = engine.world;
        this.camera = engine.camera;
        
        // Позиция и движение
        this.position = new THREE.Vector3(0, 10, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = { x: 0, y: 0 };
        
        // Физическое тело
        this.body = null;
        this.mesh = null;
        
        // Состояние игрока
        this.isGrounded = false;
        this.isJumping = false;
        this.health = 100;
        this.experience = 0;
        
        // Настройки персонажа
        this.characterSettings = this.getCharacterSettings(character);
    }
    
    // Получить настройки персонажа
    getCharacterSettings(character) {
        const settings = {
            mark: {
                name: 'Марк',
                age: 12,
                speed: 5,
                jumpForce: 8,
                size: { width: 0.6, height: 1.8, depth: 0.6 },
                color: 0x4CAF50,
                description: 'Любознательный мальчик-историк'
            },
            lucia: {
                name: 'Луция',
                age: 6,
                speed: 4,
                jumpForce: 6,
                size: { width: 0.5, height: 1.4, depth: 0.5 },
                color: 0xE91E63,
                description: 'Веселая и энергичная девочка'
            }
        };
        return settings[character] || settings.mark;
    }
    
    // Инициализация игрока
    async init() {
        this.createMesh();
        this.createPhysicsBody();
        this.setupCamera();
        
        console.log(`Игрок ${this.characterSettings.name} создан`);
    }
    
    // Создать 3D модель игрока
    createMesh() {
        const group = new THREE.Group();
        
        // Тело (пиксельный стиль)
        const bodyGeometry = new THREE.BoxGeometry(
            this.characterSettings.size.width,
            this.characterSettings.size.height * 0.6,
            this.characterSettings.size.depth
        );
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: this.characterSettings.color 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = this.characterSettings.size.height * 0.3;
        body.castShadow = true;
        group.add(body);
        
        // Голова
        const headGeometry = new THREE.BoxGeometry(
            this.characterSettings.size.width * 0.8,
            this.characterSettings.size.height * 0.3,
            this.characterSettings.size.depth * 0.8
        );
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFDBB5 // Цвет кожи
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = this.characterSettings.size.height * 0.75;
        head.castShadow = true;
        group.add(head);
        
        // Глаза
        const eyeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.1, this.characterSettings.size.height * 0.8, 0.35);
        group.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.1, this.characterSettings.size.height * 0.8, 0.35);
        group.add(rightEye);
        
        // Руки
        const armGeometry = new THREE.BoxGeometry(
            this.characterSettings.size.width * 0.3,
            this.characterSettings.size.height * 0.4,
            this.characterSettings.size.depth * 0.3
        );
        const armMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFDBB5 
        });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-this.characterSettings.size.width * 0.6, this.characterSettings.size.height * 0.2, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(this.characterSettings.size.width * 0.6, this.characterSettings.size.height * 0.2, 0);
        rightArm.castShadow = true;
        group.add(rightArm);
        
        // Ноги
        const legGeometry = new THREE.BoxGeometry(
            this.characterSettings.size.width * 0.4,
            this.characterSettings.size.height * 0.4,
            this.characterSettings.size.depth * 0.4
        );
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2196F3 // Синие штаны
        });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-this.characterSettings.size.width * 0.2, -this.characterSettings.size.height * 0.2, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(this.characterSettings.size.width * 0.2, -this.characterSettings.size.height * 0.2, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);
        
        this.mesh = group;
        this.scene.add(this.mesh);
    }
    
    // Создать физическое тело
    createPhysicsBody() {
        const shape = new CANNON.Box(new CANNON.Vec3(
            this.characterSettings.size.width / 2,
            this.characterSettings.size.height / 2,
            this.characterSettings.size.depth / 2
        ));
        
        this.body = new CANNON.Body({ mass: 1 });
        this.body.addShape(shape);
        this.body.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );
        
        // Настройки материала
        this.body.material = this.engine.materials.player;
        
        // Обработка столкновений
        this.body.addEventListener('collide', (event) => {
            const contact = event.contact;
            const otherBody = contact.bi === this.body ? contact.bj : contact.bi;
            
            // Проверка на землю
            if (otherBody.material === this.engine.materials.ground) {
                this.isGrounded = true;
                this.isJumping = false;
            }
        });
        
        this.world.add(this.body);
    }
    
    // Настроить камеру
    setupCamera() {
        this.camera.position.set(0, 5, 5);
        this.camera.lookAt(0, 0, 0);
    }
    
    // Обработка движения мыши
    handleMouseMove(event) {
        const sensitivity = 0.002;
        
        this.rotation.y -= event.movementX * sensitivity;
        this.rotation.x -= event.movementY * sensitivity;
        
        // Ограничить вертикальный поворот
        this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
        
        // Обновить камеру
        this.updateCamera();
    }
    
    // Обновить позицию камеры
    updateCamera() {
        const distance = 5;
        const cameraOffset = new THREE.Vector3(
            Math.sin(this.rotation.y) * Math.cos(this.rotation.x) * distance,
            Math.sin(this.rotation.x) * distance + 2,
            Math.cos(this.rotation.y) * Math.cos(this.rotation.x) * distance
        );
        
        this.camera.position.copy(this.position).add(cameraOffset);
        this.camera.lookAt(this.position);
    }
    
    // Обновление игрока
    update(deltaTime) {
        if (!this.body) return;
        
        // Обновить позицию из физики
        this.position.set(
            this.body.position.x,
            this.body.position.y,
            this.body.position.z
        );
        
        // Обновить позицию меша
        if (this.mesh) {
            this.mesh.position.copy(this.position);
        }
        
        // Обработка движения
        this.handleMovement(deltaTime);
        
        // Обновить камеру
        this.updateCamera();
        
        // Проверка на падение
        if (this.position.y < -50) {
            this.respawn();
        }
    }
    
    // Обработка движения
    handleMovement(deltaTime) {
        const keys = this.engine.keys;
        const speed = this.characterSettings.speed;
        
        // Направление движения
        const direction = new THREE.Vector3();
        
        if (keys.forward) direction.z -= 1;
        if (keys.backward) direction.z += 1;
        if (keys.left) direction.x -= 1;
        if (keys.right) direction.x += 1;
        
        // Нормализовать направление
        if (direction.length() > 0) {
            direction.normalize();
            
            // Повернуть направление относительно камеры
            const cameraDirection = new THREE.Vector3();
            this.camera.getWorldDirection(cameraDirection);
            cameraDirection.y = 0;
            cameraDirection.normalize();
            
            const right = new THREE.Vector3();
            right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
            
            const moveDirection = new THREE.Vector3();
            moveDirection.addScaledVector(cameraDirection, -direction.z);
            moveDirection.addScaledVector(right, direction.x);
            
            // Применить движение
            const velocity = this.body.velocity;
            velocity.x = moveDirection.x * speed;
            velocity.z = moveDirection.z * speed;
            
            // Прыжок
            if (keys.jump && this.isGrounded && !this.isJumping) {
                velocity.y = this.characterSettings.jumpForce;
                this.isJumping = true;
                this.isGrounded = false;
            }
        } else {
            // Торможение
            this.body.velocity.x *= 0.8;
            this.body.velocity.z *= 0.8;
        }
        
        // Ограничить максимальную скорость
        const maxSpeed = speed * 1.5;
        const horizontalVelocity = Math.sqrt(
            this.body.velocity.x ** 2 + this.body.velocity.z ** 2
        );
        
        if (horizontalVelocity > maxSpeed) {
            const factor = maxSpeed / horizontalVelocity;
            this.body.velocity.x *= factor;
            this.body.velocity.z *= factor;
        }
    }
    
    // Возрождение игрока
    respawn() {
        this.body.position.set(0, 10, 0);
        this.body.velocity.set(0, 0, 0);
        this.position.set(0, 10, 0);
        this.health = 100;
        console.log('Игрок возрожден');
    }
    
    // Получить информацию об игроке
    getInfo() {
        return {
            name: this.characterSettings.name,
            age: this.characterSettings.age,
            health: this.health,
            experience: this.experience,
            position: this.position.clone(),
            isGrounded: this.isGrounded
        };
    }
    
    // Добавить опыт
    addExperience(amount) {
        this.experience += amount;
        console.log(`Получено ${amount} опыта. Всего: ${this.experience}`);
    }
    
    // Получить урон
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.respawn();
        }
        console.log(`Получен урон: ${amount}. Здоровье: ${this.health}`);
    }
}

// Глобальная переменная
window.MindCraftPlayer = MindCraftPlayer;
