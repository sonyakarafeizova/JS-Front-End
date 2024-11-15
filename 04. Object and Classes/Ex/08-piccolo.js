function piccolo(input) {
    const parkingLot = new Set();


    input.forEach(entry => {
        const [direction, carNumber] = entry.split(', ');
        if (direction === 'IN') {
            parkingLot.add(carNumber);
        } else if (direction === 'OUT') {
            parkingLot.delete(carNumber);
        }
    });


    if (parkingLot.size === 0) {
        console.log("Parking Lot is Empty");
    } else {
        Array.from(parkingLot)
            .sort()
            .forEach(car => console.log(car));
    }
}