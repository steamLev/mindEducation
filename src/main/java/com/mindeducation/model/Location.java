package com.mindeducation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "locations")
public class Location {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Название локации обязательно")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Описание локации обязательно")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @NotBlank(message = "Исторический период обязателен")
    @Column(name = "historical_period", nullable = false)
    private String historicalPeriod;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "background_music")
    private String backgroundMusic;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LearningStage> learningStages;
    
    // Конструкторы
    public Location() {}
    
    public Location(String name, String description, String historicalPeriod) {
        this.name = name;
        this.description = description;
        this.historicalPeriod = historicalPeriod;
    }
    
    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getHistoricalPeriod() {
        return historicalPeriod;
    }
    
    public void setHistoricalPeriod(String historicalPeriod) {
        this.historicalPeriod = historicalPeriod;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getBackgroundMusic() {
        return backgroundMusic;
    }
    
    public void setBackgroundMusic(String backgroundMusic) {
        this.backgroundMusic = backgroundMusic;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public List<LearningStage> getLearningStages() {
        return learningStages;
    }
    
    public void setLearningStages(List<LearningStage> learningStages) {
        this.learningStages = learningStages;
    }
}

