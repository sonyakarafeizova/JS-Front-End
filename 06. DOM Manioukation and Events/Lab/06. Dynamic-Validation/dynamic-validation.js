document.addEventListener('DOMContentLoaded', solve);

function solve() {

const emailElement=document.querySelector('#email');
const pattern=/[a-z]+@[a-z]+\.[a-z]+/
emailElement.addEventListener('change',(e)=>{
    if(!pattern.test(e.currentTarget.value)){
       return  e.currentTarget.classList.add('error');
    }

    e.currentTarget.classList.remove('error');
})

}
