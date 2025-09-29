package com.mindeducation.service;

import com.mindeducation.model.Character;
import com.mindeducation.model.Location;
import com.mindeducation.model.LearningStage;
import com.mindeducation.model.GameTask;
import com.mindeducation.model.TaskOption;
import com.mindeducation.repository.CharacterRepository;
import com.mindeducation.repository.LocationRepository;
import com.mindeducation.repository.LearningStageRepository;
import com.mindeducation.repository.GameTaskRepository;
import com.mindeducation.repository.TaskOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private LearningStageRepository learningStageRepository;
    
    @Autowired
    private GameTaskRepository gameTaskRepository;
    
    @Autowired
    private TaskOptionRepository taskOptionRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeCharacters();
        initializeLocations();
        initializeLearningStages();
        initializeGameTasks();
    }
    
    private void initializeCharacters() {
        if (characterRepository.count() == 0) {
            // Мальчик 12 лет
            Character boy = new Character();
            boy.setName("Марк");
            boy.setAge(12);
            boy.setGender("Мальчик");
            boy.setDescription("Любознательный мальчик, который мечтает стать историком. " +
                             "Он очень интересуется древними цивилизациями и всегда готов к новым приключениям.");
            boy.setAvatarUrl("/images/characters/mark.png");
            boy.setIsActive(true);
            characterRepository.save(boy);
            
            // Девочка 6 лет
            Character girl = new Character();
            girl.setName("Луция");
            girl.setAge(6);
            girl.setGender("Девочка");
            girl.setDescription("Веселая и энергичная девочка, которая любит играть и узнавать новое. " +
                              "Она очень любопытная и всегда задает много вопросов о том, что видит.");
            girl.setAvatarUrl("/images/characters/lucia.png");
            girl.setIsActive(true);
            characterRepository.save(girl);
        }
    }
    
    private void initializeLocations() {
        if (locationRepository.count() == 0) {
            // Рим
            Location rome = new Location();
            rome.setName("Древний Рим");
            rome.setDescription("Величественная столица Римской империи с Колизеем, " +
                              "Римским форумом и Пантеоном. Здесь зародилась одна из величайших цивилизаций мира.");
            rome.setHistoricalPeriod("753 г. до н.э. - 476 г. н.э.");
            rome.setImageUrl("/images/locations/rome.jpg");
            rome.setBackgroundMusic("/music/rome.mp3");
            rome.setIsActive(true);
            locationRepository.save(rome);
            
            // Афины
            Location athens = new Location();
            athens.setName("Древние Афины");
            athens.setDescription("Колыбель демократии и философии. Здесь находится знаменитый Акрополь " +
                                "с Парфеноном, где зародились основы западной цивилизации.");
            athens.setHistoricalPeriod("508 г. до н.э. - 322 г. до н.э.");
            athens.setImageUrl("/images/locations/athens.jpg");
            athens.setBackgroundMusic("/music/athens.mp3");
            athens.setIsActive(true);
            locationRepository.save(athens);
            
            // Крит
            Location crete = new Location();
            crete.setName("Древний Крит");
            crete.setDescription("Остров минойской цивилизации с легендарным Кносским дворцом. " +
                               "Здесь родились мифы о Минотавре и лабиринте.");
            crete.setHistoricalPeriod("2700 г. до н.э. - 1450 г. до н.э.");
            crete.setImageUrl("/images/locations/crete.jpg");
            crete.setBackgroundMusic("/music/crete.mp3");
            crete.setIsActive(true);
            locationRepository.save(crete);
        }
    }
    
    private void initializeLearningStages() {
        if (learningStageRepository.count() == 0) {
            Location rome = locationRepository.findByName("Древний Рим").orElse(null);
            Location athens = locationRepository.findByName("Древние Афины").orElse(null);
            Location crete = locationRepository.findByName("Древний Крит").orElse(null);
            
            if (rome != null) {
                // Этапы для Рима
                LearningStage stage1 = new LearningStage();
                stage1.setTitle("Знакомство с Римом");
                stage1.setDescription("Изучите основные достопримечательности Древнего Рима и узнайте о его истории.");
                stage1.setStageOrder(1);
                stage1.setLearningObjectives("Понять значение Рима в мировой истории, изучить основные архитектурные памятники");
                stage1.setEstimatedDuration(15);
                stage1.setDifficultyLevel("EASY");
                stage1.setLocation(rome);
                stage1.setIsActive(true);
                learningStageRepository.save(stage1);
                
                LearningStage stage2 = new LearningStage();
                stage2.setTitle("Колизей - арена гладиаторов");
                stage2.setDescription("Погрузитесь в мир гладиаторских боев и узнайте о жизни в Колизее.");
                stage2.setStageOrder(2);
                stage2.setLearningObjectives("Изучить архитектуру Колизея, понять роль гладиаторских боев в римском обществе");
                stage2.setEstimatedDuration(20);
                stage2.setDifficultyLevel("MEDIUM");
                stage2.setLocation(rome);
                stage2.setIsActive(true);
                learningStageRepository.save(stage2);
            }
            
            if (athens != null) {
                // Этапы для Афин
                LearningStage stage3 = new LearningStage();
                stage3.setTitle("Акрополь и Парфенон");
                stage3.setDescription("Исследуйте священную гору Афин и узнайте о греческой архитектуре.");
                stage3.setStageOrder(1);
                stage3.setLearningObjectives("Изучить архитектуру Парфенона, понять значение Акрополя для греков");
                stage3.setEstimatedDuration(18);
                stage3.setDifficultyLevel("MEDIUM");
                stage3.setLocation(athens);
                stage3.setIsActive(true);
                learningStageRepository.save(stage3);
            }
            
            if (crete != null) {
                // Этапы для Крита
                LearningStage stage4 = new LearningStage();
                stage4.setTitle("Кносский дворец и миф о Минотавре");
                stage4.setDescription("Отправьтесь в лабиринт Кносского дворца и узнайте о минойской цивилизации.");
                stage4.setStageOrder(1);
                stage4.setLearningObjectives("Изучить минойскую цивилизацию, понять миф о Минотавре и лабиринте");
                stage4.setEstimatedDuration(25);
                stage4.setDifficultyLevel("HARD");
                stage4.setLocation(crete);
                stage4.setIsActive(true);
                learningStageRepository.save(stage4);
            }
        }
    }
    
    private void initializeGameTasks() {
        if (gameTaskRepository.count() == 0) {
            // Найдем первый этап для создания задач
            List<LearningStage> stages = learningStageRepository.findAll();
            if (!stages.isEmpty()) {
                LearningStage firstStage = stages.get(0);
                
                // Создаем викторину
                GameTask quiz = new GameTask();
                quiz.setTitle("Викторина о Древнем Риме");
                quiz.setDescription("Ответьте на вопросы о истории и культуре Древнего Рима");
                quiz.setTaskType("QUIZ");
                quiz.setInstructions("Выберите правильный ответ из предложенных вариантов");
                quiz.setPoints(20);
                quiz.setIsRequired(true);
                quiz.setLearningStage(firstStage);
                quiz.setIsActive(true);
                gameTaskRepository.save(quiz);
                
                // Создаем варианты ответов для викторины
                TaskOption option1 = new TaskOption();
                option1.setText("753 год до нашей эры");
                option1.setIsCorrect(true);
                option1.setExplanation("Согласно римской традиции, Рим был основан в 753 году до нашей эры");
                option1.setOrderIndex(1);
                option1.setGameTask(quiz);
                taskOptionRepository.save(option1);
                
                TaskOption option2 = new TaskOption();
                option2.setText("509 год до нашей эры");
                option2.setIsCorrect(false);
                option2.setExplanation("509 год - это год установления Римской республики");
                option2.setOrderIndex(2);
                option2.setGameTask(quiz);
                taskOptionRepository.save(option2);
                
                TaskOption option3 = new TaskOption();
                option3.setText("27 год до нашей эры");
                option3.setIsCorrect(false);
                option3.setExplanation("27 год до нашей эры - это начало Римской империи");
                option3.setOrderIndex(3);
                option3.setGameTask(quiz);
                taskOptionRepository.save(option3);
            }
        }
    }
}

