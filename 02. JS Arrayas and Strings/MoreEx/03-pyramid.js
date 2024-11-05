function calculatePyramidMaterials(base, increment) {
    let stoneRequired = 0;
    let marbleRequired = 0;
    let lapisRequired = 0;
    let goldRequired = 0;
    let height = 0;

    
    let currentBase = base;
    let layer = 1;

    while (currentBase > 2) {
        
        const stoneArea = (currentBase - 2) * (currentBase - 2);
        stoneRequired += stoneArea * increment;

        
        const outerArea = (currentBase * currentBase) - stoneArea;

        if (layer % 5 === 0) {
            
            lapisRequired += outerArea * increment;
        } else {
            // All other layers use marble
            marbleRequired += outerArea * increment;
        }

        // Reduce the base for the next layer
        currentBase -= 2;
        height += increment;
        layer++;
    }

    // The last layer is entirely made of gold
    goldRequired = (currentBase * currentBase) * increment;
    height += increment;  // Add the height of the final gold layer

   
    console.log(`Stone required: ${Math.ceil(stoneRequired)}`);
    console.log(`Marble required: ${Math.ceil(marbleRequired)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapisRequired)}`);
    console.log(`Gold required: ${Math.ceil(goldRequired)}`);
    console.log(`Final pyramid height: ${Math.floor(height)}`);
}

// Example usage
calculatePyramidMaterials(11, 0.75);