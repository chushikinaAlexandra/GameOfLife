let grid = []
let sizeGrid = 100
let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")
let sizeCanvas = Number(canvas.getAttribute('width'))
let cellSize = sizeCanvas / sizeGrid
let generationsColor = ["#000000"]
let bgColor = '#ffffff'
let speed = 100
let densityGrid = 30
let counterSteps = document.querySelector('.counter-steps')
let counterAliveCells = document.querySelector('.counter-alive-cells')
let isPlay = false

let aliveCells = []

function setGrid(){
    counterSteps.textContent = '0'
    counterAliveCells.innerText = '0'
    for (let i = 0; i < sizeGrid; i++){
        grid[i] = []
        for (let j = 0; j < sizeGrid; j++){
            grid[i][j] = 0
        }
    }
}

function aliveCell(event) {
    if (!grid.length) setGrid()
    let rect = event.target.getBoundingClientRect()
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top; 
    let row = Math.floor(y / cellSize)
    let column = Math.floor(x / cellSize)
    if (grid.length > 0) {
        grid[row][column] = 1
        drawTable()
    }
}

function drawTable() {
    for (var row = 0; row < sizeGrid; row++) {
        for (var column = 0; column < sizeGrid; column++) {
            let cellX = cellSize * column
            let cellY = cellSize * row
            if (grid[row][column] >= 1) {
                context.fillStyle = generationsColor[grid[row][column]-1]
                context.fillRect(cellX, cellY, cellSize, cellSize)
            } else{
                context.fillStyle = bgColor
                context.fillRect(cellX, cellY, cellSize, cellSize)
            }
        }
    }
}
let countNeighbours = []
let q = []
function step(){
    counterSteps.textContent = Number(counterSteps.textContent) + 1
        countNeighbours = getNeighbours()
        for (let i = 0; i < sizeGrid; i++){
            for (let j = 0; j < sizeGrid; j++){
                if (grid[i][j] == 0 && countNeighbours[i][j] == 3){
                    grid[i][j] = 1
                }
                else if (grid[i][j] == 1 && (countNeighbours[i][j] > 3 || countNeighbours[i][j] < 2)){
                    grid[i][j] = 0
                }
            }
        }
    drawTable()
    counterAliveCells.textContent = String(grid).match(/[1-9]+/g).length
}

function getNeighbours(item = 0){
    let countNeighbours = []
    for (let i = 0; i < sizeGrid; i++){
        countNeighbours[i] = []
        for (let j = 0; j < sizeGrid; j++){
            let row = (i == 0) ? sizeGrid : i 
            let row2 = (i == sizeGrid - 1) ? -1 : i 
            let column = (j == 0) ? sizeGrid :  j 
            let column2 = (j == sizeGrid - 1) ? -1 :  j 
            let neighbours = [
                grid[row-1][j],
                grid[row-1][column2+1],
                grid[i][column2+1],
                grid[row2+1][column2+1],
                grid[row2+1][j],
                grid[row2+1][column-1],
                grid[i][column2-1],
                grid[row-1][column-1]
            ]
            countNeighbours[i][j] = neighbours.filter(el => el == 1).length
        }
    }
    return countNeighbours
}

function play() {
    if (!isPlay) {
        isPlay = setInterval(step, speed)
    } else {
        clearInterval(isPlay)
        isPlay = false
    }
}

function generateRandomGrid(){
    counterAliveCells.innerText = '0'
    grid = []
    for (let i = 0; i < sizeGrid; i++){
        grid[i] = []
        for (let j = 0; j < sizeGrid; j++){
            let random = Math.random() * sizeGrid
            if (random > densityGrid) {
                grid[i][j] = 0
            }
            else {
                counterAliveCells.innerText = Number(counterAliveCells.innerText) + 1
                grid[i][j] = 1
                aliveCells.push([i,j])
            }
        }
    }
    drawTable()
}

function setSize(input) {
    sizeGrid = Number(input.value)
    cellSize = sizeCanvas / sizeGrid
}

function resetGrid(){
    play()
    setGrid()
    drawTable()
}

function setSpeed(input){
    speed = Number(input.value)
}

function setDensity(input){
    densityGrid = Number(input.value)
}