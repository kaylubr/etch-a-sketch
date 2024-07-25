const canvas = document.querySelector(".canvas");
let row = document.querySelector(".row");
let pixels;
let color = "white";

function setPixels(size) {

    for (let rows = 1; rows < size; rows++) {
        for (let column = 0; column < size.length; column++) {
            pixels = document.createElement("div");
            pixels.classList.add("pixels");
            row.appendChild(pixels);
        }
        

    }
}