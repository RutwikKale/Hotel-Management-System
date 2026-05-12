package com.grandstay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.grandstay.entity.Booking;
import com.grandstay.entity.ContactQuery;
import com.grandstay.repository.BookingRepository;
import com.grandstay.repository.QueryRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Allows any frontend to access the data
public class AdminDataController {

    @Autowired
    private BookingRepository bookingRepo;

    @GetMapping("/bookings") 
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepo.findAll();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            e.printStackTrace(); // This prints the "Primitive Type" error to your IDE console
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Database Mapping Error: " + e.getMessage());
    }
}


    @Autowired
    private QueryRepository queryRepo;

    @GetMapping("/queries")
    public List<ContactQuery> getAllQueries() {
        return queryRepo.findAll();
    }

    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable String id, // String matches GS-XXXX format[cite: 30, 33]
            @RequestParam String status) {
        
        Booking booking = bookingRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        
        booking.setStatus(status); 
        return ResponseEntity.ok(bookingRepo.save(booking));
    }
}