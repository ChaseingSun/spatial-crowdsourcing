package org.spatial.crowdsource.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spatial.crowdsource.repository.TaskRepository;
import org.spatial.crowdsource.repository.WorkerRepository;
import org.springframework.stereotype.Service;

/**
 * Created by Monjur-E-Morshed on 16-Jan-18.
 */
@Service
public class CrowdSourceService {

    private final Logger log = LoggerFactory.getLogger(CrowdSourceService.class);

    private final TaskRepository taskRepository;

    private final WorkerRepository workerRepository;

    public CrowdSourceService(TaskRepository pTaskRepository, WorkerRepository pWorkerRepository) {
        taskRepository = pTaskRepository;
        workerRepository = pWorkerRepository;
    }


}
