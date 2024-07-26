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
            canvas.addEventListener("mouseover", penFunction);
            removeEventsExcept("pen");
            console.log(tool);
            break;
        case "eraser":
            tool = "eraser";
            canvas.addEventListener("mouseover", eraserFunction);
            removeEventsExcept("eraser");
            console.log(tool);
            break;  
        case "bucket":
            tool = "bucket";
            canvas.addEventListener("click", bucketFunction);
            removeEventsExcept("bucket");
            console.log(tool);
            break;
        case "darken":
            tool = "darken";
            setOpacityToZero();
            canvas.addEventListener("mouseover", darkenFunction);
            removeEventsExcept("darken");
            console.log(tool);
            break;
        case "rainbow":
            tool = "rainbow";
            canvas.addEventListener("mouseover", rainbowFunction);
            removeEventsExcept("rainbow");
            console.log(tool);
            break;  
        case "line":
            tool = "line";
            console.log(tool);
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

    if (tool === "darken") setOpacityToZero();

    console.log(color);
});

//make the canvas reset to white
trashBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let pixel = getPixels();

    pixel.forEach(cell => {
        cell.style.backgroundColor = "white";
        cell.style.opacity = "100%";
    });

})

//grid for canvas
function makeGrid(size) {
    let uniqueCount = 1;
    for (let rowCount = 0; rowCount < size; rowCount++) {
        let row = document.createElement("div");
        canvas.appendChild(row).className = "row";
        
        for (let cells = 0; cells < size; cells++) {
            let cell = document.createElement("div");
            row.appendChild(cell).className = "pixel";
            cell.setAttribute("id", uniqueCount.toString());
            uniqueCount++;
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

const penFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = color;
    uniqueId.style.opacity = "100";
}

const eraserFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = "white";
    uniqueId.style.opacity = "100%";
}

const bucketFunction = (e) => {
    let whole = getPixels();
    whole.forEach(pix => {
        pix.style.backgroundColor = color;
        pix.style.opacity = "100%";
    });
}

const rainbowFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

let opacityPercent = 0;
const darkenFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.background = color;

    if (opacityPercent >= 100) {
        opacityPercent = 100;
    }
    uniqueId.style.opacity = `${opacityPercent}%`;
    opacityPercent = opacityPercent + 10;
    console.log(uniqueId);
}

function removeEventsExcept(tool) {
    if (tool === "pen") {
        canvas.removeEventListener("mouseover", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mouseover", rainbowFunction);
        canvas.removeEventListener("mouseover", darkenFunction);
        // canvas.removeEventListener("mouseover", lineFunction);
    }
    else if (tool === "eraser") {
        canvas.removeEventListener("mouseover", penFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mouseover", rainbowFunction);
        canvas.removeEventListener("mouseover", darkenFunction);
        // canvas.removeEventListener("mouseover", lineFunction);
    }
    else if (tool === "bucket") {
        canvas.removeEventListener("mouseover", eraserFunction);
        canvas.removeEventListener("mouseover", penFunction);
        canvas.removeEventListener("mouseover", rainbowFunction);
        canvas.removeEventListener("mouseover", darkenFunction);
        // canvas.removeEventListener("mouseover", lineFunction);
    }
    else if (tool === "rainbow") {
        canvas.removeEventListener("mouseover", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mouseover", penFunction);
        canvas.removeEventListener("mouseover", darkenFunction);
        // canvas.removeEventListener("mouseover", lineFunction);
    }
    else if (tool === "darken") {
        canvas.removeEventListener("mouseover", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mouseover", rainbowFunction);
        canvas.removeEventListener("mouseover", penFunction);
        // canvas.removeEventListener("mouseover", lineFunction);
    }
    else if (tool === "line") {
        canvas.removeEventListener("mouseover", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mouseover", rainbowFunction);
        canvas.removeEventListener("mouseover", darkenFunction);
        canvas.removeEventListener("mouseover", penFunction);
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function setOpacityToZero() {
    opacityPercent = 0;
}

function setOpacityToOne() {
    opacityPercent = 100;
}