
function solve(input) {

    let n = parseInt(input[0]);
    let farmers = {};
    for (let i = 1; i <= n; i++) {
        let [name, area, tasks] = input[i].split(' ');
        tasks = tasks.split(',');
        farmers[name] = { area, tasks };
    }
    let result = [];

    
    for (let i = n + 1; i < input.length; i++) {
        let command = input[i];
        if (command === "End") break;
        let [action, name, prOne, prTwo] = command.split(' / ');

        if (action === "Execute") {
            let workArea = prOne;
            let task = prTwo;
            if (farmers[name].area === workArea && farmers[name].tasks.includes(task)) {
               result.push(`${name} has executed the task: ${task}!`);
            } 

            else {
                result.push(`${name} cannot execute the task: ${task}.`);
            }

        } else if (action === "Change Area") {
            let newArea = prOne;
            farmers[name].area = newArea;
            result.push(`${name} has changed their work area to: ${newArea}`);
        } 
        else if (action === "Learn Task") {
            let newTask = prOne;

            if (farmers[name].tasks.includes(newTask)) {
                result.push(`${name} already knows how to perform ${newTask}.`);
            } 
            else {
                farmers[name].tasks.push(newTask);
                result.push(`${name} has learned a new task: ${newTask}.`);
            }
        }
    }
    

    for (let [name, data] of Object.entries(farmers)) {
        let tasks = data.tasks.sort().join(', ');
        result.push(`Farmer: ${name}, Area: ${data.area}, Tasks: ${tasks}`);
    }



    console.log(result.join('\n'));
}


// Example Usage
const input1 = [
    "2",
    "John garden watering,weeding",
    "Mary barn feeding,cleaning",
    "Execute / John / garden / watering",
    "Execute / Mary / garden / feeding",
    "Learn Task / John / planting",
    "Execute / John / garden / planting",
    "Change Area / Mary / garden",
    "Execute / Mary / garden / cleaning",
    "End"
];

const input2 = [
    "3",
    "Alex apiary harvesting,honeycomb",
    "Emma barn milking,cleaning",
    "Chris garden planting,weeding",
    "Execute / Alex / apiary / harvesting",
    "Learn Task / Alex / beeswax",
    "Execute / Alex / apiary / beeswax",
    "Change Area / Emma / apiary",
    "Execute / Emma / apiary / milking",
    "Execute / Chris / garden / watering",
    "Learn Task / Chris / pruning",
    "Execute / Chris / garden / pruning",
    "End"
];

solve(input1);
solve(input2);
