package org.spatial.crowdsource.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "source")
    private String source;

    @Column(name = "destination")
    private String destination;

    @Column(name = "from_lattitude")
    private String fromLattitude;

    @Column(name = "from_longitude")
    private String fromLongitude;

    @Column(name = "to_lattitude")
    private String toLattitude;

    @Column(name = "to_longitude")
    private String toLongitude;

    @Column(name = "distance", precision=10, scale=2)
    private BigDecimal distance;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Task name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return source;
    }

    public Task source(String source) {
        this.source = source;
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public Task destination(String destination) {
        this.destination = destination;
        return this;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getFromLattitude() {
        return fromLattitude;
    }

    public Task fromLattitude(String fromLattitude) {
        this.fromLattitude = fromLattitude;
        return this;
    }

    public void setFromLattitude(String fromLattitude) {
        this.fromLattitude = fromLattitude;
    }

    public String getFromLongitude() {
        return fromLongitude;
    }

    public Task fromLongitude(String fromLongitude) {
        this.fromLongitude = fromLongitude;
        return this;
    }

    public void setFromLongitude(String fromLongitude) {
        this.fromLongitude = fromLongitude;
    }

    public String getToLattitude() {
        return toLattitude;
    }

    public Task toLattitude(String toLattitude) {
        this.toLattitude = toLattitude;
        return this;
    }

    public void setToLattitude(String toLattitude) {
        this.toLattitude = toLattitude;
    }

    public String getToLongitude() {
        return toLongitude;
    }

    public Task toLongitude(String toLongitude) {
        this.toLongitude = toLongitude;
        return this;
    }

    public void setToLongitude(String toLongitude) {
        this.toLongitude = toLongitude;
    }

    public BigDecimal getDistance() {
        return distance;
    }

    public Task distance(BigDecimal distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(BigDecimal distance) {
        this.distance = distance;
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
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", source='" + getSource() + "'" +
            ", destination='" + getDestination() + "'" +
            ", fromLattitude='" + getFromLattitude() + "'" +
            ", fromLongitude='" + getFromLongitude() + "'" +
            ", toLattitude='" + getToLattitude() + "'" +
            ", toLongitude='" + getToLongitude() + "'" +
            ", distance=" + getDistance() +
            "}";
    }
}
