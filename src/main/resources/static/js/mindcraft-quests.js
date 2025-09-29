// MindCraft - Система квестов и образовательных заданий
class MindCraftQuests {
    constructor(engine) {
        this.engine = engine;
        this.player = engine.player;
        this.world = engine.worldGenerator;
        this.quests = [];
        this.currentQuest = null;
        this.completedQuests = [];
        
        // Исторические факты
        this.historicalFacts = {
            rome: {
                colosseum: {
                    name: "Колизей",
                    facts: [
                        "Колизей был построен в 80 году нашей эры императором Титом",
                        "Вмещал до 80,000 зрителей для гладиаторских боев",
                        "Строительство заняло всего 8 лет - невероятно быстро для того времени",
                        "Использовался для проведения навмахий - морских сражений на суше"
                    ]
                },
                forum: {
                    name: "Римский форум",
                    facts: [
                        "Центр политической, религиозной и торговой жизни Древнего Рима",
                        "Здесь проходили выборы консулов и народных трибунов",
                        "Храм Сатурна хранил государственную казну",
                        "Ростра - трибуна для ораторов, украшенная носами вражеских кораблей"
                    ]
                },
                pantheon: {
                    name: "Пантеон",
                    facts: [
                        "Построен в 125 году нашей эры императором Адрианом",
                        "Купол диаметром 43 метра - крупнейший в мире до XIX века",
                        "Окулус (отверстие в куполе) - единственный источник света",
                        "Прекрасно сохранился благодаря превращению в христианскую церковь"
                    ]
                }
            },
            athens: {
                acropolis: {
                    name: "Акрополь",
                    facts: [
                        "Священная гора Афин высотой 156 метров",
                        "Парфенон построен в 447-438 годах до нашей эры",
                        "Посвящен богине Афине - покровительнице города",
                        "Считается вершиной древнегреческой архитектуры"
                    ]
                }
            },
            crete: {
                knossos: {
                    name: "Кносский дворец",
                    facts: [
                        "Построен около 2000 года до нашей эры",
                        "Центр минойской цивилизации - одной из древнейших в Европе",
                        "Связан с мифом о Минотавре и лабиринте",
                        "Имел сложную систему водопровода и канализации"
                    ]
                }
            }
        };
    }
    
    // Инициализация квестов
    async init() {
        this.createQuests();
        this.setupQuestUI();
        console.log('Система квестов инициализирована');
    }
    
    // Создать квесты
    createQuests() {
        // Квест 1: Знакомство с Римом
        this.quests.push({
            id: 'rome_intro',
            name: 'Знакомство с Древним Римом',
            description: 'Исследуйте величественные памятники Древнего Рима',
            location: 'rome',
            objectives: [
                {
                    id: 'visit_colosseum',
                    description: 'Подойдите к Колизею',
                    completed: false,
                    target: { x: 0, y: 0, z: 0, radius: 5 }
                },
                {
                    id: 'visit_forum',
                    description: 'Исследуйте Римский форум',
                    completed: false,
                    target: { x: 20, y: 0, z: 0, radius: 5 }
                },
                {
                    id: 'visit_pantheon',
                    description: 'Посетите Пантеон',
                    completed: false,
                    target: { x: -20, y: 0, z: 0, radius: 5 }
                }
            ],
            rewards: { experience: 100 },
            completed: false
        });
        
        // Квест 2: Тайны Колизея
        this.quests.push({
            id: 'colosseum_secrets',
            name: 'Тайны Колизея',
            description: 'Узнайте секреты великого амфитеатра',
            location: 'rome',
            objectives: [
                {
                    id: 'learn_colosseum_facts',
                    description: 'Изучите исторические факты о Колизее',
                    completed: false,
                    target: { x: 0, y: 0, z: 0, radius: 3 }
                }
            ],
            rewards: { experience: 150 },
            completed: false,
            requires: ['rome_intro']
        });
        
        // Квест 3: Путешествие в Афины
        this.quests.push({
            id: 'athens_journey',
            name: 'Путешествие в Афины',
            description: 'Отправьтесь в колыбель демократии',
            location: 'athens',
            objectives: [
                {
                    id: 'visit_acropolis',
                    description: 'Поднимитесь на Акрополь',
                    completed: false,
                    target: { x: 50, y: 0, z: 0, radius: 8 }
                },
                {
                    id: 'learn_greek_facts',
                    description: 'Изучите историю Древней Греции',
                    completed: false,
                    target: { x: 50, y: 0, z: 0, radius: 5 }
                }
            ],
            rewards: { experience: 200 },
            completed: false,
            requires: ['rome_intro']
        });
        
        // Квест 4: Мифы Крита
        this.quests.push({
            id: 'crete_myths',
            name: 'Мифы Древнего Крита',
            description: 'Исследуйте легендарный Кносский дворец',
            location: 'crete',
            objectives: [
                {
                    id: 'explore_knossos',
                    description: 'Исследуйте лабиринт Кносского дворца',
                    completed: false,
                    target: { x: -50, y: 0, z: 0, radius: 10 }
                },
                {
                    id: 'learn_minotaur_myth',
                    description: 'Узнайте миф о Минотавре',
                    completed: false,
                    target: { x: -50, y: 0, z: 0, radius: 5 }
                }
            ],
            rewards: { experience: 250 },
            completed: false,
            requires: ['athens_journey']
        });
        
        // Установить первый квест как активный
        this.currentQuest = this.quests[0];
        this.engine.gameState.currentQuest = this.currentQuest.name;
    }
    
