package com.ReLife.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AdminStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ewasteCollected;
    private String eprReports;
    private int recyclers;
    private String users;
    private String co2Saved;
    private int refurbishedSold;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEwasteCollected() {
        return ewasteCollected;
    }

    public void setEwasteCollected(String ewasteCollected) {
        this.ewasteCollected = ewasteCollected;
    }

    public String getEprReports() {
        return eprReports;
    }

    public void setEprReports(String eprReports) {
        this.eprReports = eprReports;
    }

    public int getRecyclers() {
        return recyclers;
    }

    public void setRecyclers(int recyclers) {
        this.recyclers = recyclers;
    }

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }

    public String getCo2Saved() {
        return co2Saved;
    }

    public void setCo2Saved(String co2Saved) {
        this.co2Saved = co2Saved;
    }

    public int getRefurbishedSold() {
        return refurbishedSold;
    }

    public void setRefurbishedSold(int refurbishedSold) {
        this.refurbishedSold = refurbishedSold;
    }
}
