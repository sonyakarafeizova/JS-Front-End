window.addEventListener("load", solve);

function solve() {
  const formElement = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const eventInput = document.getElementById("event");
  const locationInput = document.getElementById("location");
  const nextBtn = document.getElementById("next-btn");

  const previewList = document.getElementById("preview-list");
  const eventList = document.getElementById("event-list");

  function toggleNextBtn() {
    nextBtn.disabled = !(emailInput.value.trim() && eventInput.value.trim() && locationInput.value.trim());
  }

  toggleNextBtn();

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const event = eventInput.value.trim();
    const location = locationInput.value.trim();

    if (!email || !event || !location) return;

    const entry = createEventEntry(email, event, location);
    previewList.appendChild(entry);

    emailInput.value = '';
    eventInput.value = '';
    locationInput.value = '';
    nextBtn.disabled = true;
  });

  function editEventEntry(entry, email, event, location) {
    emailInput.value = email;
    eventInput.value = event;
    locationInput.value = location;

    previewList.removeChild(entry);
    nextBtn.disabled = false;
  }

  function applyEvent(entry) {
    const buttonsDiv = entry.querySelector(".buttons");
    entry.removeChild(buttonsDiv);

    eventList.appendChild(entry);
    nextBtn.disabled = false;
  }

  function createEventEntry(email, event, location) {
    const entry = document.createElement("li");
    entry.classList.add("application");

    const article = document.createElement("article");

    const h4 = document.createElement("h4");
    h4.textContent = email;

    const eventPara = document.createElement("p");
    const eventStrong = document.createElement("strong");
    eventStrong.textContent = "Event:";
    const eventBr = document.createElement("br");
    eventPara.appendChild(eventStrong);
    eventPara.appendChild(eventBr);
    eventPara.appendChild(document.createTextNode(event));

    const locationPara = document.createElement("p");
    const locationStrong = document.createElement("strong");
    locationStrong.textContent = "Location:";
    const locationBr = document.createElement("br");
    locationPara.appendChild(locationStrong);
    locationPara.appendChild(locationBr);
    locationPara.appendChild(document.createTextNode(location));

    article.appendChild(h4);
    article.appendChild(eventPara);
    article.appendChild(locationPara);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const editButton = document.createElement("button");
    editButton.classList.add("action-btn", "edit");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editEventEntry(entry, email, event, location);
    });

    const applyButton = document.createElement("button");
    applyButton.classList.add("action-btn", "apply");
    applyButton.textContent = "Apply";
    applyButton.addEventListener("click", function () {
      applyEvent(entry);
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(applyButton);

    entry.appendChild(article);
    entry.appendChild(buttonsDiv);

    return entry;
  }

  [emailInput, eventInput, locationInput].forEach(input => {
    input.addEventListener("input", toggleNextBtn);
  });
}
