function spiceMustFlow(startingYield) {
    let totalSpice = 0;
    let days = 0;
    
    while (startingYield >= 100) {
        totalSpice += startingYield - 26; 
        startingYield -= 10;
        days++;
    }
    
    totalSpice -= 26; 
    if (totalSpice < 0) totalSpice = 0;
    
    console.log(days);
    console.log(totalSpice);
}

