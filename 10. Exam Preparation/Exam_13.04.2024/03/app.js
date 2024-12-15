const BASE_URL = 'http://localhost:3030/jsonstore/games';
const endpoints = {
    update: (id) => `${BASE_URL}/${id}`,
    delete: (id) => `${BASE_URL}/${id}`,
};

const nameElement = document.getElementById("g-name");
const typeElement = document.getElementById("type");
const playersElement = document.getElementById("players");

const gameList = document.getElementById("games-list");

const addBtn = document.getElementById("add-game");
const editBtn = document.getElementById("edit-game");
const loadBtn = document.getElementById("load-games");
const clearBtn = document.querySelector(".clear-btn");

let selectedGameId = null;

function attachEvents() {
    loadBtn.addEventListener('click', loadBoard);
    addBtn.addEventListener('click', createGame);
    editBtn.addEventListener('click', updateGame);
}

async function loadBoard() {
    clearAllSections();
    try {
        const gamesData = await fetch(BASE_URL).then(res => res.json());
        Object.values(gamesData).forEach(renderGame);
        attachActionListeners();
    } catch (err) {
        console.error('Error loading games:', err);
    }
}

function renderGame(game) {
    const container = createElement('div', { className: 'board-game' });

    const content = createElement('div', { className: 'content' });

    createElement('p', { textContent: game.name }, content);
    createElement('p', { textContent: game.type }, content);
    createElement('p', { textContent: game.players }, content);

    const buttonsContainer = createElement('div', { className: 'buttons-container' });

    const changeBtn = createElement('button', { className: 'change-btn', textContent: 'Change' });
    const deleteBtn = createElement('button', { className: 'delete-btn', textContent: 'Delete' });

    buttonsContainer.appendChild(changeBtn);
    buttonsContainer.appendChild(deleteBtn);

    container.appendChild(content);
    container.appendChild(buttonsContainer);

    gameList.appendChild(container);
}

function createElement(tag, properties = {}, parent = null) {
    const element = document.createElement(tag);
    Object.assign(element, properties);
    if (parent) parent.appendChild(element);
    return element;
}

function attachActionListeners() {
    document.querySelectorAll('.change-btn').forEach(button => {
        button.addEventListener('click', handleEditGame);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteGame);
    });
}

async function handleEditGame(event) {
    const gameElement = event.target.closest('.board-game');
    const name = gameElement.querySelector('p').textContent;
    const type = gameElement.querySelector('p:nth-child(2)').textContent;
    const players = gameElement.querySelector('p:nth-child(3)').textContent;

    selectedGameId = await getGameIdByName(name);

    populateFormWithGameData(name, type, players);
    enableEditMode();
}

async function getGameIdByName(name) {
    const gamesData = await fetch(BASE_URL).then(res => res.json());
    return Object.entries(gamesData).find(([_, game]) => game.name === name)[1]._id;
}

function populateFormWithGameData(name, type, players) {
    nameElement.value = name;
    typeElement.value = type;
    playersElement.value = players;
}

function enableEditMode() {
    addBtn.disabled = true;
    editBtn.disabled = false;
}

function enableAddMode() {
    addBtn.disabled = false;
    editBtn.disabled = true;
}

function createGame(event) {
    event.preventDefault();

    if (isFormValid()) {
        const newGame = {
            name: nameElement.value,
            type: typeElement.value,
            players: playersElement.value,
        };

        const headers = {
            method: 'POST',
            body: JSON.stringify(newGame),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(BASE_URL, headers)
            .then(loadBoard)
            .catch(console.error);

        clearForm();
    }
}

function isFormValid() {
    return nameElement.value !== '' && typeElement.value !== '' && playersElement.value !== '';
}

function updateGame(event) {
    event.preventDefault();

    const updatedGame = {
        name: nameElement.value,
        type: typeElement.value,
        players: playersElement.value,
        _id: selectedGameId,
    };

    const headers = {
        method: 'PUT',
        body: JSON.stringify(updatedGame),
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(endpoints.update(selectedGameId), headers)
        .then(() => {
            clearForm();
            loadBoard();
            selectedGameId = null;
            enableAddMode();
        })
        .catch(console.error);
}

function handleDeleteGame(event) {
    const gameElement = event.target.closest('.board-game');
    const name = gameElement.querySelector('p').textContent;

    getGameIdByName(name)
        .then(id => deleteGameById(id))
        .then(() => {
            clearAllSections();
            loadBoard();
            selectedGameId = null;
            enableAddMode();
        })
        .catch(console.error);
}

function deleteGameById(id) {
    return fetch(endpoints.delete(id), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
}

function clearAllSections() {
    gameList.innerHTML = '';
}

function clearForm() {
    nameElement.value = '';
    typeElement.value = '';
    playersElement.value = '';
}

attachEvents();
