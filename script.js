//1.Declare variables to interact with the elements of the page

let order = [];
let playerOrder = [];
let flash;
let turn;
let good;           //if the player is doing well or not
let compTurn;
let intervalId;
let noise = true;
let on = false;     //the power button. The program starts turned off
let win;            //if the player has won the game or not


let topLeft = document.querySelector(".top-left")
let topRight = document.querySelector(".top-right")
let bottomLeft = document.querySelector(".bottom-left")
let bottomRight = document.querySelector(".bottom-right")
let startButton = document.querySelector(".start-btn")
let turnCounter = document.querySelector(".turn-counter")
let onButton = document.querySelector("#power-box")

//2.Add a click event to the on/off box before start the game
onButton.addEventListener("click", (event)=>{
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();               //call function to clear the colors
        clearInterval(intervalId);  //call function to clear the interval
    }
});

startButton.addEventListener("click", (event) =>{
    if (on || win) {                                //if on or win == true, run the play() function
        play();
    }
});

function play() {    //reset the variables; 
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    for (var i = 0; i < 20; i++) {                      //Push 20 random numbers from 1-4 inside the array (The game ends on the 20º round)
        order.push(Math.floor(Math.random() * 4) + 1);  //sort numbers from 1 to 4, that will be pushed inside the array in order 
    }
    
    compTurn = true;                                    //the game starts with the computer flashing lights
    intervalId = setInterval(gameTurn, 800);            //in every 800 milliseconds, will run the gameTurn() function
}

function gameTurn() {
    on = false;                 //while the computer is flashing colors, the player cannot press the color buttons
  
    if (flash == turn) {          //the computer turn is over
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
      on = true;                    //now the player can press the color buttons
    }
  
    if (compTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) one();
        if (order[flash] == 2) two();
        if (order[flash] == 3) three();
        if (order[flash] == 4) four();
        flash++;
      }, 200);
    }
  }

  function one() {
    if (noise) {
      let audio = document.getElementById("clip1");
      audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
  }
  
  function two() {
    if (noise) {
      let audio = document.getElementById("clip2");
      audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
  }
  
  function three() {
    if (noise) {
      let audio = document.getElementById("clip3");
      audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
  }
  
  function four() {
    if (noise) {
      let audio = document.getElementById("clip4");
      audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
  }

  function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
  }
  
  function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
  }

  topLeft.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(1);
      check();
      one();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  topRight.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(2);
      check();
      two();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  bottomLeft.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(3);
      check();
      three();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  bottomRight.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(4);
      check();
      four();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })

  function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      good = false;
  
    if (playerOrder.length == 10 && good) {
      winGame();
    }
  
    if (good == false) {
      flashColor();
      turnCounter.innerHTML = "NO!";
      setTimeout(() => {
        turnCounter.innerHTML = "1";
        clearColor();
      }, 800);
  
      noise = false;
    }
  
    if (turn == playerOrder.length && good && !win) {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalId = setInterval(gameTurn, 800);
    }
  
  }

  function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
  }
  
  