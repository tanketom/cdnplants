document.addEventListener('DOMContentLoaded', () => {
    fetch('plants.json')
        .then(response => response.json())
        .then(plants => {
            const plantList = document.getElementById('plant-list');
            plants.forEach(plant => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${plant.name} - Water every ${plant.waterInterval} days</span>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${plant.name}&size=50x50" class="qr-code" alt="QR Code">
                `;
                plantList.appendChild(listItem);
            });
        });
});
