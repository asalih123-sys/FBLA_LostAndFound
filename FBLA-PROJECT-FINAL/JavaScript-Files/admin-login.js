// ---------------------------
// Hashing Passwords Function
// ---------------------------
async function hashPassword(pass) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

//burger menu
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("show");
});


// ---------------------------
// Login Form Handling
// ---------------------------
const form = document.getElementById("admin-form"); // Same form ID

form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Stop page refresh

    // Grab username and password
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    // Get users array from localStorage
    const users = JSON.parse(localStorage.getItem("adminData")) || [];

    // Hash entered password
    const hashedInput = await hashPassword(password);

    // Find matching user
    const user = users.find(u => u.username === username && u.password === hashedInput);
    if (user) {
        alert("Login successful!");
        // Redirect to Dashboard
        window.location.href = "/FBLA-PROJECT-FINAL/dash.html";
    } else {
        alert("Invalid username or password.");
    }


    
});
