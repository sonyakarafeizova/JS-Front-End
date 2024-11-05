function solve(numbers){

   let evenSUm=0;
   let oddSUm=0;
   numbers.forEach(function(number) {
    if(number %2===0){
        evenSUm+=number;
    }else{
        oddSUm+=number;
    }
    
   })
   console.log(evenSUm-oddSUm);

}

