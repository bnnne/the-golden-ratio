const digitsContainer = document.getElementById("digits");
const input = document.getElementById("input");
const correctDisplay = document.getElementById("correct");

let currentIndex = 0;

function drawDigits(){

    digitsContainer.innerHTML = "";

    for(let line = 0; line < 10; line++){

        const lineDiv = document.createElement("div");
        lineDiv.className = "line";

        for(let group = 0; group < 5; group++){

            const groupDiv = document.createElement("span");
            groupDiv.className = "group";

            for(let pair = 0; pair < 2; pair++){

                const index = line*10 + group*2 + pair;

                const span = document.createElement("span");
                span.className = "digit";
                span.textContent = phi[index];

                if(index < currentIndex){
                    span.classList.add("correct");
                }

                if(index === currentIndex){
                    span.classList.add("current");
                }

                groupDiv.appendChild(span);

            }

            lineDiv.appendChild(groupDiv);

        }

        digitsContainer.appendChild(lineDiv);

    }

}

drawDigits();

input.focus();

input.addEventListener("input", () => {

    const value = input.value;

    currentIndex = value.length;

    let score = 0;

    for(let i = 0; i < value.length; i++){

        if(value[i] === phi[i]){
            score++;
        }

    }

    correctDisplay.textContent = score;

    drawDigits();

});
