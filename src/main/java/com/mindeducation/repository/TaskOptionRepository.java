package com.mindeducation.repository;

import com.mindeducation.model.TaskOption;
import com.mindeducation.model.GameTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskOptionRepository extends JpaRepository<TaskOption, Long> {
    
    List<TaskOption> findByGameTaskAndIsCorrectTrue(GameTask gameTask);
    
    List<TaskOption> findByGameTaskOrderByOrderIndex(GameTask gameTask);
}
