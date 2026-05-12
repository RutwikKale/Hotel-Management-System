function loadContent(option) {
    const display = document.getElementById('main-display');

    // Remove 'active' class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Handle content switching
    switch (option) {
        case 'dashboard':
            fetch('dash.html')
                .then(response => {
                    if (!response.ok) throw new Error('Could not load dashboard page');
                    return response.text();
                })
                .then(data => {
                    display.innerHTML = data;
                })
                .catch(err => {
                    display.innerHTML = "<h1>Error</h1><p>Dashboard page unavailable.</p>";
                    console.error(err);
                });
            break;

        // In script1.js
        case 'bookings':
            // Fetch the external booking.html file
            fetch('booking.html')
                .then(response => response.text())
                .then(data => {
                    display.innerHTML = data;
                    // Important: Initialize form logic AFTER content is loaded
                    setupBookingForm();
                })
                .catch(err => {
                    display.innerHTML = "<h1>Error</h1><p>Could not load the booking page.</p>";
                    console.error(err);
                });
            break;

        // In script1.js
        case 'my_reservations':
    // Define the HTML structure directly instead of fetching an external file
    display.innerHTML = `
        <div class="user-bookings">
            <h2 style="color:white;">My <span class="accent-text">Reservations</span></h2>
            <div id="booking-status-container">
                <p style="color:white;">Checking your reservation status...</p>
            </div>
        </div>`;
    
    // Call the status function now that the container exists in the HTML[cite: 4, 5]
    checkMyStatus();
    break;



        case 'service':
            fetch('customer_service.html')
                .then(response => {
                    if (!response.ok) throw new Error('Could not load service page');
                    return response.text();
                })
                .then(data => {
                    display.innerHTML = data;
                })
                .catch(err => {
                    display.innerHTML = "<h1>Error</h1><p>Service page unavailable.</p>";
                    console.error(err);
                });
            break;




        case 'contact':
            fetch('contact.html')
                .then(response => {
                    if (!response.ok) throw new Error('Could not load contact page');
                    return response.text();
                })
                .then(data => {
                    display.innerHTML = data;
                    setupContactForm(); // Initialize specific logic for this form
                })
                .catch(err => {
                    display.innerHTML = "<h1>Error</h1><p>Contact page unavailable.</p>";
                    console.error(err);
                });
            break;




        case 'queries':
            fetch('CusSupport.html')
                .then(response => {
                    if (!response.ok) throw new Error('Could not load queries page');
                    return response.text();
                })
                .then(data => {
                    display.innerHTML = data;
                    setupCustomerSupport(); // initialize form
                })
                .catch(err => {
                    display.innerHTML = "<h1>Error</h1><p>Queries page unavailable.</p>";
                    console.error(err);
                });
            break;



        default:
            display.innerHTML = "<h1>Welcome</h1>";
    }
}

async function checkMyStatus() {
    // CRITICAL: Must use "username" to match your dashboard's login check[cite: 3, 4]
    const currentGuest = localStorage.getItem("username"); 
    const container = document.getElementById('booking-status-container');

    if (!currentGuest) {
        container.innerHTML = "<p style='color:red;'>Please log in to see your bookings.</p>";
        return;
    }

    try {
        // Fetch bookings ONLY for the logged-in user
        const response = await fetch(`http://localhost:8080/api/bookings/user/${currentGuest}`);
        if (!response.ok) throw new Error("Server error");
        
        const myBookings = await response.json();

        if (myBookings.length === 0) {
            container.innerHTML = `<p style="color:white;">No bookings found for ${currentGuest}.</p>`;
            return;
        }

        // Render the bookings[cite: 5]
        container.innerHTML = myBookings.map(b => `
            <div class="status-card" style="background:rgba(255,255,255,0.1); padding: 15px; margin: 10px 0; border-radius: 10px; color:white;">
                <h3>Booking ID: ${b.bookingId}</h3>
                <p>Room: ${b.roomType}</p>
                <p>Status: 
                    <span style="padding: 5px 10px; border-radius: 5px; font-weight: bold; 
                          background: ${b.status === 'Accepted' ? '#55efc4' : '#ffeaa7'}; color: #2d3436;">
                        ${b.status}
                    </span>
                </p>
                ${b.status === 'Accepted' ? 
                    '<p style="color: #55efc4;">🎉 Confirmed!</p>' : 
                    '<p style="color: #aaa;">Reviewing...</p>'}
            </div>
        `).join('');

    } catch (error) {
        console.error("Fetch Error:", error);
        container.innerHTML = "<p style='color:red;'>Service currently unavailable.</p>";
    }
}

