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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private LearningStageRepository learningStageRepository;
    
    @GetMapping
    public String adminHome(Model model) {
        List<Character> characters = characterRepository.findAll();
        List<Location> locations = locationRepository.findAll();
        List<LearningStage> stages = learningStageRepository.findAll();
        
        model.addAttribute("characters", characters);
        model.addAttribute("locations", locations);
        model.addAttribute("stages", stages);
        
        return "admin/home";
    }
    
    // Управление персонажами
    @GetMapping("/characters")
    public String charactersList(Model model) {
        List<Character> characters = characterRepository.findAll();
        model.addAttribute("characters", characters);
        return "admin/characters";
    }
    
    @GetMapping("/characters/new")
    public String newCharacter(Model model) {
        model.addAttribute("character", new Character());
        return "admin/character-form";
    }
    
    @PostMapping("/characters")
    public String saveCharacter(@ModelAttribute Character character) {
        characterRepository.save(character);
        return "redirect:/admin/characters";
    }
    
    @GetMapping("/characters/edit/{id}")
    public String editCharacter(@PathVariable Long id, Model model) {
        Character character = characterRepository.findById(id).orElse(null);
        model.addAttribute("character", character);
        return "admin/character-form";
    }
    
    // Управление локациями
    @GetMapping("/locations")
    public String locationsList(Model model) {
        List<Location> locations = locationRepository.findAll();
        model.addAttribute("locations", locations);
        return "admin/locations";
    }
    
    @GetMapping("/locations/new")
    public String newLocation(Model model) {
        model.addAttribute("location", new Location());
        return "admin/location-form";
    }
    
    @PostMapping("/locations")
    public String saveLocation(@ModelAttribute Location location) {
        locationRepository.save(location);
        return "redirect:/admin/locations";
    }
    
    @GetMapping("/locations/edit/{id}")
    public String editLocation(@PathVariable Long id, Model model) {
        Location location = locationRepository.findById(id).orElse(null);
        model.addAttribute("location", location);
        return "admin/location-form";
    }
    
    // Управление этапами обучения
    @GetMapping("/stages")
    public String stagesList(Model model) {
        List<LearningStage> stages = learningStageRepository.findAll();
        List<Location> locations = locationRepository.findByIsActiveTrue();
        
        model.addAttribute("stages", stages);
        model.addAttribute("locations", locations);
        
        return "admin/stages";
    }
    
    @GetMapping("/stages/new")
    public String newStage(Model model) {
        List<Location> locations = locationRepository.findByIsActiveTrue();
        model.addAttribute("stage", new LearningStage());
        model.addAttribute("locations", locations);
        return "admin/stage-form";
    }
    
    @PostMapping("/stages")
    public String saveStage(@ModelAttribute LearningStage stage) {
        learningStageRepository.save(stage);
        return "redirect:/admin/stages";
    }
    
    @GetMapping("/stages/edit/{id}")
    public String editStage(@PathVariable Long id, Model model) {
        LearningStage stage = learningStageRepository.findById(id).orElse(null);
        List<Location> locations = locationRepository.findByIsActiveTrue();
        
        model.addAttribute("stage", stage);
        model.addAttribute("locations", locations);
        
        return "admin/stage-form";
    }
}
