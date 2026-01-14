// ---------------------------
// Function to hash passwords using SHA-256
// ---------------------------
async function hashPassword(pass) {
    // TextEncoder converts string into bytes so crypto API can hash it
    const encoder = new TextEncoder();

    // Convert password to byte array
    const data = encoder.encode(pass);

    // Use the browser's built-in crypto API to hash the password
    const hash = await crypto.subtle.digest("SHA-256", data);

    // Convert the hash bytes to a readable hexadecimal string
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0")) // each byte to hex
        .join(""); // join all hex values into one string
}


//burger menu
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("show");
});


// ---------------------------
// Signup form handler
// ---------------------------
const form = document.getElementById("admin-form");

// Make the submit listener async so we can use 'await'
form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Stop the form from refreshing the page

    // Get username and password values from the form
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    

    // Optional: check confirm password if it exists
    const confirmPasswordInput = document.getElementById("confirmPass");
    if (confirmPasswordInput) {
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop execution if passwords don't match
        }
    }

    const confirmRole = document.getElementById("role").value;
    if (confirmRole !== "staff" && confirmRole !== "vuser") {
        alert("You must select the admin role or verified user Role to create an admin account.");
        return; // Stop execution if role is not admin
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // ---------------------------
    // Load existing users from localStorage
    // ---------------------------
    let users = JSON.parse(localStorage.getItem("adminData"));

    // If users doesn't exist yet, start as an empty array
    if (!users || !Array.isArray(users)) {
        users = [];
    }

    // ---------------------------
    // Check if username already exists
    // ---------------------------
    const usernameExists = users.some(user => user.username === username);
    if (usernameExists) {
        alert("Username already exists! Choose a different username.");
        return; // Stop execution
    }

    // ---------------------------
    // Create new user object
    // ---------------------------
    const newUser = {
        username: username,
        password: hashedPassword
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem("adminData", JSON.stringify(users));

    // Notify the user and reset the form
    alert("Account created successfully!");
    form.reset();
});