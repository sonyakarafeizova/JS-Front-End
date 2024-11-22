function solve() {

   const searchField = document.querySelector('#searchField').value.toLowerCase().trim();
   const students = document.querySelectorAll('tbody tr');

   if (searchField === '') {
      return;
   }

   students.forEach(student => {
      if (student.textContent.toLocaleLowerCase().includes(searchField)) {
         student.classList.add('select')
      }

   });

}

