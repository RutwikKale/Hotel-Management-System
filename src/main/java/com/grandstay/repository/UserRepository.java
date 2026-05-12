package com.grandstay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grandstay.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // This allows searching the database by username[cite: 10]
    Optional<User> findByUsername(String username);
}