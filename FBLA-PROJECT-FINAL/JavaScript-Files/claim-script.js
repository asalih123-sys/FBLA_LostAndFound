// ============================
// Claim Page Script
// ============================

// Grab form and dropdown
const claimForm = document.querySelector("form");
const itemSelect = document.getElementById("claimItem");

// ============================
// Load Approved Items into Dropdown
// ============================
function loadClaimItems() {

    let items = JSON.parse(localStorage.getItem("reportData")) || [];

    // Force array if only one object exists
    if (!Array.isArray(items)) {
        items = [items];
    }

    // Only show approved items
    const approvedItems = items.filter(item => item.status === "approved");

    // Clear dropdown
    itemSelect.innerHTML = `<option value="">Select your item...</option>`;

    // Add items to dropdown
    approvedItems.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = `${item.losttext} - ${item.campus} (${item.datefound})`;
        itemSelect.appendChild(option);
    });
}

// ============================
// Submit Claim
// ============================
claimForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const selectedItem = itemSelect.value;

    if (!selectedItem) {
        alert("Please select the item you are claiming.");
        return;
    }

    let claims = JSON.parse(localStorage.getItem("claims")) || [];

    const claimData = {
        id: Date.now().toString(),
        itemId: selectedItem,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("owner-lost").value,
        status: "pending",
        date: new Date().toLocaleString()
    };

    claims.push(claimData);
    localStorage.setItem("claims", JSON.stringify(claims));

    alert("Your claim has been sent for admin review.");
    claimForm.reset();
});

    //Burger Menu
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("show");
});


// ============================
// Load on Page Start
// ============================
document.addEventListener("DOMContentLoaded", loadClaimItems);


// Start of student or staff
function studentClick() {
    document.getElementById("outputArea").textContent = "You are a Student";
    console.log("Student button clicked");
}


function staffClick() {
    document.getElementById("outputArea").textContent = "You are a Staff";
    console.log("Staff button clicked");
}
//end of student or staff


// Start of campus map clickable
let selectedBuilding = '';


function getName(building) {
    selectedBuilding = building;
    console.log(`The item was found in: ${building}`);
    document.getElementById('selectedLocation').innerText = `Selected Location: ${building}`;
}


function getMapImage() {
    var campusSelect = document.getElementById('campus');
    var selectedValue = campusSelect.value;
    var mapHTML = '';
   
    if(selectedValue === 'CC') {
        mapHTML = `<img src="images/update-cc-map.jpg" alt="central campus map" usemap="#CCMap">
                   <map name="CCMap">
                       <area shape="rect" coords="54,52,303,160" alt="Building A" onclick="getName('Building A'); return false;">
                       <area shape="rect" coords="319,45,456,183" alt="Building B" onclick="getName('Building B'); return false;">
                       <area shape="rect" coords="269,189,397,331" alt="Building C" onclick="getName('Building C'); return false;">
                       <area shape="rect" coords="33,170,263,330" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                   </map>`;    
    }
    else if(selectedValue === 'NEC') {
        mapHTML = `<img src="images/Northeast-Map.jpg" alt="North East Map" usemap="#NECMap">
                   <map name="NECMap">
                       <area shape="rect" coords="335,14,447,185" alt="Building A" onclick="getName('Building A'); return false;">
                       <area shape="rect" coords="400,192,447,289" alt="Building B" onclick="getName('Building B'); return false;">
                       <area shape="rect" coords="335,192,394,289" alt="Building C" onclick="getName('Building C'); return false;">
                       <area shape="rect" coords="266,297,447,368" alt="Building D" onclick="getName('Building D'); return false;">
                       <area shape="rect" coords="266,14,330,287" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                   </map>`;
    }
    else if(selectedValue === 'NWC') {
        mapHTML = `<img src="images/Northwest-Campus-Map.jpg" alt="North West Map" usemap="#NWCMap">
                   <map name="NWCMap">
                       <area shape="rect" coords="328,43,422,92" alt="Building A" onclick="getName('Building A'); return false;">
                       <area shape="rect" coords="445,45,511,93" alt="Building B" onclick="getName('Building B'); return false;">
                       <area shape="rect" coords="320,100,353,119" alt="Building C" onclick="getName('Building C'); return false;">
                       <area shape="rect" coords="258,42,307,84" alt="Building D" onclick="getName('Building D'); return false;">
                       <area shape="rect" coords="205,40,247,83" alt="Building E" onclick="getName('Building E'); return false;">
                       <area shape="rect" coords="123,41,195,85" alt="Building F" onclick="getName('Building F'); return false;">
                       <area shape="rect" coords="99,92,315,121" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                       <area shape="rect" coords="359,100,589,122" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                   </map>`;
    }
    else if(selectedValue === 'SWC') {
        mapHTML = `<img src="images/Southwest-Campus-Map.jpg" alt="South west Map" usemap="#SWCMap">
                   <map name="SWCMap">
                       <area shape="rect" coords="261,94,293,137" alt="Building A" onclick="getName('Building A'); return false;">
                       <area shape="rect" coords="147,98,255,152" alt="Building B" onclick="getName('Building B'); return false;">
                       <area shape="rect" coords="147,159,257,211" alt="Building C" onclick="getName('Building C'); return false;">
                       <area shape="rect" coords="265,147,324,223" alt="Building D" onclick="getName('Building D'); return false;">
                       <area shape="rect" coords="147,219,257,267" alt="Building E" onclick="getName('Building E'); return false;">
                       <area shape="rect" coords="179,273,252,306" alt="Building F" onclick="getName('Building F'); return false;">
                       <area shape="rect" coords="258,276,326,306" alt="Building G" onclick="getName('Building G'); return false;">
                       <area shape="rect" coords="262,37,295,87" alt="Building X" onclick="getName('Building X'); return false;">
                       <area shape="rect" coords="149,38,256,90" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                       <area shape="rect" coords="266,231,323,267" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                       <area shape="rect" coords="14,276,172,306" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                       <area shape="rect" coords="14,312,304,361" alt="Parking Lot" onclick="getName('Parking Lot'); return false;">
                   </map>`;
    }
   
    document.getElementById('showMap').innerHTML = mapHTML;
    return false;
}
// End of campus map clickable

