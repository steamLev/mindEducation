package com.mindeducation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "learning_stages")
public class LearningStage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Название этапа обязательно")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Описание этапа обязательно")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @NotNull(message = "Порядковый номер обязателен")
    @Min(value = 1, message = "Порядковый номер должен быть больше 0")
    @Column(name = "stage_order", nullable = false)
    private Integer stageOrder;
    
    @Column(name = "learning_objectives", columnDefinition = "TEXT")
    private String learningObjectives;
    
    @Column(name = "estimated_duration")
    private Integer estimatedDuration; // в минутах
    
    @Column(name = "difficulty_level")
    private String difficultyLevel; // EASY, MEDIUM, HARD
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;
    
    @OneToMany(mappedBy = "learningStage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GameTask> tasks;
    
    // Конструкторы
    public LearningStage() {}
    
    public LearningStage(String title, String description, Integer stageOrder, Location location) {
        this.title = title;
        this.description = description;
        this.stageOrder = stageOrder;
        this.location = location;
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
    
    public Integer getStageOrder() {
        return stageOrder;
    }
    
    public void setStageOrder(Integer stageOrder) {
        this.stageOrder = stageOrder;
    }
    
    public String getLearningObjectives() {
        return learningObjectives;
    }
    
    public void setLearningObjectives(String learningObjectives) {
        this.learningObjectives = learningObjectives;
    }
    
    public Integer getEstimatedDuration() {
        return estimatedDuration;
    }
    
    public void setEstimatedDuration(Integer estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }
    
    public String getDifficultyLevel() {
        return difficultyLevel;
    }
    
    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public Location getLocation() {
        return location;
    }
    
    public void setLocation(Location location) {
        this.location = location;
    }
    
    public List<GameTask> getTasks() {
        return tasks;
    }
    
    public void setTasks(List<GameTask> tasks) {
        this.tasks = tasks;
    }
}

