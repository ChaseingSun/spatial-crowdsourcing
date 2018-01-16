package org.spatial.crowdsource.service.helper.worker.task.assignment;

import org.spatial.crowdsource.domain.Task;
import org.spatial.crowdsource.domain.Worker;

import java.math.BigDecimal;

/**
 * Created by Monjur-E-Morshed on 16-Jan-18.
 */
public class WorkerTaskDistance {

   private Worker worker;
   private Task task;
   private Long distance;

    public WorkerTaskDistance() {
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker pWorker) {
        worker = pWorker;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task pTask) {
        task = pTask;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long pDistance) {
        distance = pDistance;
    }
}
