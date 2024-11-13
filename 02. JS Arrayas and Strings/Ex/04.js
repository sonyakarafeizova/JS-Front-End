function specialSort(arr) {
    
    arr.sort((a, b) => a - b);

    const result = [];
    while (arr.length) {
        
        if (arr.length) result.push(arr.shift()); // smallest
        if (arr.length) result.push(arr.pop());   // largest
    }
    return result;
}

// Example
console.log(specialSort([1, 65, 3, 52, 48, 63, 31, -3, 18, 56])); 