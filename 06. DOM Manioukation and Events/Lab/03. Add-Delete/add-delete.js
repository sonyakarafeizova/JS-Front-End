function addItem() {
    function deleteItem(e){
        e.currentTarget.parentElement.remove();
    }
    const inputEl=document.querySelector('#newItemText');
    const listEl=document.querySelector('#items');

    if(inputEl.value=='')return;

    const newListItem=document.createElement('li');
    const deleteButton=document.createElement('a');

    newListItem.textContent=inputEl.value;
    deleteButton.setAttribute('href','#');
    deleteButton.textContent='[Delete]';

    deleteButton.addEventListener('click',deleteItem);

    newListItem.appendChild(deleteButton);
    listEl.appendChild(newListItem);

    inputEl.value='';

}
