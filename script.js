let plants = [
    {
        name: "Fern",
        waterInterval: 3, // days
        lastWatered: null
    },
    {
        name: "Cactus",
        waterInterval: 14, // days
        lastWatered: null
    },
    {
        name: "Bamboo",
        waterInterval: 7, // days
        lastWatered: null
    }
];

function updatePlantStatus(index) {
    let currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    plants[index].lastWatered = currentDate;
    document.getElementById(`status-${index}`).innerText = `Last watered: ${currentDate}`;
    console.log(`Plant ${plants[index].name} status updated:`, plants[index]);
}

function renderPlants() {
    const container = document.getElementById("plantsContainer");
    plants.forEach((plant, index) => {
        const plantDiv = document.createElement("div");
        plantDiv.className = "plant";
        plantDiv.innerHTML = `
            <h2>${plant.name}</h2>
            <p>Water every ${plant.waterInterval} days</p>
            <p id="status-${index}">Last watered: ${plant.lastWatered ? plant.lastWatered : "Not yet watered"}</p>
            <button onclick="updatePlantStatus(${index})">I watered</button>
        `;
        container.appendChild(plantDiv);
    });
}

document.addEventListener("DOMContentLoaded", renderPlants);
