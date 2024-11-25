function addItem() {
    const input = document.querySelector('#newItemText');
    const listElement = document.querySelector('#items');
    if(input.value=='')return;

    
    const newListItem = document.createElement('li');
    newListItem.textContent = input.value;

    listElement.appendChild(newListItem);
    input.value='';
}
