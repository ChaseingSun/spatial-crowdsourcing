package org.spatial.crowdsource.service.helper.worker.task.assignment;

import org.spatial.crowdsource.domain.Task;

/**
 * Created by Monjur-E-Morshed on 16-Jan-18.
 */
public class TaskToTaskDistance {
    private Task source;
    private Task destination;
    private Long distance;

    public TaskToTaskDistance() {
    }

    public Task getSource() {
        return source;
    }

    public void setSource(Task pSource) {
        source = pSource;
    }

    public Task getDestination() {
        return destination;
    }

    public void setDestination(Task pDestination) {
        destination = pDestination;
    }

    public Long getDistance() {
        return distance;
    }

    public void setDistance(Long pDistance) {
        distance = pDistance;
    }
}
