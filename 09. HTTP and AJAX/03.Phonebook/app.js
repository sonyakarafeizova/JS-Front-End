function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const phonebookEl = document.getElementById('phonebook');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

   
    btnLoad.addEventListener('click', () => {
        phonebookEl.innerHTML = '';  

        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                Object.entries(data).forEach(([key, contact]) => {
                   
                    const li = document.createElement('li');
                    li.textContent = `${contact.person}: ${contact.phone}`;
                    
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteContact(key));

                    li.appendChild(deleteButton);
                    phonebookEl.appendChild(li);
                });
            })
            .catch(error => console.error('Error loading phonebook:', error));
    });

    
    btnCreate.addEventListener('click', () => {
        const person = personInput.value;
        const phone = phoneInput.value;

        if (!person || !phone) {
            alert('Both fields are required!');
            return;
        }

        const contact = { person, phone };

        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(() => {
            
            personInput.value = '';
            phoneInput.value = '';
            btnLoad.click();  // Trigger load to refresh the list
        })
        .catch(error => console.error('Error creating contact:', error));
    });

    
    function deleteContact(key) {
        fetch(`${baseUrl}/${key}`, {
            method: 'DELETE',
        })
        .then(() => {
            
            btnLoad.click();
        })
        .catch(error => console.error('Error deleting contact:', error));
    }
}

attachEvents();