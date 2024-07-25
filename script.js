const canvas = document.querySelector(".canvas");
const setGridBtn = document.querySelector("#change-btn");
const trashBtn = document.querySelector("#trash-icon");
const colorTools = document.querySelector(".color-container");
const toolsKit = document.querySelector(".tool-container");
let color = "white";
let tool;

setDefaultGrid();

//listener for the button that sets the grid size
setGridBtn.addEventListener("click", () => {
    resetGrid();
    promptGridSize();
});

toolsKit.addEventListener("click", (event) => {
    event.preventDefault();
    let toolsClass = event.target.className;
    let temp = toolsClass.split(" ");
    let toolUsed = temp[0];

    switch(toolUsed) {
        case "pen":
            tool = "pen";
            break;
        case "eraser":
            tool = "eraser";
            break;  
        case "bucket":
            tool = "bucket";
            break;
        case "darken":
            tool = "darken";
            break;
        case "rainbow":
            tool = "rainbow";
            break;  
        case "line":
            tool = "line";
            break;        
    }
});

//listener for the colors
colorTools.addEventListener("click", (event) => {
    event.preventDefault();
    let colorClass = event.target.className;
    let temp = colorClass.split(" ");
    color = temp[0];

    if (color === "darkbrown") {
        color = "rgb(114, 30, 30)";
    } else if (color === "darkpink") {
        color = "rgb(201, 134, 145)";
    }

    console.log(color);
});

//make the canvas reset to white
trashBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let pixel = getPixels();

    pixel.forEach(cell => {
        cell.style.backgroundColor = "white";
    });

})

//grid for canvas
function makeGrid(size) {
    let uniqueId = 1;
    for (let rowCount = 0; rowCount < size; rowCount++) {
        let row = document.createElement("div");
        canvas.appendChild(row).className = "row";
        
        for (let cells = 0; cells < size; cells++) {
            let cell = document.createElement("div");
            row.appendChild(cell).className = "pixel";
            cell.setAttribute("id", uniqueId);
            uniqueId++;
        }
    }
}

//resets the grid
function resetGrid() {
    let pixel = getPixels();
    let row = document.querySelectorAll(".row");
    pixel.forEach(cell => {
        cell.remove();
    });

    row.forEach(line => {
        line.remove();
    });
}

//setting the default canvas grid into 16x16
function setDefaultGrid() {
    makeGrid(16);
}

//prompt for setting the grid size
function promptGridSize() {
    let size = prompt("Specify grid size (e.g., 16x16), with dimensions ranging from 1 to 100.");

    if(size < 1 || size > 100) {
        setDefaultGrid();
        return;
    }

    makeGrid(size);
}

function getPixels() {
    return document.querySelectorAll(".pixel");
}