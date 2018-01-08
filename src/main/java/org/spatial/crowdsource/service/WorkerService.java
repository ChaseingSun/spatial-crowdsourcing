package org.spatial.crowdsource.service;

import org.spatial.crowdsource.domain.Worker;
import org.spatial.crowdsource.repository.WorkerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Worker.
 */
@Service
@Transactional
public class WorkerService {

    private final Logger log = LoggerFactory.getLogger(WorkerService.class);

    private final WorkerRepository workerRepository;

    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    /**
     * Save a worker.
     *
     * @param worker the entity to save
     * @return the persisted entity
     */
    public Worker save(Worker worker) {
        log.debug("Request to save Worker : {}", worker);
        return workerRepository.save(worker);
    }

    /**
     * Get all the workers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Worker> findAll() {
        log.debug("Request to get all Workers");
        return workerRepository.findAll();
    }

    /**
     * Get one worker by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Worker findOne(Long id) {
        log.debug("Request to get Worker : {}", id);
        return workerRepository.findOne(id);
    }

    /**
     * Delete the worker by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Worker : {}", id);
        workerRepository.delete(id);
    }
}
