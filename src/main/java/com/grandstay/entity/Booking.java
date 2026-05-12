package com.grandstay.entity;

// FIX: Changed 'javax.persistence' to 'jakarta.persistence'
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @Column(name = "bookingId") // Matches your SQL column name
    private String bookingId; 

    @Column(name = "guest_name") // This links the Java field to the SQL column
    private String fullName;

    @Column(name = "username")
    private String username; // This will link to the User's username

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "num_guests")
    private Integer numGuests;

    @Column(name = "num_rooms")
    private Integer numRooms;

    @Column(name = "check_in")
    private LocalDate checkIn;

    @Column(name = "check_out")
    private LocalDate checkOut;

    @Column(name = "total_price")
    private Double totalPrice;
    
    // ADD THIS FIELD
    @Column(name = "status")
    private String status = "Pending"; // Default value

    // IMPORTANT: Hibernate REQUIRES a default constructor
    public Booking() {}

    // Getters and Setters (VS Code: Right-click -> Source Action -> Generate Getters and Setters)
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

     public Integer getNumRooms() { return numRooms; }
    public void setNumRooms(Integer numRooms) { this.numRooms = numRooms; }

    public Integer getNumGuests() { return numGuests; }
    public void setNumGuests(Integer numGuests) { this.numGuests = numGuests; }

    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }   


    // ADD THESE GETTER AND SETTER METHODS
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
