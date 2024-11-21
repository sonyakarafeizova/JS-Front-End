function solve() {
  const input = document.querySelector('#text').value.toLowerCase().split(' ');
  const namingConvention = document.querySelector('#naming-convention').value.toLowerCase().trim();

  const resultElement = document.querySelector('#result');
  
  function capitaliseWord(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  switch (namingConvention) {
    case 'camel case':
      resultElement.textContent = input[0] + input.slice(1).map(capitaliseWord).join('');
      break;

    case 'pascal case':
      resultElement.textContent = input.map(capitaliseWord).join('');
      break;

    default:
      resultElement.textContent = 'Error!';

  }

}