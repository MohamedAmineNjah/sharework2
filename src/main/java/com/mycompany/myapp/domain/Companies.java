package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Companies.
 */
@Entity
@Table(name = "companies")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Companies implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sourceid", nullable = false)
    private Integer sourceid;

    @NotNull
    @Column(name = "sourcename", nullable = false)
    private String sourcename;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "website")
    private String website;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "postalcode")
    private String postalcode;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @OneToMany(mappedBy = "left")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Matches> leftcompanies = new HashSet<>();

    @OneToMany(mappedBy = "right")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Matches> rightcompanies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSourceid() {
        return sourceid;
    }

    public Companies sourceid(Integer sourceid) {
        this.sourceid = sourceid;
        return this;
    }

    public void setSourceid(Integer sourceid) {
        this.sourceid = sourceid;
    }

    public String getSourcename() {
        return sourcename;
    }

    public Companies sourcename(String sourcename) {
        this.sourcename = sourcename;
        return this;
    }

    public void setSourcename(String sourcename) {
        this.sourcename = sourcename;
    }

    public String getName() {
        return name;
    }

    public Companies name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsite() {
        return website;
    }

    public Companies website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public Companies email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Companies phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public Companies address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public Companies postalcode(String postalcode) {
        this.postalcode = postalcode;
        return this;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getCity() {
        return city;
    }

    public Companies city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public Companies country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<Matches> getLeftcompanies() {
        return leftcompanies;
    }

    public Companies leftcompanies(Set<Matches> matches) {
        this.leftcompanies = matches;
        return this;
    }

    public Companies addLeftcompany(Matches matches) {
        this.leftcompanies.add(matches);
        matches.setLeft(this);
        return this;
    }

    public Companies removeLeftcompany(Matches matches) {
        this.leftcompanies.remove(matches);
        matches.setLeft(null);
        return this;
    }

    public void setLeftcompanies(Set<Matches> matches) {
        this.leftcompanies = matches;
    }

    public Set<Matches> getRightcompanies() {
        return rightcompanies;
    }

    public Companies rightcompanies(Set<Matches> matches) {
        this.rightcompanies = matches;
        return this;
    }

    public Companies addRightcompany(Matches matches) {
        this.rightcompanies.add(matches);
        matches.setRight(this);
        return this;
    }

    public Companies removeRightcompany(Matches matches) {
        this.rightcompanies.remove(matches);
        matches.setRight(null);
        return this;
    }

    public void setRightcompanies(Set<Matches> matches) {
        this.rightcompanies = matches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Companies)) {
            return false;
        }
        return id != null && id.equals(((Companies) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Companies{" +
            "id=" + getId() +
            ", sourceid=" + getSourceid() +
            ", sourcename='" + getSourcename() + "'" +
            ", name='" + getName() + "'" +
            ", website='" + getWebsite() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            ", postalcode='" + getPostalcode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
