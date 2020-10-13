package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Matches;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Matches entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchesRepository extends JpaRepository<Matches, Long> {
}
