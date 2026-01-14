// ==============================
// Report Page JS
// Handles submitting lost items to localStorage
// ==============================

// Grab the form element
const form = document.getElementById("report");
const fileInput = document.getElementById("myfile");
const imagePreview = document.getElementById("imagePreview"); 
const imageError = document.getElementById("imageError");     

let imageBase64 = "";

// ==============================
// Image Validation & Preview
// ==============================
fileInput.addEventListener("change", function () {
    const file = this.files[0];
    imageError.textContent = "";
    imagePreview.style.display = "none";
    imageBase64 = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
        imageError.textContent = "Only JPG, PNG, or WEBP images are allowed.";
        this.value = "";
        return;
    }

    if (file.size > maxSize) {
        imageError.textContent = "Image must be smaller than 2MB.";
        this.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        imageBase64 = e.target.result;
        imagePreview.src = imageBase64;
        imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// ==============================
// Submit Report
// ==============================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // -----------------------------
    // Get existing reports from localStorage
    // -----------------------------
    let storedReports = JSON.parse(localStorage.getItem("reportData")) || [];
    if (!Array.isArray(storedReports)) storedReports = [storedReports];

    // -----------------------------
    // Create new report object
    // -----------------------------
    const data = {
        id: Date.now().toString(),
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        campus: document.getElementById("campus").value,
        phone: document.getElementById("phone").value,
        datefound: document.getElementById("datemin").value,
        losttext: document.getElementById("found").value,
        image: imageBase64,         // already validated
        category: document.getElementById("category").value,
        status: "pending"           // default
    };

    // Add the new report
    storedReports.push(data);

    // Save back to localStorage
    localStorage.setItem("reportData", JSON.stringify(storedReports));

    // Reset form and image preview
    form.reset();
    imagePreview.style.display = "none";
    imageBase64 = "";

    alert("Item saved successfully! Please wait for admin review.");
});

// ==============================
// Burger Menu
// ==============================
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});
