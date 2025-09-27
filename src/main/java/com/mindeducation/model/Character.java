package com.mindeducation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@Entity
@Table(name = "characters")
public class Character {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Имя персонажа обязательно")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Возраст обязателен")
    @Min(value = 1, message = "Возраст должен быть больше 0")
    @Max(value = 18, message = "Возраст должен быть меньше 18")
    @Column(nullable = false)
    private Integer age;
    
    @NotBlank(message = "Пол персонажа обязателен")
    @Column(nullable = false)
    private String gender;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "avatar_url")
    private String avatarUrl;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Конструкторы
    public Character() {}
    
    public Character(String name, Integer age, String gender, String description) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.description = description;
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
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getAvatarUrl() {
        return avatarUrl;
    }
    
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
