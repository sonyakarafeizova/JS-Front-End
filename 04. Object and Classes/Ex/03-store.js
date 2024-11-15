function solve(stock, order) {
    const storage = {}

    for (let i = 0; i < stock.length; i += 2) {
        storage[stock[i]] = Number(stock[i + 1])
    }
    for (let i = 0; i < order.length; i += 2) {
        if (!storage.hasOwnProperty(order[i])) storage[order[i]] = 0;

        storage[order[i]] += Number(order[i + 1]);
    }

    for (const product in storage) {
        console.log(`${product} -> ${storage[product]}`);
    }
}