    // Настроить UI квестов
    setupQuestUI() {
        const questContent = document.getElementById('questContent');
        const closeQuest = document.getElementById('closeQuest');
        
        closeQuest.addEventListener('click', () => {
            document.getElementById('questPanel').style.display = 'none';
        });
    }
    
    // Обновление квестов
    update(deltaTime) {
        if (!this.currentQuest || !this.player) return;
        
        // Проверить выполнение целей
        this.checkObjectives();
        
        // Проверить завершение квеста
        if (this.isQuestCompleted(this.currentQuest)) {
            this.completeQuest(this.currentQuest);
        }
    }
    
    // Проверить выполнение целей
    checkObjectives() {
        const playerPos = this.player.position;
        
        this.currentQuest.objectives.forEach(objective => {
            if (objective.completed) return;
            
            const distance = Math.sqrt(
                Math.pow(playerPos.x - objective.target.x, 2) +
                Math.pow(playerPos.z - objective.target.z, 2)
            );
            
            if (distance <= objective.target.radius) {
                this.completeObjective(objective);
            }
        });
    }
    
    // Завершить цель
    completeObjective(objective) {
        objective.completed = true;
        console.log(`Цель выполнена: ${objective.description}`);
        
        // Показать уведомление
        this.showNotification(`Цель выполнена: ${objective.description}`);
        
        // Если это цель изучения фактов, показать информацию
        if (objective.id.includes('learn') || objective.id.includes('facts')) {
            this.showHistoricalFacts(objective);
        }
    }
    
    // Показать исторические факты
    showHistoricalFacts(objective) {
        const questContent = document.getElementById('questContent');
        const location = this.currentQuest.location;
        
        let facts = [];
        if (objective.id.includes('colosseum')) {
            facts = this.historicalFacts.rome.colosseum.facts;
        } else if (objective.id.includes('forum')) {
            facts = this.historicalFacts.rome.forum.facts;
        } else if (objective.id.includes('pantheon')) {
            facts = this.historicalFacts.rome.pantheon.facts;
        } else if (objective.id.includes('acropolis')) {
            facts = this.historicalFacts.athens.acropolis.facts;
        } else if (objective.id.includes('knossos')) {
            facts = this.historicalFacts.crete.knossos.facts;
        }
        
        if (facts.length > 0) {
            let factsHTML = '<h4>Исторические факты:</h4><ul>';
            facts.forEach(fact => {
                factsHTML += `<li>${fact}</li>`;
            });
            factsHTML += '</ul>';
            
            questContent.innerHTML = factsHTML;
            document.getElementById('questPanel').style.display = 'block';
        }
    }
    
    // Проверить завершение квеста
    isQuestCompleted(quest) {
        return quest.objectives.every(objective => objective.completed);
    }
    
    // Завершить квест
    completeQuest(quest) {
        if (quest.completed) return;
        
        quest.completed = true;
        this.completedQuests.push(quest.id);
        
        // Выдать награды
        if (quest.rewards.experience) {
            this.player.addExperience(quest.rewards.experience);
        }
        
        console.log(`Квест завершен: ${quest.name}`);
        this.showNotification(`Квест завершен: ${quest.name}! Получено ${quest.rewards.experience} опыта.`);
        
        // Перейти к следующему квесту
        this.startNextQuest();
    }
    
    // Начать следующий квест
    startNextQuest() {
        const nextQuest = this.quests.find(quest => 
            !quest.completed && 
            (!quest.requires || quest.requires.every(req => this.completedQuests.includes(req)))
        );
        
        if (nextQuest) {
            this.currentQuest = nextQuest;
            this.engine.gameState.currentQuest = this.currentQuest.name;
            this.updateQuestDisplay();
            console.log(`Начат новый квест: ${nextQuest.name}`);
        } else {
            this.currentQuest = null;
            this.engine.gameState.currentQuest = 'Все квесты завершены!';
            console.log('Все квесты завершены!');
        }
    }
    
    // Обновить отображение квеста
    updateQuestDisplay() {
        if (!this.currentQuest) return;
        
        const questContent = document.getElementById('questContent');
        let html = `<h4>${this.currentQuest.name}</h4>`;
        html += `<p>${this.currentQuest.description}</p>`;
        html += '<h5>Цели:</h5><ul>';
        
        this.currentQuest.objectives.forEach(objective => {
            const status = objective.completed ? '✅' : '⭕';
            html += `<li>${status} ${objective.description}</li>`;
        });
        
        html += '</ul>';
        questContent.innerHTML = html;
    }
    
    // Показать уведомление
    showNotification(message) {
        // Создать временное уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
            max-width: 400px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Удалить через 3 секунды
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // Получить прогресс квестов
    getQuestProgress() {
        const totalQuests = this.quests.length;
        const completedQuests = this.completedQuests.length;
        const progress = (completedQuests / totalQuests) * 100;
        
        return {
            total: totalQuests,
            completed: completedQuests,
            progress: Math.round(progress)
        };
    }
}

// Глобальная переменная
window.MindCraftQuests = MindCraftQuests;
