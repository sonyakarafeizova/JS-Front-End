document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3030/jsonstore/workout'; 

    const loadWorkoutButton = document.getElementById('load-workout');
    const addWorkoutButton = document.getElementById('add-workout');
    const editWorkoutButton = document.getElementById('edit-workout');
    const workoutInput = document.getElementById('workout');
    const locationInput = document.getElementById('location');
    const dateInput = document.getElementById('date');
    const listContainer = document.getElementById('list');
    let currentWorkoutId = null;

    
    loadWorkoutButton.addEventListener('click', () => {
        fetchDataAndRenderWorkouts();
    }); 
    addWorkoutButton.addEventListener('click', () => {
        const workout = workoutInput.value.trim();
        const location = locationInput.value.trim();
        const date = dateInput.value.trim();

        if (!workout || !location || !date) {
            return;
        }

        const newWorkout = { workout, location, date };
        sendRequest('POST', BASE_URL, newWorkout)
            .then(() => {
                fetchDataAndRenderWorkouts();
                clearInputFields();
            })
            .catch(error => console.error('Error adding workout:', error));
    });

    
    editWorkoutButton.addEventListener('click', () => {
        const workout = workoutInput.value.trim();
        const location = locationInput.value.trim();
        const date = dateInput.value.trim();

        if (!workout || !location || !date || currentWorkoutId === null) {
            return;
        }

        const updatedWorkout = { workout, location, date };
        sendRequest('PUT', `${BASE_URL}/${currentWorkoutId}`, updatedWorkout)
            .then(() => {
                fetchDataAndRenderWorkouts();
                clearInputFields();
                setEditMode(false);
            })
            .catch(error => console.error('Error editing workout:', error));
    });

   
    function fetchDataAndRenderWorkouts() {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                const workouts = Object.values(data); 
                listContainer.innerHTML = ''; 
                workouts.forEach(workout => {
                    const workoutDiv = createWorkoutElement(workout);
                    listContainer.appendChild(workoutDiv);
                });
            })
            .catch(error => console.error('Error loading workouts:', error));
    }

  
    function createWorkoutElement(workout) {
        const workoutDiv = document.createElement('div');
        workoutDiv.classList.add('container');
        workoutDiv.innerHTML = `
            <h2>${workout.workout}</h2>
            <h3>${workout.date}</h3>
            <h3 id="location">${workout.location}</h3>
            <div id="buttons-container">
                <button class="change-btn">Change</button>
                <button class="delete-btn">Done</button>
            </div>
        `;

        const changeButton = workoutDiv.querySelector('.change-btn');
        changeButton.addEventListener('click', () => {
            workoutInput.value = workout.workout;
            locationInput.value = workout.location;
            dateInput.value = workout.date;
            currentWorkoutId = workout._id;
            setEditMode(true);
        });

        const deleteButton = workoutDiv.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            sendRequest('DELETE', `${BASE_URL}/${workout._id}`)
                .then(() => fetchDataAndRenderWorkouts())
                .catch(error => console.error('Error deleting workout:', error));
        });

        return workoutDiv;
    }

    
    function clearInputFields() {
        workoutInput.value = '';
        locationInput.value = '';
        dateInput.value = '';
    }

    
    function setEditMode(isEditMode) {
        if (isEditMode) {
            addWorkoutButton.disabled = true;
            editWorkoutButton.disabled = false;
        } else {
            addWorkoutButton.disabled = false;
            editWorkoutButton.disabled = true;
            currentWorkoutId = null;
        }
    }

    async function sendRequest(method, url, data) {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            
        };
        if (method !== 'DELETE') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        return await response.json();
    }

    setEditMode(false);
});
