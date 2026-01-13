// ==============================
// Report Page JS
// Handles submitting lost items to localStorage
// ==============================

// Grab the form element from the page
const form = document.getElementById("report");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Stop the page from refreshing when the form is submitted

    // Grab the file input and get the selected file (if any)
    const fileInput = document.getElementById("myfile");
    const file = fileInput.files[0];
   // Uses FileReader to convert the image into a Base64 string
    const reader = new FileReader();

    reader.onload = function() {
        // This will be the image as a Base64 string
        // If no file was uploaded, it will just be an empty string
        const imageBase64 = reader.result || "";

        // -----------------------------
        // Get existing reports from localStorage
        // -----------------------------
        let storedReports = JSON.parse(localStorage.getItem("reportData"));
        let reports = [];

        // Make sure we have an array to work with
        if (storedReports) {
            if (Array.isArray(storedReports)) {
                reports = storedReports; 
            } else {
                reports = [storedReports]; 
            }
        }

        // -----------------------------
        // Create a new report object with the form data
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
            image: imageBase64,                         
            category: document.getElementById("category").value,
            status: "pending"                           // Default status, admin will review
        };

        // Add the new report to the back of the array
        reports.push(data);

        // Save the updated array back to localStorage
        localStorage.setItem("reportData", JSON.stringify(reports));

        // Reset the form so the user can submit another item easily
        if (form && typeof form.reset === "function") {
            form.reset();
        }

        // Let the user know their report was saved
        alert("Item saved successfully! Please wait for admin review.");
    };

    // If a file was uploaded, read it as Base64
    if (file) {
        reader.readAsDataURL(file); // This will trigger reader.onload when done
    } else {
        // If no file, just call the onload function to save the rest of the data
        reader.onload();
    }
});

    //Burger menu 
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});

