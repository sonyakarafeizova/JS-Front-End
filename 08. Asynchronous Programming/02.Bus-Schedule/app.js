function solve() {
    let currentStop = {
        id: 'depot',
        name: '',
    };

    const infoBox = document.querySelector('#info .info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop.id}`);
            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            currentStop.name = data.name;
            currentStop.next = data.next;

            infoBox.textContent = `Next stop ${currentStop.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        } catch (error) {
            infoBox.textContent = 'Error';
            departButton.disabled = true;
            arriveButton.disabled = true;
        }
    }

    async function arrive() {
        try {
            infoBox.textContent = `Arriving at ${currentStop.name}`;
            currentStop.id = currentStop.next;
            departButton.disabled = false;
            arriveButton.disabled = true;
        } catch (error) {
            infoBox.textContent = 'Error';
            departButton.disabled = true;
            arriveButton.disabled = true;
        }
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();