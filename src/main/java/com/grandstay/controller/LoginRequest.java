package com.grandstay.controller;

public class LoginRequest {
    private String username;
    private String password;

    // Getters and Setters are REQUIRED for Spring to read the JSON[cite: 7, 8]
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}