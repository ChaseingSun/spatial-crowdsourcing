package org.spatial.crowdsource.repository;

import org.spatial.crowdsource.domain.Worker;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Worker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {

}
