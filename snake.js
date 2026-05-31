let board=document.querySelector(".board");
let matrix = [];

//initialize matrix
for(let i=0;i<20;i++){
    let arr=[];
    for(let j=0;j<20;j++){
        arr.push(0);
    }
    matrix.push(arr);
}
console.log(matrix);

//initial head
let aRow=Math.floor(Math.random()*20);
let aCol=Math.floor(Math.random()*20);
matrix[aRow][aCol]=2;

//first apple
let firstApple = document.createElement("div");
firstApple.classList.add("apple");
firstApple.style.gridColumn=aCol+1;
firstApple.style.gridRow=aRow+1;
board.appendChild(firstApple);

//speed
let speed;
function setSpeed(val){
    clearInterval(game);
    speed = val;
    startGame();
}

//validator variables
let direction="right";
let nextDirection = "right";

//validator
document.addEventListener("keydown",(event)=>{
    if(event.key == "w" && direction!="down"){
        nextDirection = "up"
    }else if(event.key == "s" && direction!="up"){
        nextDirection = "down"
    }else if(event.key == "a" && direction!="right"){
        nextDirection = "left"
    }else if(event.key == "d" && direction!="left"){
        nextDirection = "right"
    }
});

let snake=[[10,10]];
let snakeSet = new Set();
snakeSet.add("10-10");

let row = 10;
let col = 10;
let snakeHead = document.querySelector(".head");

let game;

function startGame(){
    game=setInterval(()=>{ 
        direction = nextDirection;
        //moves
        if(direction=="up")row--; 
        if(direction=="down")row++; 
        if(direction=="left")col--; 
        if(direction=="right")col++; 

        //boundary reached
        if(row<1||col<1||row>20||col>20){ 
            document.querySelector("h1").innerText="Game Over!";
            clearInterval(game);
            setTimeout(()=>{
                resetGame();
                document.querySelector("h1").innerText = "Snake Game";
            },1000);
            return;
        }

        let newPos = row + "-" + col;

    // remove tail
    if(matrix[row-1][col-1] != 2){
    let tail = snake.pop();
    snakeSet.delete(tail[0] + "-" + tail[1]);
    }

    // collision
    if(snakeSet.has(newPos)){
        document.querySelector("h1").innerText="Game Over!";
        clearInterval(game);
        setTimeout(()=>{
            resetGame();
            document.querySelector("h1").innerText = "Snake Game";
        },1000);
        return;
    }

    // add new head
    snake.unshift([row,col]);
    snakeSet.add(newPos);

    // apple eaten
    if(matrix[row-1][col-1] == 2){
        matrix[row-1][col-1] = 0;
        document.querySelector(".apple").remove();
        generateApple();
    }

        //update snake
        snakeHead.style.gridRow=row; 
        snakeHead.style.gridColumn=col; 

        document.querySelectorAll(".body").forEach((ele)=>{
            ele.remove();
        });

        for(let i=1;i<snake.length;i++){
            let body=document.createElement("div");
            body.classList.add("body");

            body.style.gridRow=snake[i][0];
            body.style.gridColumn=snake[i][1];
            board.appendChild(body);
        }

        console.log(snake); 
    },speed);
}


// apple generation 
function generateApple(){ 
    let row; 
    let col; 
    do{ 
        row=Math.floor(Math.random()*20); 
        col=Math.floor(Math.random()*20); 
    }while(matrix[row][col]!==0) 
    matrix[row][col]=2; 
    let apple=document.createElement("div"); 
    apple.classList.add("apple"); 
    apple.style.gridRow=row+1; 
    apple.style.gridColumn=col+1; 
    board.appendChild(apple); 
}

//reset
function resetGame(){
    snake = [[10,10]];
    snakeSet.clear();
    snakeSet.add("10-10");
    row = 10;
    col = 10;
    direction = "right";
    nextDirection = "right";
    document.querySelectorAll(".body").forEach((ele)=>{
        ele.remove();
    });
    let oldApple = document.querySelector(".apple");
    if(oldApple){
        oldApple.remove();
    }
    for(let i=0;i<20;i++){
        for(let j=0;j<20;j++){
            matrix[i][j] = 0;
        }
    }
    let appRow = Math.floor(Math.random()*20);
    let appCol = Math.floor(Math.random()*20);

    matrix[appRow][appCol] = 2;

    let apple = document.createElement("div");
    apple.classList.add("apple");
    apple.style.gridRow = appRow + 1;
    apple.style.gridColumn = appCol + 1;
    board.appendChild(apple);

    snakeHead.style.gridRow = 10;
    snakeHead.style.gridColumn = 10;
}