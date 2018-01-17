package org.spatial.crowdsource.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.spatial.crowdsource.domain.WorkerTaskAssignment;
import org.spatial.crowdsource.service.WorkerTaskAssignmentService;
import org.spatial.crowdsource.web.rest.errors.BadRequestAlertException;
import org.spatial.crowdsource.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing WorkerTaskAssignment.
 */
@RestController
@RequestMapping("/api")
public class WorkerTaskAssignmentResource {

    private final Logger log = LoggerFactory.getLogger(WorkerTaskAssignmentResource.class);

    private static final String ENTITY_NAME = "workerTaskAssignment";

    private final WorkerTaskAssignmentService workerTaskAssignmentService;

    public WorkerTaskAssignmentResource(WorkerTaskAssignmentService workerTaskAssignmentService) {
        this.workerTaskAssignmentService = workerTaskAssignmentService;
    }

    /**
     * POST  /worker-task-assignments : Create a new workerTaskAssignment.
     *
     * @param workerTaskAssignment the workerTaskAssignment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workerTaskAssignment, or with status 400 (Bad Request) if the workerTaskAssignment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/worker-task-assignments")
    @Timed
    public ResponseEntity<WorkerTaskAssignment> createWorkerTaskAssignment(@RequestBody WorkerTaskAssignment workerTaskAssignment) throws URISyntaxException {
        log.debug("REST request to save WorkerTaskAssignment : {}", workerTaskAssignment);
        if (workerTaskAssignment.getId() != null) {
            throw new BadRequestAlertException("A new workerTaskAssignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkerTaskAssignment result = workerTaskAssignmentService.save(workerTaskAssignment);
        return ResponseEntity.created(new URI("/api/worker-task-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /worker-task-assignments : Updates an existing workerTaskAssignment.
     *
     * @param workerTaskAssignment the workerTaskAssignment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workerTaskAssignment,
     * or with status 400 (Bad Request) if the workerTaskAssignment is not valid,
     * or with status 500 (Internal Server Error) if the workerTaskAssignment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/worker-task-assignments")
    @Timed
    public ResponseEntity<WorkerTaskAssignment> updateWorkerTaskAssignment(@RequestBody WorkerTaskAssignment workerTaskAssignment) throws URISyntaxException {
        log.debug("REST request to update WorkerTaskAssignment : {}", workerTaskAssignment);
        if (workerTaskAssignment.getId() == null) {
            return createWorkerTaskAssignment(workerTaskAssignment);
        }
        WorkerTaskAssignment result = workerTaskAssignmentService.save(workerTaskAssignment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workerTaskAssignment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /worker-task-assignments : get all the workerTaskAssignments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workerTaskAssignments in body
     */
    @GetMapping("/worker-task-assignments")
    @Timed
    public List<WorkerTaskAssignment> getAllWorkerTaskAssignments() {
        log.debug("REST request to get all WorkerTaskAssignments");
        return workerTaskAssignmentService.findAll();
        }

    /**
     * GET  /worker-task-assignments/:id : get the "id" workerTaskAssignment.
     *
     * @param id the id of the workerTaskAssignment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workerTaskAssignment, or with status 404 (Not Found)
     */
    @GetMapping("/worker-task-assignments/{id}")
    @Timed
    public ResponseEntity<WorkerTaskAssignment> getWorkerTaskAssignment(@PathVariable Long id) {
        log.debug("REST request to get WorkerTaskAssignment : {}", id);
        WorkerTaskAssignment workerTaskAssignment = workerTaskAssignmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workerTaskAssignment));
    }

    /**
     * DELETE  /worker-task-assignments/:id : delete the "id" workerTaskAssignment.
     *
     * @param id the id of the workerTaskAssignment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/worker-task-assignments/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkerTaskAssignment(@PathVariable Long id) {
        log.debug("REST request to delete WorkerTaskAssignment : {}", id);
        workerTaskAssignmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
