const baseUrl = 'http://localhost:3030/jsonstore/tasks';


const loadMealsBtn = document.getElementById('load-meals');
const addMealBtn = document.getElementById('add-meal');
const editMealBtn = document.getElementById('edit-meal');
const foodInput = document.getElementById('food');
const timeInput = document.getElementById('time');
const caloriesInput = document.getElementById('calories');
const mealsList = document.getElementById('list');


let currentEditId = null;

// Event Listeners
loadMealsBtn.addEventListener('click', loadMeals);
addMealBtn.addEventListener('click', addMeal);
editMealBtn.addEventListener('click', editMeal);

// Load Meals
async function loadMeals() {
  mealsList.innerHTML = ''; // Clear existing meals
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    Object.values(data).forEach((meal) => {
      const mealElement = createMealElement(meal);
      mealsList.appendChild(mealElement);
    });

    // Deactivate Edit Button
    editMealBtn.disabled = true;
  } catch (error) {
    console.error('Error loading meals:', error);
  }
}

// Add Meal
async function addMeal() {
  const meal = {
    food: foodInput.value,
    time: timeInput.value,
    calories: caloriesInput.value,
  };

  try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
    });

    // Clear inputs and reload meals
    clearInputs();
    await loadMeals();
  } catch (error) {
    console.error('Error adding meal:', error);
  }
}

// Edit Meal
async function editMeal() {
  if (!currentEditId) return;

  const updatedMeal = {
    food: foodInput.value,
    time: timeInput.value,
    calories: caloriesInput.value,
  };

  try {
    await fetch(`${baseUrl}/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMeal),
    });

    // Clear inputs and reload meals
    clearInputs();
    currentEditId = null;
    addMealBtn.disabled = false;
    editMealBtn.disabled = true;

    await loadMeals();
  } catch (error) {
    console.error('Error editing meal:', error);
  }
}

// Delete Meal
async function deleteMeal(id) {
  try {
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    await loadMeals();
  } catch (error) {
    console.error('Error deleting meal:', error);
  }
}


function populateInputs(meal) {
  foodInput.value = meal.food;
  timeInput.value = meal.time;
  caloriesInput.value = meal.calories;

  currentEditId = meal._id;
  addMealBtn.disabled = true;
  editMealBtn.disabled = false;
}


function clearInputs() {
  foodInput.value = '';
  timeInput.value = '';
  caloriesInput.value = '';
}


function createMealElement(meal) {
  const mealDiv = document.createElement('div');
  mealDiv.classList.add('meal');

  const foodHeader = document.createElement('h2');
  foodHeader.textContent = meal.food;

  const timeHeader = document.createElement('h3');
  timeHeader.textContent = meal.time;

  const caloriesHeader = document.createElement('h3');
  caloriesHeader.textContent = meal.calories;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'meal-buttons';

  const changeButton = document.createElement('button');
  changeButton.textContent = 'Change';
  changeButton.classList.add('change-meal');
  changeButton.addEventListener('click', () => populateInputs(meal));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-meal');
  deleteButton.addEventListener('click', () => deleteMeal(meal._id));

  buttonsDiv.appendChild(changeButton);
  buttonsDiv.appendChild(deleteButton);

  mealDiv.appendChild(foodHeader);
  mealDiv.appendChild(timeHeader);
  mealDiv.appendChild(caloriesHeader);
  mealDiv.appendChild(buttonsDiv);

  return mealDiv;
}
