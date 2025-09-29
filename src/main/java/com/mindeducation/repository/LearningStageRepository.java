package com.mindeducation.repository;

import com.mindeducation.model.LearningStage;
import com.mindeducation.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningStageRepository extends JpaRepository<LearningStage, Long> {
    
    List<LearningStage> findByIsActiveTrue();
    
    List<LearningStage> findByLocationAndIsActiveTrueOrderByStageOrder(Location location);
    
    @Query("SELECT ls FROM LearningStage ls WHERE ls.location = :location AND ls.isActive = true ORDER BY ls.stageOrder")
    List<LearningStage> findActiveStagesByLocationOrdered(Location location);
    
    @Query("SELECT ls FROM LearningStage ls WHERE ls.difficultyLevel = :difficulty AND ls.isActive = true")
    List<LearningStage> findByDifficultyLevel(String difficulty);
}

