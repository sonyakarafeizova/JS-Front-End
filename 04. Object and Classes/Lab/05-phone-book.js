function phoneBook(entries) {
    let book = {};

    for (let entry of entries) {
        let [name, phone] = entry.split(' ');
        book[name] = phone; 
    }

    for (let name in book) {
        console.log(`${name} -> ${book[name]}`);
    }
}