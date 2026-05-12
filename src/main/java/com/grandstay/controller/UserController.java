package com.grandstay.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; // Needed for Optional
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grandstay.entity.User;
import com.grandstay.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo; // Note: using 'userRepo' consistently

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userRepo.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: Username or Email already exists!");
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    // 1. Search for the user by username
    Optional<User> user = userRepo.findByUsername(loginRequest.getUsername());

    // 2. Strict Check: User must exist AND password must match exactly
    if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
        // Only return the user object if they are registered and verified[cite: 7]
        return ResponseEntity.ok(user.get()); 
    } else {
        // Return an error if they aren't registered or entered wrong details[cite: 8]
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not registered or invalid credentials");
    }
}
}