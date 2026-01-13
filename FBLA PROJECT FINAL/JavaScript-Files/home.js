    // Function to update the dashboard stats
function updateDashboardStats() {
    // Get stored report data
    const stored = localStorage.getItem("reportData");
    let allItems = [];

    if (stored) {
        try {
            allItems = Array.isArray(JSON.parse(stored)) ? JSON.parse(stored) : [JSON.parse(stored)];
        } catch (e) {
            allItems = [];
            console.error("Error parsing stored items:", e);
        }
    }

    // Calculate stats
    const totalItems = allItems.length;
    const itemsClaimed = allItems.filter(item => item.status === "claimed").length;
    const itemsAvailable = allItems.filter(item => item.status === "pending" || item.status === "approved").length;

    // Update DOM
    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("items-claimed").textContent = itemsClaimed;
    document.getElementById("items-available").textContent = itemsAvailable;
}

        // Burger menu (Show/Invisible)
        const burger = document.getElementById("burger");
        const menu = document.querySelector(".menu");

        burger.addEventListener("click", () => {
        menu.classList.toggle("show");
});

// Call it when page loads
document.addEventListener("DOMContentLoaded", updateDashboardStats);
