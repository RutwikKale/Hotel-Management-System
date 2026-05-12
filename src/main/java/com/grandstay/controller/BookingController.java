package com.grandstay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grandstay.entity.Booking;
import com.grandstay.repository.BookingRepository;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Use only ONE method for this URL
    @GetMapping("/user/{name}")
    public List<Booking> getByUsername(@PathVariable String name) {
        return bookingRepository.findByUsername(name);
    }
    
    // Your other methods like @PostMapping("/add") should stay here...

    @PostMapping("/add")
public Booking addBooking(@RequestBody Booking booking) {
    // This saves the data to the 'bookings' table in PostgreSQL[cite: 25, 28]
    return bookingRepository.save(booking); 
}
}