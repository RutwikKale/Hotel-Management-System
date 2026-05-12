document.getElementById('bookingForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting to a server immediately
    event.preventDefault();

    // Capture the values from the input fields
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const roomType = document.querySelector('select').value;
    const guests = document.getElementById('guests').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;

    // Print the details to the console
    console.log("--- Booking Details ---");

    console.log("Guest Name: " + fullName);

    console.log("Email: " + email);

    console.log("Room Type: " + roomType);

    console.log("Number of Guests: " + guests);

    console.log("Check-in: " + checkin);
    
    console.log("Check-out: " + checkout);

    // Optional: Alert the user
    alert("Booking Confirmed for " + fullName + "!");
});