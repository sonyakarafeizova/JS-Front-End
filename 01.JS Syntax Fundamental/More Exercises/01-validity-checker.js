function solve(x1, y1, x2, y2) {

    function validityChecker(a1, b1, a2, b2) {
        return Number.isInteger(Math.sqrt((a2 - a1) ** 2 + (b2 - b1) ** 2));
    }
        console.log(`{${x1}, ${y1}} to {0, 0} is ${ validityChecker(x1, y1, 0, 0) ? 'valid' : 'invalid'}`);
        console.log(`{${x2}, ${y2}} to {0, 0} is ${ validityChecker(x2, y2, 0, 0) ? 'valid' : 'invalid'}`);
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${ validityChecker(x1, y1, x2, y2) ? 'valid' : 'invalid'}`);

    }

    solve(2, 1, 1, 1);