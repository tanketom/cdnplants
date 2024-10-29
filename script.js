async function fetchPlants() {
    const response = await fetch('/plants');
    return response.json();
}

function daysSinceLastWatered(date) {
    const lastDate = new Date(`${date.slice(4, 8)}-${date.slice(2, 4)}-${date.slice(0, 2)}`);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getNextWateringDate(plant) {
    const lastWateredDate = new Date(`${plant.date.slice(4, 8)}-${plant.date.slice(2, 4)}-${plant.date.slice(0, 2)}`);
    return new Date(lastWateredDate.getTime() + plant.water_days * 24 * 60 * 60 * 1000);
}

async function renderPlantList() {
    const plants = await fetchPlants();
    const plantList = document.getElementById('plant-list');
    plantList.innerHTML = '';

    plants.sort((a, b) => getNextWateringDate(a) - getNextWateringDate(b));

    plants.forEach(plant => {
        const daysSince = daysSinceLastWatered(plant.date);
        const daysUntilNextWater = plant.water_days - daysSince;

        const plantDiv = document.createElement('div');
        plantDiv.className = 'plant';
        plantDiv.innerHTML = `
            <h2>${plant.name}</h2>
            <p>Water in ${daysUntilNextWater} days</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://yourdomain.com/watered?id=${plant.id}" class="qr-code" alt="QR Code">
        `;
        plantList.appendChild(plantDiv);
    });
}

renderPlantList();
