// ============================
// Admin Dashboard JS
// ============================

// ============================
// Generic Tab Switching
// ============================
function showTab(tabId) {
    // Remove active from all tabs
    document.querySelectorAll('.Tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.Section').forEach(sec => sec.classList.remove('active'));

    // Activate clicked tab
    if(tabId === 'items') document.getElementById('itemsTab').classList.add('active');
    if(tabId === 'approvedItems') document.getElementById('approvedTab').classList.add('active');
    if(tabId === 'rejectedItems') document.getElementById('rejectedTab').classList.add('active');
    if(tabId === 'claims') document.getElementById('claimsTab').classList.add('active');

    // Show corresponding section
    document.getElementById(tabId).classList.add('active');

    // Render data
    if(tabId === 'items') renderPendingItems();
    if(tabId === 'approvedItems') renderApprovedItems();
    if(tabId === 'rejectedItems') renderRejectedItems();
    if(tabId === 'claims') renderPendingClaims();
}

// ============================
// Update Dashboard Stats
// ============================
function updateStats() {
    const items = JSON.parse(localStorage.getItem("reportData")) || [];

    const totalItems = items.length;
    const pendingItems = items.filter(i => i.status === "pending").length;
    const approvedItems = items.filter(i => i.status === "approved").length;
    const rejectedItems = items.filter(i => i.status === "rejected").length;

    document.querySelectorAll(".StatNumber")[0].textContent = totalItems;
    document.querySelectorAll(".StatNumber")[1].textContent = pendingItems;
    document.querySelectorAll(".StatNumber")[2].textContent = approvedItems;
    document.querySelectorAll(".StatNumber")[3].textContent = rejectedItems;
}

// ============================
// Render Pending Items
// ============================
function renderPendingItems() {
    const tableBody = document.querySelector("#items .TableBody");
    tableBody.innerHTML = "";

    const items = JSON.parse(localStorage.getItem("reportData")) || [];
    const pendingItems = items.filter(i => i.status === "pending");

    if(pendingItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No pending items</td></tr>`;
        return;
    }

    pendingItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.losttext}</td>
            <td>${item.category}</td>
            <td>${item.campus}</td>
            <td><img src="${item.image || 'Images/placeholder.png'}" width="60"></td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="reject-btn">Reject</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector(".approve-btn").onclick = () => {
            item.status = "approved";
            localStorage.setItem("reportData", JSON.stringify(items));
            renderPendingItems();
            updateStats();
        };

        row.querySelector(".reject-btn").onclick = () => {
            item.status = "rejected";
            localStorage.setItem("reportData", JSON.stringify(items));
            renderPendingItems();
            updateStats();
        };

        row.querySelector(".delete-btn").onclick = () => {
            if(confirm("Are you sure you want to delete this item?")) {
                items.splice(index, 1);
                localStorage.setItem("reportData", JSON.stringify(items));
                renderPendingItems();
                updateStats();
            }
        };

        tableBody.appendChild(row);
    });
}

// ============================
// Render Approved Items
// ============================
function renderApprovedItems() {
    const tableBody = document.querySelector("#approvedItems .TableBody");
    tableBody.innerHTML = "";

    const items = JSON.parse(localStorage.getItem("reportData")) || [];
    const approvedItems = items.filter(i => i.status === "approved");

    if(approvedItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No approved items</td></tr>`;
        return;
    }

    approvedItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.losttext}</td>
            <td>${item.category}</td>
            <td>${item.campus}</td>
            <td><img src="${item.image || 'Images/placeholder.png'}" width="60"></td>
            <td>
                <button class="reject-btn">Reject</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector(".reject-btn").onclick = () => {
            item.status = "rejected";
            localStorage.setItem("reportData", JSON.stringify(items));
            renderApprovedItems();
            updateStats();
        };

        row.querySelector(".delete-btn").onclick = () => {
            if(confirm("Are you sure you want to delete this item?")) {
                items.splice(items.indexOf(item), 1);
                localStorage.setItem("reportData", JSON.stringify(items));
                renderApprovedItems();
                updateStats();
            }
        };

        tableBody.appendChild(row);
    });
}

// ============================
// Render Rejected Items
// ============================
function renderRejectedItems() {
    const tableBody = document.querySelector("#rejectedItems .TableBody");
    tableBody.innerHTML = "";

    const items = JSON.parse(localStorage.getItem("reportData")) || [];
    const rejectedItems = items.filter(i => i.status === "rejected");

    if(rejectedItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No rejected items</td></tr>`;
        return;
    }

    rejectedItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.losttext}</td>
            <td>${item.category}</td>
            <td>${item.campus}</td>
            <td><img src="${item.image || 'Images/placeholder.png'}" width="60"></td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector(".approve-btn").onclick = () => {
            item.status = "approved";
            localStorage.setItem("reportData", JSON.stringify(items));
            renderRejectedItems();
            updateStats();
        };

        row.querySelector(".delete-btn").onclick = () => {
            if(confirm("Are you sure you want to delete this item?")) {
                items.splice(items.indexOf(item), 1);
                localStorage.setItem("reportData", JSON.stringify(items));
                renderRejectedItems();
                updateStats();
            }
        };

        tableBody.appendChild(row);
    });
}

// ============================
// Render Pending Claims
// ============================
function renderPendingClaims() {
    const tableBody = document.querySelector("#claims .TableBody");
    tableBody.innerHTML = "";

    const claims = JSON.parse(localStorage.getItem("claims")) || [];
    const items = JSON.parse(localStorage.getItem("reportData")) || [];

    const pendingClaims = claims.filter(c => c.status === "pending");

    if(pendingClaims.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No pending claims</td></tr>`;
        return;
    }

    pendingClaims.forEach((claim, index) => {
        const item = items.find(i => i.id === claim.itemId);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item ? item.losttext : "Item deleted"}</td>
            <td>${claim.fname} ${claim.lname}</td>
            <td>${claim.email}</td>
            <td>${claim.phone}</td>
            <td>${claim.message || "-"}</td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="reject-btn">Reject</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        
        row.querySelector(".approve-btn").onclick = () => {
            if (confirm("Are you sure you want to approve this claim? This will remove the item and claim permanently.")) {
                // Remove the claim from claims array
                claims.splice(claims.indexOf(claim), 1);
                localStorage.setItem("claims", JSON.stringify(claims));

                // Remove the associated item from reportData
                const itemIndex = items.findIndex(i => i.id === claim.itemId);
                if (itemIndex !== -1) {
                    items.splice(itemIndex, 1);
                    localStorage.setItem("reportData", JSON.stringify(items));
                }

                // Re-render pending claims and update stats
                renderPendingClaims();
                updateStats();
            }
        };


        row.querySelector(".reject-btn").onclick = () => {
            claim.status = "rejected";
            localStorage.setItem("claims", JSON.stringify(claims));
            renderPendingClaims();
        };

        row.querySelector(".delete-btn").onclick = () => {
            if(confirm("Are you sure you want to delete this claim?")) {
                claims.splice(index, 1);
                localStorage.setItem("claims", JSON.stringify(claims));
                renderPendingClaims();
            }
        };

        tableBody.appendChild(row);
    });
}

// ============================
// Burger Menu
// ============================
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// ============================
// Initialize Dashboard
// ============================
document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    showTab('items'); // default tab
});
