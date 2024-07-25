const canvas = document.querySelector(".canvas");
let row = document.querySelector(".row");
let pixels;
let color = "white";

function setPixels(size) {
    deleteCanvas();
    for (let rowCount = 1; rowCount < size; rowCount++) {
        for (let columnCount = 0; columnCount < size.length; columnCount++) {
            pixels = document.createElement("div");
            pixels.classList.add("pixels");
            row.appendChild(pixels);
        }
        
        row = row.cloneNode(true);
        canvas.appendChild(row);
    }
}

function deleteCanvas() {
    while(canvas.hasChildNodes) {
        while(row.hasChildNodes) {
            row.removeChild(row.firstElementChild);
        }
        canvas.removeChild(canvas.firstElementChild);
    }
}