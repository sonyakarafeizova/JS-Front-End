document.addEventListener('DOMContentLoaded', solve);

function solve() {
   const form = document.querySelector('#task-input');
   const contentDiv = document.querySelector('#content');

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const sections=form.querySelector('input[type="text"').value.split(', ')
      console.log(sections);

      sections.forEach(el=>{
         const newDivEl=document.createElement('div');
         const newPEl=document.createElement('p');

         newPEl.textContent=el;
         newPEl.style.display='none';

         newDivEl.append(newPEl);
         newDivEl.addEventListener('click',(e)=>{
            e.target.querySelector('p').style.display='block';
         });
         contentDiv.append(newDivEl);
      });

      
 });
}




