package org.spatial.crowdsource.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElement;
import com.google.maps.model.DistanceMatrixRow;
import com.google.maps.model.LatLng;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spatial.crowdsource.domain.Task;
import org.spatial.crowdsource.domain.Worker;
import org.spatial.crowdsource.domain.WorkerTaskAssignment;
import org.spatial.crowdsource.repository.TaskRepository;
import org.spatial.crowdsource.repository.WorkerRepository;
import org.spatial.crowdsource.repository.WorkerTaskAssignmentRepository;
import org.spatial.crowdsource.service.helper.worker.task.assignment.TaskToTaskDistance;
import org.spatial.crowdsource.service.helper.worker.task.assignment.WorkerTaskDistance;
import org.spatial.crowdsource.service.util.RandomUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service Implementation for managing WorkerTaskAssignment.
 */
@Service
@Transactional
public class WorkerTaskAssignmentService {

    private final Logger log = LoggerFactory.getLogger(WorkerTaskAssignmentService.class);

    private final WorkerTaskAssignmentRepository workerTaskAssignmentRepository;

    private final TaskRepository taskRepository;
    private final WorkerRepository workerRepository;

    private final GeoApiContext context;


    public WorkerTaskAssignmentService(WorkerTaskAssignmentRepository pWorkerTaskAssignmentRepository, TaskRepository pTaskRepository, WorkerRepository pWorkerRepository) {
        workerTaskAssignmentRepository = pWorkerTaskAssignmentRepository;
        taskRepository = pTaskRepository;
        workerRepository = pWorkerRepository;
        this.context = new GeoApiContext.Builder()
            .apiKey(RandomUtil.getGoogleApiKey())
            .build();
    }

    /**
     * Save a workerTaskAssignment.
     *
     * @param workerTaskAssignment the entity to save
     * @return the persisted entity
     */
    public WorkerTaskAssignment save(WorkerTaskAssignment workerTaskAssignment) {
        log.debug("Request to save WorkerTaskAssignment : {}", workerTaskAssignment);
        return workerTaskAssignmentRepository.save(workerTaskAssignment);
    }

    /**
     * Get all the workerTaskAssignments.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<WorkerTaskAssignment> findAll() {


        List<Worker> workers = workerRepository.findAll();
        workers.sort((w1, w2) -> w2.getCapacity().compareTo(w1.getCapacity()));

        List<Task> tasks = taskRepository.findAll();

        List<WorkerTaskAssignment> workerTaskAssignments = new ArrayList<>();

        createCrowdSource(workers, tasks, workerTaskAssignments);
        workerTaskAssignmentRepository.deleteAll();
        workerTaskAssignmentRepository.save(workerTaskAssignments);

        log.debug("Request to get all WorkerTaskAssignments");
        return workerTaskAssignments;
    }

    private void createCrowdSource(List<Worker> pWorkers, List<Task> pTasks, List<WorkerTaskAssignment> pWorkerTaskAssignments) {
        for (Worker worker : pWorkers) {
            if (pTasks.size() <= 0)
                break;
            List<WorkerTaskDistance> workerTaskDistances = new ArrayList<>();
            if (assignWorkerToTask(pTasks, worker, workerTaskDistances)) break;
            Task assignedTask = new Task();
            assignedTask = workerTaskDistances.get(0).getTask();
            pTasks.remove(assignedTask);
            addToWorkerTaskAssignment(pWorkerTaskAssignments, worker, assignedTask);
            worker.setCapacity(worker.getCapacity() - 1);
            assignTaskToTask(pTasks, pWorkerTaskAssignments, worker, assignedTask);

        }
    }

    private boolean assignWorkerToTask(List<Task> pTasks, Worker worker, List<WorkerTaskDistance> pWorkerTaskDistances) {
        for (Task task : pTasks) {
            DistanceMatrix distanceMatrix = DistanceMatrixApi
                .newRequest(context)
                .origins(new LatLng(Double.parseDouble(worker.getLattitude()), Double.parseDouble(worker.getLongitude())))
                .destinations(new LatLng(Double.parseDouble(task.getFromLattitude()), Double.parseDouble(task.getFromLongitude())))
                .awaitIgnoreError();
            DistanceMatrixRow[] rows = distanceMatrix.rows;
            DistanceMatrixElement element = rows[0].elements[0];
            Long distance = element.distance.inMeters;
            WorkerTaskDistance workerTaskDistance = new WorkerTaskDistance();
            workerTaskDistance.setWorker(worker);
            workerTaskDistance.setTask(task);
            workerTaskDistance.setDistance(distance);
            pWorkerTaskDistances.add(workerTaskDistance);
        }

        if (pWorkerTaskDistances.size() <= 0)
            return true;

        pWorkerTaskDistances.sort((t1, t2) -> t1.getDistance().compareTo(t2.getDistance()));
        return false;
    }

    private void assignTaskToTask(List<Task> pTasks, List<WorkerTaskAssignment> pWorkerTaskAssignments, Worker worker, Task pAssignedTask) {
        while (pTasks.size() > 0 && worker.getCapacity() > 0) {
            List<TaskToTaskDistance> taskToTaskDistances = new ArrayList<>();
            for (Task task : pTasks) {
                DistanceMatrix distanceMatrix = DistanceMatrixApi
                    .newRequest(context)
                    .origins(new LatLng(Double.parseDouble(pAssignedTask.getToLattitude()), Double.parseDouble(pAssignedTask.getToLongitude())))
                    .destinations(new LatLng(Double.parseDouble(task.getFromLattitude()), Double.parseDouble(task.getFromLongitude())))
                    .awaitIgnoreError();
                DistanceMatrixRow[] rows = distanceMatrix.rows;
                DistanceMatrixElement element = rows[0].elements[0];
                Long distance = element.distance.inMeters;
                TaskToTaskDistance taskToTaskDistance = new TaskToTaskDistance();
                taskToTaskDistance.setSource(pAssignedTask);
                taskToTaskDistance.setDestination(task);
                taskToTaskDistance.setDistance(distance);
                taskToTaskDistances.add(taskToTaskDistance);
            }

            if (taskToTaskDistances.size() <= 0)
                break;
            taskToTaskDistances.sort((t1, t2) -> t1.getDistance().compareTo(t2.getDistance()));
            pAssignedTask = taskToTaskDistances.get(0).getDestination();
            pTasks.remove(pAssignedTask);
            worker.setCapacity(worker.getCapacity() - 1);
            addToWorkerTaskAssignment(pWorkerTaskAssignments, worker, pAssignedTask);
        }
    }

    private void addToWorkerTaskAssignment(List<WorkerTaskAssignment> pWorkerTaskAssignments, Worker worker, Task pAssignedTask) {
        WorkerTaskAssignment workerTaskAssignment = new WorkerTaskAssignment();
        workerTaskAssignment.setWorker(worker.getName());
        workerTaskAssignment.setTask(pAssignedTask.getName());
        pWorkerTaskAssignments.add(workerTaskAssignment);
    }

    /**
     * Get one workerTaskAssignment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public WorkerTaskAssignment findOne(Long id) {
        log.debug("Request to get WorkerTaskAssignment : {}", id);
        return workerTaskAssignmentRepository.findOne(id);
    }

    /**
     * Delete the workerTaskAssignment by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete WorkerTaskAssignment : {}", id);
        workerTaskAssignmentRepository.delete(id);
    }
}
