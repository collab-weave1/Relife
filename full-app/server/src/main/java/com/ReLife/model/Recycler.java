package com.ReLife.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Recycler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    @OneToMany(mappedBy = "recycler")
    private List<EWasteRecord> eWasteRecords;

    // Constructors
    public Recycler() {}

    public Recycler(String name, String location) {
        this.name = name;
        this.location = location;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<EWasteRecord> getEWasteRecords() {
        return eWasteRecords;
    }

    public void setEWasteRecords(List<EWasteRecord> eWasteRecords) {
        this.eWasteRecords = eWasteRecords;
    }
}

