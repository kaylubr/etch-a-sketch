const canvas = document.querySelector(".canvas");
const setGridBtn = document.querySelector("#change-btn");
const trashBtn = document.querySelector("#trash-icon");
const colorTools = document.querySelector(".color-container");
let color = "white";

setDefaultGrid();

setGridBtn.addEventListener("click", () => {
    resetGrid();
    promptGridSize();
});


colorTools.addEventListener("click", (event) => {
    event.preventDefault();
    let colorClass = event.target.className;
    let temp = colorClass.split(" ");
    color = temp[0];

    console.log(color);
});

trashBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let pixel = document.querySelectorAll(".pixel");

    pixel.forEach(cell => {
        cell.style.backgroundColor = "white";
    });

})

function makeGrid(size) {
    for (let rowCount = 0; rowCount < size; rowCount++) {
        let row = document.createElement("div");
        canvas.appendChild(row).className = "row";
        
        for (let cells = 0; cells < size; cells++) {
            let cell = document.createElement("div");
            row.appendChild(cell).className = "pixel";
        }
    }
}

//RESETS THE GRID
function resetGrid() {
    let pixel = document.querySelectorAll(".pixel");
    let row = document.querySelectorAll(".row");
    pixel.forEach(cell => {
        cell.remove();
    });

    row.forEach(line => {
        line.remove();
    });
}

//SET THE DEFAULT GRID (16x16)
function setDefaultGrid() {
    makeGrid(16);
}

//PROMPT FOR SETTING THE GRID SIZE
function promptGridSize() {
    let size = prompt("Specify grid size (e.g., 16x16), with dimensions ranging from 1 to 100.");

    if(size < 1 || size > 100) {
        setDefaultGrid();
        return;
    }

    makeGrid(size);
}


