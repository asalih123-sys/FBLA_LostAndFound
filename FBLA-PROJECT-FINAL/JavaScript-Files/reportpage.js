// ==============================
// Report Page JS
// Handles submitting lost items to localStorage
// ==============================

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

    let storedReports = JSON.parse(localStorage.getItem("reportData")) || [];
    if (!Array.isArray(storedReports)) storedReports = [storedReports];

    const data = {
        id: Date.now().toString(),
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        campus: document.getElementById("campus").value,
        phone: document.getElementById("phone").value,
        datefound: document.getElementById("datemin").value,
        losttext: document.getElementById("found").value,
        image: imageBase64,
        category: document.getElementById("category").value,
        status: "pending"
    };

    storedReports.push(data);
    localStorage.setItem("reportData", JSON.stringify(storedReports));

    imagePreview.style.display = "none";
    imageBase64 = "";

    alert("Item saved successfully! Please wait for admin review.");
});

// ==============================
// Campus Map Preview
// ==============================
function getName() {
    const x = document.getElementById('campus');
    let image = '';

    if (x.value === 'Central-Campus') image = `<img src="Images/update-cc-map.jpg">`;
    if (x.value === 'Northeast-Campus') image = `<img src="Images/Northeast-Map.jpg">`;
    if (x.value === 'Northwest-Campus') image = `<img src="Images/Northwest-Campus-Map.jpg">`;
    if (x.value === 'Southwest-Campus') image = `<img src="Images/Southwest-Campus-Map.jpg">`;

    document.getElementById('showMap').innerHTML = image;
}

// ==============================
// Burger Menu
// ==============================
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});

