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
let gridItems = []
let canDraw = false;
let gridSize = Number(window.prompt('How big you want your grid?'));


createGrid(gridSize);

function createGrid(gridSize){
    console.log(`gridsize je ${gridSize}`);
    let width = GRIDWIDTH/gridSize;
    let height = GRIDHEIGHT/gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = width + 'px';
            gridItem.style.height = height + 'px';
            gridItems.push(gridItem)
            container.appendChild(gridItem);        
        }
    }

    gridItems.forEach((item) => {
        item.addEventListener('mousedown', mouseDown);
        item.addEventListener('mouseup', mouseUp);
        item.addEventListener('mousemove', draw)
    });
}

function mouseDown(e){
    canDraw = true;
}

function mouseUp(e){
    canDraw = false;
}

function draw(e){
    if(canDraw){
        this.style.backgroundColor = 'salmon';
    }
}



function clearAndNewGrid(e){
    gridItems.forEach((item) => {
        container.removeChild(item);
    });

    gridSize = Number(window.prompt('How big you want your grid?'));
    gridItems = [];
    createGrid(gridSize);
}


newBtn.addEventListener('click', clearAndNewGrid);


