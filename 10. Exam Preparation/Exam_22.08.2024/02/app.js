window.addEventListener("load", solve);

function solve() {
  
  const formElement = document.querySelector("form");
  const laptopModelInput = document.getElementById("laptop-model");
  const storageInput = document.getElementById("storage");
  const priceInput = document.getElementById("price");
  const addBtn = document.getElementById("add-btn");
  const clearBtn = document.querySelector(".clear");
  const reviewList = document.getElementById("check-list");
  const laptopList = document.getElementById("laptops-list");

  
  addBtn.addEventListener("click", publish);

  function publish() {
   
    if (!laptopModelInput.value || !storageInput.value || !priceInput.value) {
      return;
    }

    
    const laptopLi = document.createElement("li");
    laptopLi.classList.add("laptop-item");

    const taskArticleElement = document.createElement("article");
    const laptopTitle = laptopModelInput.value;
    const storage = storageInput.value;
    const price = priceInput.value;

    
    const titleHeadingElement = document.createElement("p");
    titleHeadingElement.textContent = laptopTitle;

    const memoryElement = document.createElement("p");
    memoryElement.textContent = `Memory: ${storage} TB`;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${price}$`;

    taskArticleElement.appendChild(titleHeadingElement);
    taskArticleElement.appendChild(memoryElement);
    taskArticleElement.appendChild(priceElement);

    
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "edit");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", edit);

    const postBtn = document.createElement("button");
    postBtn.classList.add("btn", "ok");
    postBtn.textContent = "Ok";
    postBtn.addEventListener("click", post);

   
    laptopLi.appendChild(taskArticleElement);
    laptopLi.appendChild(editBtn);
    laptopLi.appendChild(postBtn);

    
    reviewList.appendChild(laptopLi);

    
    formElement.reset();
    addBtn.disabled = true;

    
    function edit() {
      laptopModelInput.value = laptopTitle;
      storageInput.value = storage;
      priceInput.value = price;

      reviewList.removeChild(laptopLi);
      addBtn.disabled = false;
    }

    
    function post() {
      reviewList.removeChild(laptopLi);
      laptopLi.removeChild(postBtn);
      laptopLi.removeChild(editBtn);
      laptopList.appendChild(laptopLi);
      addBtn.disabled = false;

      
      clearBtn.addEventListener("click", () => location.reload());
    }
  }

 
  [laptopModelInput, storageInput, priceInput].forEach(input =>
    input.addEventListener("input", () => {
      const isFormValid =
        laptopModelInput.value.trim() &&
        storageInput.value.trim() &&
        priceInput.value.trim();
      addBtn.disabled = !isFormValid;
    })
  );
}
