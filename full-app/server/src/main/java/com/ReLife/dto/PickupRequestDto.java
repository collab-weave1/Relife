package com.ReLife.dto;

import jakarta.validation.constraints.NotBlank;

public class PickupRequestDto {

//    @NotBlank
    private String userId;
    
    @NotBlank
    private String device;
    
    @NotBlank
    private String brand;
    
    @NotBlank
    private String location;
    
    @NotBlank
    private String preferredTime;
    
//    @NotBlank
    private String status;
    
//    @NotBlank
    private String submittedDate;
    
    private Double value;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPreferredTime() {
		return preferredTime;
	}

	public void setPreferredTime(String preferredTime) {
		this.preferredTime = preferredTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(String submittedDate) {
		this.submittedDate = submittedDate;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}
	
}
