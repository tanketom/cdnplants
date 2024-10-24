document.addEventListener('DOMContentLoaded', () => {
    fetch('plants.json')
        .then(response => response.json())
        .then(plants => {
            const plantList = document.getElementById('plant-list');
            plants.forEach(plant => {
                const listItem = document.createElement('li');
                const lastWatered = localStorage.getItem(plant.name) || new Date().toISOString();
                const daysSinceWatered = Math.floor((new Date() - new Date(lastWatered)) / (1000 * 60 * 60 * 24));

                listItem.innerHTML = `
                    <span>${plant.name} - Water every ${plant.waterInterval} days</span>
                    <span>Last watered: ${daysSinceWatered} days ago</span>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${plant.name}&size=50x50" class="qr-code" alt="QR Code">
                    <button onclick="waterPlant('${plant.name}')">I watered ${plant.name}!</button>
                `;
                plantList.appendChild(listItem);
            });
        });
});

function waterPlant(plantName) {
    const now = new Date().toISOString();
    localStorage.setItem(plantName, now);
    location.reload();
}
