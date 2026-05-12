package com.grandstay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grandstay.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String> {
    // This MUST match the controller's call verbatim
    List<Booking> findByUsername(String username);
}