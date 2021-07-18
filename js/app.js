TODO:
/*
    - create 16x16 div grid with javascript
    - make MAIN parent container of grid
    - inline-block/flexbox/CSS grid
        - BE CAREFUL margin/padding - can make squares bigger
    - 


*/
`use strict`

const GRIDWIDTH = 600;
const GRIDHEIGHT = 600;

const container = document.querySelector('.container');
container.style.width = GRIDWIDTH + 'px';

const newBtn = document.querySelector('#newBtn');
const colorBtns = document.querySelectorAll('.colorBtn');

let gridItems = []
let gridSize;
let canDraw = false;
let lastPainted;
let drawColor;

askGridSize();
createGrid(gridSize);

function getColor(e){
    drawColor = this.classList[1];
}

function askGridSize(){
    gridSize = Number(window.prompt('How big you want your grid?'));
    
    if(gridSize >= 100){
        do {
            gridSize = Number(window.prompt('Can\'t be more than 100, try again.'));
        } while (gridSize >= 100);
    }
}

function createGrid(gridSize){
    let width = GRIDWIDTH/gridSize;
    let height = GRIDHEIGHT/gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = width + 'px';
            gridItem.style.height = height + 'px';
            gridItem.classList.add(`${i}${j}`);
            gridItems.push(gridItem)
            container.appendChild(gridItem);        
        }
    }

    gridItems.forEach((item) => {
        item.addEventListener('mousedown', mouseDown);
        item.addEventListener('mouseup', mouseUp);
        item.addEventListener('mousemove', draw)
    });

    colorBtns.forEach((btn) => {    
        btn.addEventListener('click', getColor);
    });
}

function mouseDown(e){
    canDraw = true;
}

function mouseUp(e){
    canDraw = false;
}

function draw(e){
    if(canDraw && lastPainted !== this.classList[1]){
        // console.log(this);
        // color
        let color = Math.random() * (360 - 0) + 0;
        // console.log(e);
        if(drawColor && drawColor !== 'rainbow'){
            this.style.backgroundColor = drawColor;
        } else{
            this.style.backgroundColor = `hsl(${color}, 100%, 50%)`;
        }
        
        lastPainted = this.classList[1];
    }
}

function clearAndNewGrid(e){
    gridItems.forEach((item) => {
        container.removeChild(item);
    });

    askGridSize();
    gridItems = [];
    createGrid(gridSize);
}

newBtn.addEventListener('click', clearAndNewGrid);