function loadUserBookings() {
    // CHANGE THIS LINE:
    const currentGuest = localStorage.getItem("username"); // Use "username" to match dashboard.html
    // In a real app, you would filter by the logged-in user's name or email
    fetch('http://localhost:8080/api/bookings/all')
        .then(res => res.json())
        .then(data => {
            let html = '<h3>My Booking Status</h3><ul>';
            data.forEach(b => {
                html += `<li>Booking ${b.bookingId}: <strong>${b.status}</strong></li>`;
            });
            html += '</ul>';
            display.innerHTML = html;
        });
}

//--------------------------------------------------------
async function checkMyStatus() {
    const currentGuest = localStorage.getItem("username"); 
    console.log("Current User from LocalStorage:", currentGuest); // Check this in F12 Console
    
    const response = await fetch(`http://localhost:8080/api/bookings/user/${currentGuest}`);
    const myBookings = await response.json();
    console.log("Data received from server:", myBookings); // Check this too
    // ...
}
//---------------------------------------------------------------------------------



function PriceCalculator(data) {
    const checkin = new Date(data.checkin);
    const checkout = new Date(data.checkout);

    // Calculate nights safely
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nights = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    // Safety: If dates are same or invalid, return 0
    if (nights <= 0) return 0;

    let pricePerNight = 0;

    switch (data.room) {
        case 'Standard Suite':
            pricePerNight = 1500;
            break;
        case 'Deluxe Room':
            pricePerNight = 3000;
            break;
        case 'Presidential Suite':
            pricePerNight = 7000;
            break;
        default:
            pricePerNight = 0;
    }

    // Also multiply by number of rooms if your data includes it
    const numRooms = data.rooms || 1; 

    return pricePerNight * nights * numRooms;
}

/**
 * Synchronizes the booking form with the logged-in user 
 * and handles the submission to the backend.
 */
function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    const nameInput = document.getElementById('fullName');
    const display = document.getElementById('totalPriceDisplay');

    if (!form) return;

    // 1. Auto-fill the Full Name from the registration data[cite: 16, 20]
    const userRealName = localStorage.getItem("fullName"); 
    if (userRealName && nameInput) {
        nameInput.value = userRealName; 
        nameInput.readOnly = true; 
        nameInput.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; 
    }

    // 2. Attach Listeners for Real-time Price Updates
    const priceInputs = ['roomType', 'guests', 'rooms', 'checkin', 'checkout'];
    priceInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Updates whenever the user clicks or types
            element.addEventListener('input', updateLiveEstimate);
            element.addEventListener('change', updateLiveEstimate);
        }
    });

   // Inside setupBookingForm() in script1.js
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const bookingData = {
        bookingId: "GS-" + Math.floor(1000 + Math.random() * 9000),
        
        // CRITICAL: The key MUST be 'fullName' to match the Java variable[cite: 26]
        fullName: document.getElementById('fullName').value, 
        
        username: localStorage.getItem("username"),
        roomType: document.getElementById('roomType').value,
        numRooms: parseInt(document.getElementById('rooms').value) || 1,
        numGuests: parseInt(document.getElementById('guests').value) || 1,
        checkIn: document.getElementById('checkin').value,
        checkOut: document.getElementById('checkout').value,
        totalPrice: calculateLivePrice(),
        status: "Pending"
    };

    try {
        const response = await fetch('http://localhost:8080/api/bookings/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            const saved = await response.json();
            alert("Booking Successful! ID: " + saved.bookingId);
            printReceipt(saved); 
            form.reset();
        } else {
            alert("Database Error: Check your backend logs.");
        }
    } catch (error) {
        alert("Connection Error: Is Spring Boot running?");
    }
});
}

