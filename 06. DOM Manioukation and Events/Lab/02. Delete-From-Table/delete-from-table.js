function deleteByEmail() {
    const inputEl = document.querySelector('input[name="email"]');
    const searchEl = inputEl.value.toLowerCase();
    const people = document.querySelectorAll('table tbody tr td:nth-child(2)');
    const resultEl = document.querySelector('#result');

    if (searchEl == '') return;


    const [ matchedEl ] = [...people].filter(person =>{
        return person.textContent.toLowerCase().includes(searchEl)});

    if (matchedEl) {
        matchedEl.parentElement.remove();
        resultEl.textContent = 'Deleted.';
    } else {
        resultEl.textContent = 'Not found.'
    }

    inputEl.value = '';
}
