
--__________________________________________________________________

-- 1. Users Table (Customers)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Added for login functionality
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Rooms Table
CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL, -- 'Standard Suite', 'Deluxe Room', etc.
    price_per_night DECIMAL(10, 2) NOT NULL,
    availability_status BOOLEAN DEFAULT TRUE
);

-- 3. Bookings Table (Incorporating Screenshot Elements)
CREATE TABLE bookings (
    booking_id VARCHAR(20) PRIMARY KEY, -- e.g., GS-2348 from screenshot
    user_id INT REFERENCES users(user_id),
    guest_name VARCHAR(100), -- For cases where the guest is different from the user
    room_type VARCHAR(50),
    num_rooms INT DEFAULT 1, -- Fixed the 'undefined' issue in your screenshot
    num_guests INT DEFAULT 1,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Admin Table
CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);