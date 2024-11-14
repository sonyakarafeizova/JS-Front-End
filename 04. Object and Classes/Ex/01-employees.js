function solve(input) {

    const employeeData = {};

    input.forEach(employeeName => {
        const personalNumber = employeeName.length;
        employeeData[employeeName] = personalNumber;
    });

    for (const name in employeeData) {
        console.log(`Name: ${name} -- Personal Number: ${employeeData[name]}`);
    }
}

solve([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
]);