package com.mindeducation.repository;

import com.mindeducation.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    
    List<Location> findByIsActiveTrue();
    
    List<Location> findByHistoricalPeriodAndIsActiveTrue(String historicalPeriod);
    
    @Query("SELECT l FROM Location l WHERE l.name LIKE %:name% AND l.isActive = true")
    List<Location> findByNameContaining(String name);
    
    Optional<Location> findByName(String name);
}
