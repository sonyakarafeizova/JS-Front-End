window.addEventListener("load", solve);

function solve() {
  const formElement = document.querySelector("form");
  const timeElement = document.getElementById("time");
  const nameElement = document.getElementById("name");
  const descriptionElement = document.getElementById("description");

  const addButton = document.getElementById("add-btn");
  addButton.addEventListener("click", onAdd);

  function onAdd(e) {
    e.preventDefault();

    
    if (
      timeElement.value == "" ||
      nameElement.value == "" ||
      descriptionElement.value == ""
    ) {
      return;
    }

    const taskList = document.getElementById("preview-list");
    const doneList = document.getElementById("archive-list");

    
    const taskLiElement = document.createElement("li");
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "buttons");
    const taskArticleElement = document.createElement("article");

    
    const ageP = document.createElement("p");
    ageP.textContent = `${timeElement.value}`;
    const name = timeElement.value;

    const petP = document.createElement("p");
    petP.textContent = `${nameElement.value}`;
    const phone = nameElement.value;

    const genderP = document.createElement("p");
    genderP.textContent = `${descriptionElement.value}`;
    const gender = descriptionElement.value;

    
    taskArticleElement.appendChild(petP);
    taskArticleElement.appendChild(ageP);
    taskArticleElement.appendChild(genderP);

    
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn");
    editBtn.addEventListener("click", edit);
    editBtn.textContent = "Edit";

    const doneBtn = document.createElement("button");
    doneBtn.setAttribute("class", "next-btn");
    doneBtn.addEventListener("click", onDone);
    doneBtn.textContent = "Next";
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(doneBtn);

    
    taskLiElement.appendChild(taskArticleElement);
    taskLiElement.appendChild(buttonDiv);

    
    addButton.disabled = true;

   
    taskList.appendChild(taskLiElement);
    formElement.reset();

    
    function edit() {
      timeElement.value = name;
      nameElement.value = phone;
      descriptionElement.value = gender;

      
      taskList.removeChild(taskLiElement);

      
      addButton.disabled = false;
    }

    
    function onDone() {
      const taskDoneLiElement = document.createElement("li");
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "archive-btn");
      deleteBtn.addEventListener("click", onDelete);
      deleteBtn.textContent = "Archive";

      
      taskDoneLiElement.appendChild(taskArticleElement);
      taskDoneLiElement.appendChild(deleteBtn);
      doneList.appendChild(taskDoneLiElement);

      
      taskList.removeChild(taskLiElement);

      
      function onDelete() {
       
        doneList.removeChild(taskDoneLiElement);

        
        addButton.disabled = false;
      }
    }
  }

 
  [nameElement, timeElement, descriptionElement].forEach(input => {
    input.addEventListener("input", function() {
      if (
        nameElement.value.trim() &&
        timeElement.value.trim() &&
        descriptionElement.value.trim()
      ) {
        addButton.disabled = false;
      } else {
        addButton.disabled = true;
      }
    });
  });
}