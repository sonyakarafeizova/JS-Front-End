function subtract() {
    const input1 = document.querySelector('#firstNumber');
    const input2  =  document.querySelector('#secondNumber');
    const resultEl=document.querySelector('#result');
    const result = Number(input1.value) - Number(input2.value);

   resultEl.textContent=result;

}