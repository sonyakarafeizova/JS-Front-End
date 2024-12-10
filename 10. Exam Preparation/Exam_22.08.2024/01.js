function manageChemicals(input) {
    
    const n = Number(input.shift());
    const chemicals = input.splice(0, n).map(line => {
      const [name, quantity] = line.split(' # ');
      return { name, quantity: Number(quantity), formula: null };
    });
  
    const findChemicalByName = name => chemicals.find(chem => chem.name === name);
    const findChemicalIndexByName = name => chemicals.findIndex(chem => chem.name === name);
  

    const processCommand = command => {
      const parts = command.split(' # ');
      const action = parts[0];
  
      if (action === 'Mix') {
        handleMix(parts[1], parts[2], Number(parts[3]));
      } else if (action === 'Replenish') {
        handleReplenish(parts[1], Number(parts[2]));
      } else if (action === 'Add Formula') {
        handleAddFormula(parts[1], parts[2]);
      }
    };
  
    const handleMix = (chem1, chem2, amount) => {
      const chemical1 = findChemicalByName(chem1);
      const chemical2 = findChemicalByName(chem2);
  
      if (chemical1 && chemical2 && chemical1.quantity >= amount && chemical2.quantity >= amount) {
        chemical1.quantity -= amount;
        chemical2.quantity -= amount;
        console.log(`${chem1} and ${chem2} have been mixed. ${amount} units of each were used.`);
      } else {
        console.log(`Insufficient quantity of ${chem1}/${chem2} to mix.`);
      }
    };
  
    const handleReplenish = (chem, amount) => {
      const chemical = findChemicalByName(chem);
  
      if (chemical) {
        const addedAmount = Math.min(500 - chemical.quantity, amount);
        chemical.quantity += addedAmount;
  
        if (chemical.quantity === 500) {
          console.log(`${chem} quantity increased by ${addedAmount} units, reaching maximum capacity of 500 units!`);
        } else {
          console.log(`${chem} quantity increased by ${addedAmount} units!`);
        }
      } else {
        console.log(`The Chemical ${chem} is not available in the lab.`);
      }
    };
  
    const handleAddFormula = (chem, formula) => {
      const chemical = findChemicalByName(chem);
  
      if (chemical) {
        chemical.formula = formula;
        console.log(`${chem} has been assigned the formula ${formula}.`);
      } else {
        console.log(`The Chemical ${chem} is not available in the lab.`);
      }
    };

    while (input.length > 0) {
      const command = input.shift();
      if (command === 'End') break;
      processCommand(command);
    }
  
    
    chemicals.forEach(({ name, quantity, formula }) => {
      const formulaPart = formula ? `, Formula: ${formula}` : '';
      console.log(`Chemical: ${name}, Quantity: ${quantity}${formulaPart}`);
    });
  }
  
  // Example
  const inputArray = [
    '3',
    'Sodium # 300',
    'Chlorine # 100',
    'Hydrogen # 200',
    'Mix # Sodium # Chlorine # 200',
    'Replenish # Sodium # 250',
    'Add Formula # Sulfuric Acid # H2SO4',
    'Add Formula # Sodium # Na',
    'Mix # Hydrogen # Chlorine # 50',
    'End'
  ];
  
  manageChemicals(inputArray);