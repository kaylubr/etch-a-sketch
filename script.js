const container = document.querySelector(".container");
const canvas = document.querySelector(".canvas");
const setGridBtn = document.querySelector("#change-btn");
const trashBtn = document.querySelector("#trash-icon");
const colorTools = document.querySelector(".color-container");
const toolsKit = document.querySelector(".tool-container");
const DARKBROWN = "rgb(114, 30, 30)";
const DARKPINK = "rgb(201, 134, 145)";

let opacityPercent = 0;
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
            canvas.addEventListener("mousedown", penFunction);
            removeEventsExcept("pen");
            console.log(tool);
            break;
        case "eraser":
            tool = "eraser";
            canvas.addEventListener("mousedown", eraserFunction);
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
            canvas.addEventListener("mousedown", darkenFunction);
            removeEventsExcept("darken");
            console.log(tool);
            break;
        case "rainbow":
            tool = "rainbow";
            canvas.addEventListener("mousedown", rainbowFunction);
            removeEventsExcept("rainbow");
            console.log(tool);
            break;  
        case "line":
            tool = "line";
            canvas.addEventListener("mousedown", lineFunction);
            removeEventsExcept("line");
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
        color = DARKBROWN;
    } else if (color === "darkpink") {
        color = DARKPINK;
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
    removeEventsExcept(tool);
    resetLine();
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
            cell.setAttribute("draggable", "false");
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
    let size = prompt("Specify grid size (e.g., 16), with dimensions ranging from 1 to 100.");

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
    uniqueId.style.opacity = "100";
    canvas.addEventListener("mouseover", holdWrite);
    canvas.addEventListener("mouseup", releaseWrite);
    container.addEventListener("mouseup", releaseWrite);
}

const eraserFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = "white";
    uniqueId.style.opacity = "100%";
    canvas.addEventListener("mouseover", holdErase);
    canvas.addEventListener("mouseup", releaseErase);
    container.addEventListener("mouseup", releaseErase);
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
    uniqueId.style.opacity = "100";
    canvas.addEventListener("mouseover", holdWriteRainbow);
    canvas.addEventListener("mouseup", releaseWriteRainbow);
    container.addEventListener("mouseup", releaseWriteRainbow)
}

const darkenFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.background = color;

    if (opacityPercent >= 100) {
        opacityPercent = 100;
    }
    uniqueId.style.opacity = `${opacityPercent}%`;
    opacityPercent = opacityPercent + 10;

    canvas.addEventListener("mouseover", holdWriteDarken);
    canvas.addEventListener("mouseup", releaseWriteDarken);
    container.addEventListener("mouseup", releaseWriteDarken);
}

const lineFunction = (e) => {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.classList.add("line-color");

    canvas.addEventListener("mouseover", holdLine);
    canvas.addEventListener("mouseup", releaseLine);
    container.addEventListener("mouseup", releaseLine);
}

function removeEventsExcept(tool) {
    if (tool === "pen") {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }
    else if (tool === "eraser") {
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);

    }
    else if (tool === "bucket") {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }
    else if (tool === "rainbow") {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }
    else if (tool === "darken") {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }
    else if (tool === "line") {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }

    else {
        canvas.removeEventListener("mousedown", eraserFunction);
        canvas.removeEventListener("click", bucketFunction);
        canvas.removeEventListener("mousedown", rainbowFunction);
        canvas.removeEventListener("mousedown", darkenFunction);
        canvas.removeEventListener("mousedown", penFunction);
        canvas.removeEventListener("mousedown", lineFunction);
        canvas.removeEventListener("mouseup", releaseWrite);
        canvas.removeEventListener("mouseup", releaseErase);
        canvas.removeEventListener("mouseup", releaseWriteRainbow);
        canvas.removeEventListener("mouseup", releaseWriteDarken);
        canvas.removeEventListener("mouseup", releaseLine);
        container.removeEventListener("mouseup", releaseWrite);
        container.removeEventListener("mouseup", releaseErase);
        container.removeEventListener("mouseup", releaseWriteRainbow);
        container.removeEventListener("mouseup", releaseWriteDarken);
        container.removeEventListener("mouseup", releaseLine);
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function setOpacityToZero() {
    opacityPercent = 0;
}

// For pen tool
function holdWrite(e) {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = color;
    console.log(uniqueId);
}

function releaseWrite() {
    canvas.removeEventListener("mouseover", holdWrite);
}

// For eraser tool
function holdErase(e) {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = "white";
    console.log(uniqueId);
}

function releaseErase() {
    canvas.removeEventListener("mouseover", holdErase);
}

// For rainbow tool
function holdWriteRainbow(e) {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.backgroundColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

function releaseWriteRainbow() {
    canvas.removeEventListener("mouseover", holdWriteRainbow);
}

// For darken tool
function holdWriteDarken(e) {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.style.background = color;

    if (opacityPercent >= 100) {
        opacityPercent = 100;
    }
    uniqueId.style.opacity = `${opacityPercent}%`;
    opacityPercent = opacityPercent + 10;
}

function releaseWriteDarken() {
    canvas.removeEventListener("mouseover", holdWriteDarken);
}

function holdLine(e) {
    let target = e.target.id;
    let uniqueId = document.getElementById(target);
    uniqueId.classList.add("line-color");
}

function releaseLine(e) {
    let classesToBeColored = document.querySelectorAll(".line-color");
    classesToBeColored.forEach(eachClass => {
        eachClass.style.backgroundColor = color;
    });
    canvas.removeEventListener("mouseover", holdLine);
}

function resetLine(e) {
    let wholeCanvas = getPixels();
    wholeCanvas.forEach(eachPixel => {
        eachPixel.classList.remove("line-color");
    });
}