const canvas = document.querySelector(".canvas");

function makeGrid(size) {
    for (let rowCount = 0; rowCount < size; rowCount++) {
        let row = document.createElement("div");
        canvas.appendChild(row).className = "row";
        
        for (let cells = 0; cells < size; cells++) {
            let cell = document.createElement("div");
            row.appendChild(cell).classList = "pixel";
        }
    }
}
