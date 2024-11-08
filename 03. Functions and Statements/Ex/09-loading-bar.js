function visualizeLoadingBar(percentage) {
    const barsLength = 10;
    const barsField = Math.floor(percentage / 10);
    const barsEmpty = barsLength - barsField;

    const before = (percentage < 100) ? `${percentage}% ` : '100% Complete!\n';
    const progressBar = `[${'%'.repeat(barsField)}${'.'.repeat(barsEmpty)}]\n`;
    const after = (percentage < 100) ? 'Still loading...' : '';

    console.log(before + progressBar + after);
}
visualizeLoadingBar(30);