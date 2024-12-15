window.addEventListener("load", solve);

function solve() {
    const formElement = document.querySelector("form");
    const nameElement = document.getElementById("name");
    const phoneElement = document.getElementById("phone");
    const categoryElement = document.getElementById("category");
    const taskList = document.getElementById("check-list");
    const doneList = document.getElementById("contact-list");
    const addButton = document.getElementById("add-btn");

    addButton.addEventListener("click", onAdd);

    function createElement(tag, properties, container) {
        const element = document.createElement(tag);
        Object.keys(properties).forEach(key => {
            if (key === 'events') {
                Object.entries(properties[key]).forEach(([event, handler]) => {
                    element.addEventListener(event, handler);
                });
            } else {
                element[key] = properties[key];
            }
        });
        if (container) container.appendChild(element);
        return element;
    }

    function clearFields() {
        nameElement.value = '';
        phoneElement.value = '';
        categoryElement.value = '';
    }

    function onAdd() {
        const name = nameElement.value.trim();
        const phone = phoneElement.value.trim();
        const category = categoryElement.value.trim();

        if (!name || !phone || !category) return;

        const taskLiElement = createElement("li", {}, taskList);
        const taskArticleElement = createElement("article", {}, taskLiElement);

        createElement("p", { textContent: `name: ${name}` }, taskArticleElement);
        createElement("p", { textContent: `phone: ${phone}` }, taskArticleElement);
        createElement("p", { textContent: `category: ${category}` }, taskArticleElement);

        const buttonDiv = createElement("div", { className: "buttons" }, taskLiElement);

        createElement("button", {
            className: "edit-btn",
            textContent: "Edit",
            events: { click: () => edit(name, phone, category, taskLiElement) }
        }, buttonDiv);

        createElement("button", {
            className: "save-btn",
            textContent: "Save",
            events: { click: () => onDone(taskLiElement, taskArticleElement) }
        }, buttonDiv);

        clearFields();
    }

    function edit(name, phone, category, taskLiElement) {
        nameElement.value = name;
        phoneElement.value = phone;
        categoryElement.value = category;
        taskList.removeChild(taskLiElement);
    }

    function onDone(taskLiElement, taskArticleElement) {
        const taskDoneLiElement = createElement("li", {}, doneList);

        const clonedArticle = taskArticleElement.cloneNode(true);
    taskDoneLiElement.appendChild(clonedArticle);

        createElement("button", {
            className: "del-btn",
            textContent: "Delete",
            events: { click: () => onDelete(taskDoneLiElement) }
        }, taskDoneLiElement);

        taskList.removeChild(taskLiElement);
    }

    function onDelete(taskDoneLiElement) {
        doneList.removeChild(taskDoneLiElement);
    }
}
