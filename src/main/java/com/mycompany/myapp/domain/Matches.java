package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Matches.
 */
@Entity
@Table(name = "matches")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Matches implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "leftcompanyid", nullable = false)
    private Integer leftcompanyid;

    @NotNull
    @Column(name = "rightcompanyid", nullable = false)
    private Integer rightcompanyid;

    @ManyToOne
    @JsonIgnoreProperties(value = "leftcompanies", allowSetters = true)
    private Companies left;

    @ManyToOne
    @JsonIgnoreProperties(value = "rightcompanies", allowSetters = true)
    private Companies right;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLeftcompanyid() {
        return leftcompanyid;
    }

    public Matches leftcompanyid(Integer leftcompanyid) {
        this.leftcompanyid = leftcompanyid;
        return this;
    }

    public void setLeftcompanyid(Integer leftcompanyid) {
        this.leftcompanyid = leftcompanyid;
    }

    public Integer getRightcompanyid() {
        return rightcompanyid;
    }

    public Matches rightcompanyid(Integer rightcompanyid) {
        this.rightcompanyid = rightcompanyid;
        return this;
    }

    public void setRightcompanyid(Integer rightcompanyid) {
        this.rightcompanyid = rightcompanyid;
    }

    public Companies getLeft() {
        return left;
    }

    public Matches left(Companies companies) {
        this.left = companies;
        return this;
    }

    public void setLeft(Companies companies) {
        this.left = companies;
    }

    public Companies getRight() {
        return right;
    }

    public Matches right(Companies companies) {
        this.right = companies;
        return this;
    }

    public void setRight(Companies companies) {
        this.right = companies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matches)) {
            return false;
        }
        return id != null && id.equals(((Matches) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Matches{" +
            "id=" + getId() +
            ", leftcompanyid=" + getLeftcompanyid() +
            ", rightcompanyid=" + getRightcompanyid() +
            "}";
    }
}
