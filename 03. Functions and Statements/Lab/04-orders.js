function solve(product, quantity) {

    const coffee = 1.50;
    const water = 1.00;
    const coke = 1.40;
    const snacks = 2.00;
    let result = 0;

    if (product === "coffee") {
        result = (coffee * quantity).toFixed(2);
    } else if (product === "water") {
        result = (water * quantity).toFixed(2);
    } else if (product === "coke") {
        result = (coke * quantity).toFixed(2);
    } else if (product === "snacks") {
        result = (snacks * quantity).toFixed(2);
    }

    console.log(result);

}
solve("water", 5);
solve("coffee", 2);