function updateLiveEstimate() {
    const display = document.getElementById('totalPriceDisplay');
    const totalPrice = calculateLivePrice(); // Logic defined below[cite: 16]

    if (totalPrice > 0) {
        display.innerHTML = `Estimated Total: <span style="color: #2ecc71; font-size: 1.2em;">₹${totalPrice.toLocaleString()}</span>`;
    } else {
        display.innerHTML = `Estimated Total: <span style="color: #666;">₹0 (Check your dates)</span>`;
    }
}


/**
 * Your Logic Integrated for Dynamic Calculation
 */
function calculateLivePrice() {
    const data = {
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        room: document.getElementById('roomType').value,
        rooms: parseInt(document.getElementById('rooms').value) || 1
    };

    if (!data.checkin || !data.checkout) return 0;

    const checkin = new Date(data.checkin);
    const checkout = new Date(data.checkout);

    // Calculate nights (using round to avoid partial day errors)
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nights = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    if (nights <= 0) return 0;

    let pricePerNight = 0;
    switch (data.room) {
        case 'Standard Suite':
            pricePerNight = 1500;
            break;
        case 'Deluxe Room':
            pricePerNight = 3000;
            break;
        case 'Presidential Suite':
            pricePerNight = 7000;
            break;
        default:
            pricePerNight = 0;
    }

    return pricePerNight * nights * data.rooms;
}

function printReceipt(data) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Receipt - ${data.bookingId}</title>
            <style>
                body { font-family: sans-serif; padding: 40px; line-height: 1.6; }
                .receipt-border { border: 2px solid #0A2558; padding: 30px; max-width: 500px; margin: auto; }
                h2 { color: #0A2558; text-align: center; border-bottom: 2px solid #eee; }
                .detail { display: flex; justify-content: space-between; margin: 10px 0; }
                .total { font-size: 20px; font-weight: bold; border-top: 2px solid #eee; padding-top: 10px; }
                .btn-print { background: #0A2558; color: white; padding: 10px; border: none; width: 100%; cursor: pointer; margin-top: 20px; }
                @media print { .btn-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="receipt-border">
                <h2>GRAND STAY HOTEL</h2>
                <div class="detail"><span>Booking ID:</span> <span>${data.bookingId}</span></div>
                <div class="detail"><span>Guest Name:</span> <span>${data.fullName}</span></div>
                <div class="detail"><span>Room Type:</span> <span>${data.roomType}</span></div>
                <div class="detail"><span>Check-in:</span> <span>${data.checkIn}</span></div>
                <div class="detail"><span>Check-out:</span> <span>${data.checkOut}</span></div>
                <div class="detail total"><span>Total Amount:</span> <span>₹${data.totalPrice}</span></div>
                <button class="btn-print" onclick="window.print()">Download / Save as PDF</button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}


function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const contactData = {
                name: "User", // You can add a name field to contact.html
                email: "user@example.com",
                subject: this.querySelector('input[type="text"]').value,
                message: this.querySelector('textarea').value,
                queryType: "General Inquiry"
            };

            fetch('http://localhost:8080/api/users/submit-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            })
                .then(res => {
                    if (res.ok) {
                        alert("Message sent and saved to Database!");
                        form.reset();
                    }
                });
        });
    }
}

function setupCustomerSupport() {
    const form = document.getElementById('queryForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const queryData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                queryType: document.getElementById('queryType').value,
                message: document.getElementById('message').value
            };

            // This POST endpoint would be in a separate UserController or QueryController
            fetch('http://localhost:8080/api/users/submit-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(queryData)
            })
                .then(res => {
                    if (res.ok) {
                        alert("Query Submitted Successfully!");
                        form.reset();
                    }
                });
        });
    }
}

/*#############################################################################################*/

function logoutUser() {
    // Clear stored login data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "login.html";
}

/*#############################################################################################*/

