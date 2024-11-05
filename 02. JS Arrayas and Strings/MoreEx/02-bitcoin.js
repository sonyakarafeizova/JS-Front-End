function solve(goldMinedPerDay) {

    const priceGold = 67.51;
    const priceBitcoin = 11949.16;

    let bitcointCount = 0;
    let bitcoinDayIndex = 0;

    const currencyCount = goldMinedPerDay.reduce(function (earnings, dailyGold, index) {
        const currentDay = index + 1;
        let bitcoinDayCount = 0;

        if (currentDay % 3 === 0) dailyGold -= dailyGold * 0.3;

        earnings += dailyGold * priceGold;
        bitcoinDayCount=Math.floor(earnings/priceBitcoin);

        if( bitcoinDayCount>0){
           if(!bitcoinDayIndex) bitcoinDayIndex=currentDay;
           earnings-=(bitcoinDayCount*priceBitcoin);
           bitcointCount+=bitcoinDayCount;
        }

        return earnings;

    }, 0);

    console.log(`Bought bitcoins: ${bitcointCount}`);
    if(bitcoinDayIndex) console.log(`Day of the first purchased bitcoin: ${bitcoinDayIndex}`);
    console.log(`Left money: ${currencyCount.toFixed(2)} lv.`);
}

solve([100, 200, 300]);