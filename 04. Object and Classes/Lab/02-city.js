function processCity(city){
const keys=Object.keys(city);

for(const key of keys){
    console.log(`${key} -> ${city[key]}`);
}

}