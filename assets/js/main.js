
document.addEventListener("DOMContentLoaded", function () {

    const inputText = document.getElementById("inputText");
    const wordsToRedact = document.getElementById("wordsToRedact");
    const redactButton = document.getElementById("redactButton");
    const redactChar = document.getElementById("redactChar");
    const customChar = document.getElementById("customChar");
    const outputText = document.getElementById("outputText");
    const stats = document.getElementById("stats");

    redactButton.addEventListener("click", () => {
        const text = inputText.value;
        const redactWords = wordsToRedact.value.split(" ");
        const replacementChar = getReplacementChar();

        const redactedText = redactText(text, redactWords, replacementChar);

        outputText.innerText = redactedText;

        // Calculate and display statistics
        displayStatistics(text, redactedText);
    });

    redactChar.addEventListener("change", () => {
        if (redactChar.value === "CUSTOM") {
            customChar.style.display = "inline";
        } else {
            customChar.style.display = "none";
        }
    });

    function redactText(text, redactWords, replacementChar) {
        let redactedText = text;
        redactWords.forEach(word => {
            const regex = new RegExp(word, "gi");
            redactedText = redactedText.replace(regex, replacementChar.repeat(word.length));
        });
        return redactedText;
    }

    function getReplacementChar() {
        const selectedChar = redactChar.value;
        if (selectedChar === "CUSTOM") {
            return customChar.value;
        }
        return selectedChar;
    }

    function displayStatistics(originalText, redactedText) {
        const wordsScanned = originalText.split(/\s+/).length;
        const wordsRedacted = wordsToRedact.value.split(" ").length;
        const charactersRedacted = originalText.length - redactedText.length;

        stats.innerHTML = `
            <p>Words Scanned: ${wordsScanned}</p>
            <p>Words Redacted: ${wordsRedacted}</p>
            <p>Characters Redacted: ${charactersRedacted}</p>
        `;
    }
});
