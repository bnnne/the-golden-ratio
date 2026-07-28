const digitsDiv = document.getElementById("digits");
const input = document.getElementById("input");
const scoreValue = document.getElementById("scoreValue");

let score = 0;

function render() {

    digitsDiv.innerHTML = "";

    for (let row = 0; row < 10; row++) {

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let col = 0; col < 10; col++) {

            const index = row * 10 + col;

            const cell = document.createElement("div");
            cell.className = "cell";

            if (index === score) {
                cell.classList.add("current");
            }

            const number = document.createElement("div");
            number.className = "number";

            if (index < score) {
                number.textContent = PHI[index];
            } else {
                number.textContent = "";
            }

            const underline = document.createElement("div");
            underline.className = "underline";

            if (index === score) {
                underline.textContent = "_";
            }

            cell.appendChild(number);
            cell.appendChild(underline);

            rowDiv.appendChild(cell);
        }

        digitsDiv.appendChild(rowDiv);
    }

    scoreValue.textContent = score;
}

render();

input.addEventListener("input", () => {

    const value = input.value;

    if (value.length === 0)
        return;

    if (value === PHI[score]) {

        score++;

        render();

        if (score === PHI.length) {

            alert("Congratulations! You memorized all 100 digits!");

            input.disabled = true;
        }
    }

    input.value = "";
});
