function solve(people, type, day) {
    let pricePerPerson;


    switch (type) {
        case 'Students':
            switch (day) {
                case 'Friday': pricePerPerson = 8.45; break;
                case 'Saturday': pricePerPerson = 9.80; break;
                case 'Sunday': pricePerPerson = 10.46; break;
            }
            break;

        case 'Business':
            switch (day) {
                case 'Friday': pricePerPerson = 10.90; break;
                case 'Saturday': pricePerPerson = 15.60; break;
                case 'Sunday': pricePerPerson = 16.00; break;
            }
            break;

        case 'Regular':
            switch (day) {
                case 'Friday': pricePerPerson = 15.00; break;
                case 'Saturday': pricePerPerson = 20.00; break;
                case 'Sunday': pricePerPerson = 22.50; break;
            }
            break;
    }


    let totalPrice = people * pricePerPerson;


    if (type === 'Students' && people >= 30) {
        totalPrice *= 0.85; // 15% discount
    } else if (type === 'Business' && people >= 100) {
        totalPrice -= 10 * pricePerPerson; // 10 people stay free
    } else if (type === 'Regular' && people >= 10 && people <= 20) {
        totalPrice *= 0.95; // 5% discount
    }


    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

