package com.mindeducation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "game_tasks")
public class GameTask {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Название задачи обязательно")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Описание задачи обязательно")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Column(name = "task_type")
    private String taskType; // QUIZ, BUILD, EXPLORE, INTERACT
    
    @Column(name = "instructions", columnDefinition = "TEXT")
    private String instructions;
    
    @Column(name = "points")
    private Integer points = 10;
    
    @Column(name = "is_required")
    private Boolean isRequired = true;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_stage_id", nullable = false)
    private LearningStage learningStage;
    
    @OneToMany(mappedBy = "gameTask", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TaskOption> options;
    
    // Конструкторы
    public GameTask() {}
    
    public GameTask(String title, String description, String taskType, LearningStage learningStage) {
        this.title = title;
        this.description = description;
        this.taskType = taskType;
        this.learningStage = learningStage;
    }
    
    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getTaskType() {
        return taskType;
    }
    
    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }
    
    public String getInstructions() {
        return instructions;
    }
    
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    
    public Integer getPoints() {
        return points;
    }
    
    public void setPoints(Integer points) {
        this.points = points;
    }
    
    public Boolean getIsRequired() {
        return isRequired;
    }
    
    public void setIsRequired(Boolean isRequired) {
        this.isRequired = isRequired;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LearningStage getLearningStage() {
        return learningStage;
    }
    
    public void setLearningStage(LearningStage learningStage) {
        this.learningStage = learningStage;
    }
    
    public List<TaskOption> getOptions() {
        return options;
    }
    
    public void setOptions(List<TaskOption> options) {
        this.options = options;
    }
}

