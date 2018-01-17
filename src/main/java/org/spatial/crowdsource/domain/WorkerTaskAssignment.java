package org.spatial.crowdsource.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A WorkerTaskAssignment.
 */
@Entity
@Table(name = "worker_task_assignment")
public class WorkerTaskAssignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "worker")
    private String worker;

    @Column(name = "task")
    private String task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorker() {
        return worker;
    }

    public WorkerTaskAssignment worker(String worker) {
        this.worker = worker;
        return this;
    }

    public void setWorker(String worker) {
        this.worker = worker;
    }

    public String getTask() {
        return task;
    }

    public WorkerTaskAssignment task(String task) {
        this.task = task;
        return this;
    }

    public void setTask(String task) {
        this.task = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkerTaskAssignment workerTaskAssignment = (WorkerTaskAssignment) o;
        if (workerTaskAssignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workerTaskAssignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WorkerTaskAssignment{" +
            "id=" + getId() +
            ", worker='" + getWorker() + "'" +
            ", task='" + getTask() + "'" +
            "}";
    }
}
