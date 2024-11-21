function extractText() {
    // TODO
    document.querySelector("#result").value = [...document.querySelectorAll("ul#items li")].map(node => node.textContent).join("\n");
}