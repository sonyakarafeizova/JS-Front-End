function solve() {
   const searchText = document.querySelector('#searchText').value.toLowerCase();
      
   const townsList = document.querySelectorAll('#towns li');
    
   const resultDiv = document.querySelector('#result');
   let count=0;
   
   
   if(searchText=='')return;

   townsList.forEach(town => {

      town.classList.remove('match');
      town.style.fontWeight='normal';
      town.style.textContent='none';

       
       if (town.textContent.toLowerCase().includes(searchText)) {
           
           console.log(town.textContent, 'Found');
           town.classList.add('match');
           town.style.fontWeight='bold';
           town.style.textDecoration='underline';
           count++;
       }
   });
   
   resultDiv.textContent = `${count} matches found`;
}