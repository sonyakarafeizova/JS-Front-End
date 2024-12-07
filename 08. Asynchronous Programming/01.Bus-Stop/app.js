function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const stopNameDiv = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    stopNameDiv.textContent = '';
    busesList.innerHTML = '';

    const stopId = stopIdInput.value;
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Stop ID not found');
        }
        return response.json();
    })
    .then(data => {
      
        stopNameDiv.textContent = data.name;

        
        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesList.appendChild(li);
        });
    })
    .catch(error => {
        
        stopNameDiv.textContent = 'Error';
    });
}
