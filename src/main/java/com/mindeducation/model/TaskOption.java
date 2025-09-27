package com.mindeducation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "task_options")
public class TaskOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Текст опции обязателен")
    @Column(nullable = false)
    private String text;
    
    @Column(name = "is_correct")
    private Boolean isCorrect = false;
    
    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;
    
    @Column(name = "order_index")
    private Integer orderIndex = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_task_id", nullable = false)
    private GameTask gameTask;
    
    // Конструкторы
    public TaskOption() {}
    
    public TaskOption(String text, Boolean isCorrect, GameTask gameTask) {
        this.text = text;
        this.isCorrect = isCorrect;
        this.gameTask = gameTask;
    }
    
    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    public Boolean getIsCorrect() {
        return isCorrect;
    }
    
    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
    
    public String getExplanation() {
        return explanation;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public GameTask getGameTask() {
        return gameTask;
    }
    
    public void setGameTask(GameTask gameTask) {
        this.gameTask = gameTask;
    }
}
