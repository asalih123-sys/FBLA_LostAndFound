// ==========================
// Browse Items Page Script
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // ----- DOM Elements -----
    const itemsGrid = document.querySelector(".items-grid");
    const emptyState = document.getElementById("empty-state");
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");
    const filterButtons = document.querySelectorAll(".filter-buttons");

    let allItems = [];        // All items loaded from localStorage
    let currentFilter = "all"; // Current category filter

    // ----- Load items from localStorage -----
    function loadItems() {
        const stored = localStorage.getItem("reportData");
        if (!stored) {
            allItems = [];
        } else {
            try {
                const parsed = JSON.parse(stored);
                allItems = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
                allItems = [];
                console.error("Error parsing stored items:", e);
            }
        }
        renderItems();
    }

    // ----- Render items -----
    function renderItems() {
        itemsGrid.innerHTML = "";

        const searchText = searchInput.value.toLowerCase();

        const filteredItems = allItems.filter(item => {
            const categoryMatch = currentFilter === "all" || item.category === currentFilter;
            const searchMatch =
                item.losttext.toLowerCase().includes(searchText) ||
                item.fname.toLowerCase().includes(searchText) ||
                item.lname.toLowerCase().includes(searchText);
                const statusMatch = item.status === "approved";
            return categoryMatch && searchMatch;
        });

        if (filteredItems.length === 0) {
            emptyState.style.display = "block";
            return;
        } else {
            emptyState.style.display = "none";
        }

        filteredItems.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("item-card");

            // Image
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("item-image-container");

            const img = document.createElement("img");
            img.classList.add("item-image");
            img.src = item.image || "Images/placeholder.png";
            img.alt = item.losttext;

            imgContainer.appendChild(img);

            // Info
            const info = document.createElement("div");
            info.classList.add("item-info");
            info.innerHTML = `
                <h3>${item.losttext}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Lost on:</strong> ${item.datefound}</p>
                <p><strong>Location:</strong> ${item.campus}</p>
                
            `;

            // Claim button
            const claimBtn = document.createElement("button");
            claimBtn.classList.add("claim-button");
            claimBtn.textContent = "Claim Item";
            claimBtn.onclick = () => claimItem(item.losttext);

            // Assemble card
            card.appendChild(imgContainer);
            card.appendChild(info);
            card.appendChild(claimBtn);

            itemsGrid.appendChild(card);
        });
    }

    // ----- Claim function -----
    function claimItem(info) {
        alert("You have claimed the item : " + info);
        window.location.href = "claim.html";
    }

    // ----- Filter function -----
    function filterCategory(category, button) {
        currentFilter = category;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        renderItems();
    }

    // ----- Clear search -----
    function clearSearch() {
        searchInput.value = "";
        renderItems();
    }

    // ----- Event listeners -----
    searchInput.addEventListener("input", renderItems);
    searchBtn.addEventListener("click", renderItems);
    clearBtn.addEventListener("click", clearSearch);

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => filterCategory(btn.dataset.category, btn));
    });

    // ----- Initial load -----
    loadItems();

});


