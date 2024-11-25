document.addEventListener('DOMContentLoaded', solve);

function solve() {
   const addButtons = document.querySelectorAll('.add-product');
   const checkoutButton = document.querySelector('.checkout');
   const textarea = document.querySelector('textarea');
   let cart = [];
   let totalPrice = 0;

   
   addButtons.forEach((button) => {
       button.addEventListener('click', (e) => {
           const productElement = e.target.closest('.product');
           const productName = productElement.querySelector('.product-title').textContent.trim();
           const productPrice = parseFloat(productElement.querySelector('.product-line-price').textContent.trim());

           
           cart.push({ name: productName, price: productPrice });
           totalPrice += productPrice;

          
           textarea.value += `Added ${productName} for ${productPrice.toFixed(2)} to the cart.\n`;
       });
   });

   
   checkoutButton.addEventListener('click', () => {
       
       const uniqueProducts = Array.from(new Set(cart.map((item) => item.name))).join(', ');

       
       textarea.value += `You bought ${uniqueProducts} for ${totalPrice.toFixed(2)}.\n`;

       
       addButtons.forEach((button) => (button.disabled = true));
       checkoutButton.disabled = true;
   });
}
