package org.spatial.crowdsource.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Worker.
 */
@Entity
@Table(name = "worker")
public class Worker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name="lattitude")
    private String lattitude;

    @Column(name="longitude")
    private String longitude;

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

    public Worker name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public Worker location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Worker capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getLattitude() {
        return lattitude;
    }

    public void setLattitude(String pLattitude) {
        lattitude = pLattitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String pLongitude) {
        longitude = pLongitude;
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
        Worker worker = (Worker) o;
        if (worker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), worker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Worker{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", location='" + getLocation() + "'" +
            ", capacity=" + getCapacity() + "'"+
            ", lattitude="+ getLattitude()+"'"+
            ", longitude="+ getLongitude()+
            "}";
    }
}
