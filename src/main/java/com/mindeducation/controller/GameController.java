package com.mindeducation.controller;

import com.mindeducation.model.Character;
import com.mindeducation.model.Location;
import com.mindeducation.model.LearningStage;
import com.mindeducation.repository.CharacterRepository;
import com.mindeducation.repository.LocationRepository;
import com.mindeducation.repository.LearningStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/game")
public class GameController {
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private LearningStageRepository learningStageRepository;
    
    @GetMapping
    public String gameHome(Model model) {
        List<Character> characters = characterRepository.findByIsActiveTrue();
        List<Location> locations = locationRepository.findByIsActiveTrue();
        
        model.addAttribute("characters", characters);
        model.addAttribute("locations", locations);
        
        return "game/home";
    }
    
    @GetMapping("/location/{id}")
    public String locationDetails(@PathVariable("id") Long id, Model model) {
        Location location = locationRepository.findById(id).orElse(null);
        if (location == null) {
            return "redirect:/game";
        }
        
        List<LearningStage> stages = learningStageRepository
            .findByLocationAndIsActiveTrueOrderByStageOrder(location);
        
        model.addAttribute("location", location);
        model.addAttribute("stages", stages);
        
        return "game/location";
    }
    
    @GetMapping("/stage/{id}")
    public String stageDetails(@PathVariable Long id, Model model) {
        LearningStage stage = learningStageRepository.findById(id).orElse(null);
        if (stage == null) {
            return "redirect:/game";
        }
        
        model.addAttribute("stage", stage);
        
        return "game/stage";
    }
    
    @GetMapping("/character/{id}")
    public String characterDetails(@PathVariable Long id, Model model) {
        Character character = characterRepository.findById(id).orElse(null);
        if (character == null) {
            return "redirect:/game";
        }
        
        model.addAttribute("character", character);
        
        return "game/character";
    }
}
