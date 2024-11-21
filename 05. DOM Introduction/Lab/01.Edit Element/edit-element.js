function editElement(element, match,replacer) {
    // TODO
    const originalText=element.textContent;
    const updatedText = originalText.split(match).join(replacer);
    element.textContent=updatedText;
}