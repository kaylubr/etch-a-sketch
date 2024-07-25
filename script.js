const canvas = document.querySelector(".canvas");
const setGridBtn = document.querySelector("#change-btn");

setDefaultGrid();

setGridBtn.addEventListener("click", () => {
    resetGrid();
    promptGridSize();
});

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
    const pixel = document.querySelectorAll(".pixel");
    const row = document.querySelectorAll(".row");
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
