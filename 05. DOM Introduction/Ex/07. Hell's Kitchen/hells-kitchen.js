function solve() {
    const input = document.querySelector('#inputs textarea').value;
    const outputBestRestaurantEl = document.querySelector('#outputs #bestRestaurant p');
    const outputBestWorker = document.querySelector('#outputs #workers p');

    if (!input) return;

    const restaurants = JSON.parse(input).reduce((acc, entry) => {
        const [name, workersInfo] = entry.split(' - ');
        const workers = workersInfo.split(', ').map(workerInfo => {
            const [name, salary] = workerInfo.split(' ');
            return { name, salary: Number(salary) };
        });

        if (!acc.hasOwnProperty(name)) {
            acc[name] = {
                workers: [],
            };
        }

        acc[name].workers.push(...workers);
        return acc;
    }, {});

    function getAverageSalary(restaurantData) {
        const allSalaries = restaurantData.workers.reduce((sum, worker) => sum + worker.salary, 0);
        return allSalaries / restaurantData.workers.length;
    }

    const [bestRestKey] = Object.keys(restaurants).sort((a, b) => 
        getAverageSalary(restaurants[b]) - getAverageSalary(restaurants[a])
    );

    const bestWorkers = restaurants[bestRestKey].workers.sort((a, b) => b.salary - a.salary);

    outputBestRestaurantEl.textContent = 
        `Name: ${bestRestKey} Average Salary: ${getAverageSalary(restaurants[bestRestKey]).toFixed(2)} Best Salary: ${bestWorkers[0].salary.toFixed(2)}`;
    
    outputBestWorker.textContent = bestWorkers
        .map(worker => `Name: ${worker.name} With Salary: ${worker.salary}`)
        .join(' ');
}
