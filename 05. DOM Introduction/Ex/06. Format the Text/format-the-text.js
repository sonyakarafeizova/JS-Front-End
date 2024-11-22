function solve() {

  const inputElement = document.querySelector('#input');
  const outputEleemtn = document.querySelector('#output');
  const sentences = inputElement.value.split('. ');

  const sentancePerPar = 3;
  const numberParagr = Math.ceil(sentences.length / sentancePerPar);
  let output = '';
  for (let i = 0; i < numberParagr; i++) {
    const position = i * numberParagr;
    output += '<p>';
    output += sentences.slice(position, (position + sentancePerPar)).join('. ');
    output += '</p>';
  }
  outputEleemtn.innerHTML = output;
}