function solve(array,number){
return array.filter(function(el,index){
    return index%number===0;
});

}