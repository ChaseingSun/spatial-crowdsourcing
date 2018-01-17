package org.spatial.crowdsource.repository;

import org.spatial.crowdsource.domain.WorkerTaskAssignment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WorkerTaskAssignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkerTaskAssignmentRepository extends JpaRepository<WorkerTaskAssignment, Long> {

}
