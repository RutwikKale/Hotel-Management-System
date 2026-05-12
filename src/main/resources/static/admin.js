const API_URL = "http://localhost:8080/api/admin";

function loadAdmin(option) {
    const displayArea = document.getElementById('dynamic-content');
    
    if (option === 'reservations') {
        fetch('reservation.html')
            .then(res => res.text())
            .then(html => {
                displayArea.innerHTML = html;
                
                // CRITICAL: Call the function explicitly here
                // We use a tiny delay to ensure the DOM is ready
                setTimeout(() => {
                    if (typeof fetchReservations === "function") {
                        console.log("Starting data fetch...");
                        fetchReservations(); 
                    } else {
                        console.error("fetchReservations function not found!");
                    }
                }, 50);
            });
    }
    // ... rest of your queries logic

    if (option === 'queries') {
        displayArea.innerHTML = "<p style='color:white;'>Loading Inquiries...</p>";
        fetch(`${API_URL}/queries`)
            .then(res => res.json())
            .then(data => {
                displayArea.innerHTML = renderInquiries(data);
            })
            .catch(err => {
                displayArea.innerHTML = `<p style='color:red;'>Error: ${err.message}</p>`;
            });
    }
}

// Inside your admin dashboard script
function renderBookingTable(bookings) {
    const tableBody = document.getElementById('adminBookingTableBody');
    tableBody.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.bookingId}</td>
            
            <!-- FIX: Changed from b.guestName or b.name to b.fullName -->
            <td>${b.fullName || 'Guest Name Missing'}</td> 
            
            <td>${b.roomType}</td>
            <td>${b.checkIn} to ${b.checkOut}</td>
            <td>₹${b.totalPrice}</td>
            <td>${b.status}</td>
        </tr>
    `).join('');
}

// Function to render Inquiries
function renderInquiries(queries) {
    if (!queries || queries.length === 0) return "<p style='color:white;'>No inquiries found.</p>";
    return `
        <div class="glass-card">
            <h2 style="color:white; margin-bottom:15px;">User Inquiries</h2>
            ${queries.map(q => `
                <div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin-bottom:10px; color:white;">
                    <h4>${q.name} (${q.email})</h4>
                    <p>${q.message}</p>
                </div>`).join('')}
        </div>`;
}

// --- Add this to the bottom of admin.js ---

async function fetchReservations() {
    console.log("Fetching bookings...");
    const tableBody = document.getElementById('reservation-body');
    if (!tableBody) return; // Exit if the table isn't on the screen yet

    try {
        const response = await fetch(`http://localhost:8080/api/admin/bookings`);
        if (!response.ok) throw new Error("Server error: " + response.status);
        
        const bookings = await response.json();

        if (bookings.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>No bookings found.</td></tr>";
            return;
        }

        tableBody.innerHTML = bookings.map(b => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 15px;">${b.bookingId || 'N/A'}</td>
                <td>${b.guestName || 'Unknown'}</td>
                <td>${b.roomType || 'Standard'}</td>
                <td>₹${b.totalPrice || 0}</td>
                <td><span class="badge">${b.status || 'Pending'}</span></td>
                <td>
                    ${b.status === 'Pending' ? 
                    `<button onclick="updateStatus('${b.bookingId}', 'Accepted')" class="btn-acc">Accept</button>` : 'Processed'}
                </td>
            </tr>`).join('');
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan='6' style='color:red;'>${error.message}</td></tr>`;
    }
}

async function updateStatus(id, newStatus) {
    try {
        const response = await fetch(`http://localhost:8080/api/admin/bookings/${id}/status?status=${newStatus}`, { 
            method: 'PATCH' 
        });
        if (response.ok) {
            alert("Updated successfully!");
            fetchReservations(); // Refresh the table
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
}

function logoutAdmin() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("admin");
    window.location.href = "login.html";
}