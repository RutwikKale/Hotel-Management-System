// Function to show the green popup
function showGreenNotify(message) {
    const notify = document.getElementById("successNotify");
    notify.innerText = message;
    notify.style.display = "block";
    
    // Hide it after 3 seconds
    setTimeout(() => {
        notify.style.display = "none";
    }, 3000);
}

// --- REGISTRATION LOGIC ---
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            fullName: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                showGreenNotify("Registration Successful!"); // Green Notification
                setTimeout(() => { window.location.href = "login.html"; }, 3000);
            } else {
                alert("Registration Failed.");
            }
        });
    });
}
// --- LOGIN LOGIC ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("userRole").value;

        if (role === "admin") {
            // Static Admin Check[cite: 19]
            if (username === "admin" && password === "admin123") {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", "Admin");
                window.location.href = "admin.html";
            } else {
                alert("Invalid Admin Credentials");
            }
        } else {
            // Database Customer Check
            try {
                const response = await fetch('http://localhost:8080/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", user.username); 
                    localStorage.setItem("guestName", user.fullName);

                    showGreenNotify("Login Successful!"); // Green Notification
                    setTimeout(() => { window.location.href = "dashboard.html";; }, 3000);
                    
                } else {
                    alert("Login Failed: Unregistered user or wrong password.");
                }
            } catch (error) {
                alert("Connection Error to Backend.");
            }
        }
    });
}