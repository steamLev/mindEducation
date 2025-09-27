package com.mindeducation.repository;

import com.mindeducation.model.GameTask;
import com.mindeducation.model.LearningStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameTaskRepository extends JpaRepository<GameTask, Long> {
    
    List<GameTask> findByIsActiveTrue();
    
    List<GameTask> findByLearningStageAndIsActiveTrue(LearningStage learningStage);
    
    @Query("SELECT gt FROM GameTask gt WHERE gt.taskType = :taskType AND gt.isActive = true")
    List<GameTask> findByTaskType(String taskType);
    
    @Query("SELECT gt FROM GameTask gt WHERE gt.isRequired = true AND gt.isActive = true")
    List<GameTask> findRequiredTasks();
}
