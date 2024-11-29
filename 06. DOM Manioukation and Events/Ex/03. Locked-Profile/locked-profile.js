document.addEventListener('DOMContentLoaded', solve);

function solve() {
   document.querySelector('main').addEventListener('click',(e)=>{
    if(e.target.nodeName !== 'BUTTON') return;

    const profilEl=e.target.closest('.profile');
    const state=profilEl.querySelector('.radio-group input:checked').getAttribute('id');
    if (state.includes('Lock'))return;

const hiddenFieldsEl=profilEl.querySelector('.hidden-fields');

if(hiddenFieldsEl.classList.contains('active')){
    hiddenFieldsEl.classList.remove('active');
    e.target.textContent='Show less'
}else{
    hiddenFieldsEl.classList.add('active');
    e.target.textContent='Show more';
}

})
}