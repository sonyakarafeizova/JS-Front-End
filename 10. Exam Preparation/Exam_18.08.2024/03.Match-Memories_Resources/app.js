const BASE_URL = 'http://localhost:3030/jsonstore/matches/';
const list = document.getElementById('list');
const hostInput = document.getElementById('host');
const scoreInput = document.getElementById('score');
const guestInput = document.getElementById('guest');
const addMatchBtn = document.getElementById('add-match');
const editMatchBtn = document.getElementById('edit-match');
const loadMatchesBtn = document.getElementById('load-matches');

let currentEditId = null;

window.addEventListener('DOMContentLoaded', () => {
  addMatchBtn.addEventListener('click', addMatch);
  editMatchBtn.addEventListener('click', editMatch);
  loadMatchesBtn.addEventListener('click', loadMatches);

 
  editMatchBtn.disabled = true;
});

async function loadMatches() {
  list.innerHTML = ''; 
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch matches.');
    }

    const data = await response.json();
    Object.values(data).forEach((match) => {
      const matchElement = createMatchElement(match);
      list.appendChild(matchElement);
    });
  } catch (error) {
    alert(`Error loading matches: ${error.message}`);
  }
}

function createMatchElement(match) {
  const matchElement = document.createElement('li');
  matchElement.className = 'match';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.innerHTML = `
    <p>${match.host}</p>
    <p>${match.score}</p>
    <p>${match.guest}</p>
  `;

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'btn-wrapper';

  const changeBtn = document.createElement('button');
  changeBtn.className = 'change-btn';
  changeBtn.textContent = 'Change';
  changeBtn.addEventListener('click', () => loadForEdit(match));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteMatch(match._id));

  btnWrapper.appendChild(changeBtn);
  btnWrapper.appendChild(deleteBtn);

  matchElement.appendChild(infoDiv);
  matchElement.appendChild(btnWrapper);

  return matchElement;
}

async function addMatch() {
  const host = hostInput.value.trim();
  const score = scoreInput.value.trim();
  const guest = guestInput.value.trim();

  if (!host || !score || !guest) {
    alert('All fields are required!');
    return;
  }

  const matchData = { host, score, guest };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData),
    });

    if (!response.ok) {
      throw new Error('Failed to add match.');
    }

    clearForm();
    loadMatches();
  } catch (error) {
    alert(`Error adding match: ${error.message}`);
  }
}

function loadForEdit(match) {
  hostInput.value = match.host;
  scoreInput.value = match.score;
  guestInput.value = match.guest;

  currentEditId = match._id;
  editMatchBtn.disabled = false;
  addMatchBtn.disabled = true;
}

async function editMatch() {
  if (!currentEditId) {
    alert('No match selected for editing.');
    return;
  }

  const host = hostInput.value.trim();
  const score = scoreInput.value.trim();
  const guest = guestInput.value.trim();

  if (!host || !score || !guest) {
    alert('All fields are required!');
    return;
  }

  const matchData = { host, score, guest };

  try {
    const response = await fetch(`${BASE_URL}${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData),
    });

    if (!response.ok) {
      throw new Error('Failed to edit match.');
    }

    clearForm();
    currentEditId = null;
    editMatchBtn.disabled = true;
    addMatchBtn.disabled = false;

    loadMatches();
  } catch (error) {
    alert(`Error editing match: ${error.message}`);
  }
}

async function deleteMatch(matchId) {
  try {
    const response = await fetch(`${BASE_URL}${matchId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete match.');
    }

    loadMatches();
  } catch (error) {
    alert(`Error deleting match: ${error.message}`);
  }
}

function clearForm() {
  hostInput.value = '';
  scoreInput.value = '';
  guestInput.value = '';
}
