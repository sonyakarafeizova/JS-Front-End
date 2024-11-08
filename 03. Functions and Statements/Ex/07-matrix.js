function matrix(num){
    const result = ((num+' ').repeat(num)+ '\n').repeat(num);

    console.log(result);

}

matrix(9);