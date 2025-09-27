package com.mindeducation.repository;

import com.mindeducation.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    
    List<Character> findByIsActiveTrue();
    
    @Query("SELECT c FROM Character c WHERE c.age BETWEEN :minAge AND :maxAge AND c.isActive = true")
    List<Character> findByAgeRange(Integer minAge, Integer maxAge);
    
    List<Character> findByGenderAndIsActiveTrue(String gender);
}
