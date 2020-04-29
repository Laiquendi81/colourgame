var numSquares = 6;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.querySelector("#colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  setupModeButtons();
  setupSquares();
  reset();
}

//add functionality of easy/hard mode buttons
function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      //figure out how many squares to show (the below is used instead of an if statement)
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    })
  }
}

//Loop thorugh each square to assign the background colour of each
function setupSquares(){
  for(var i = 0; i < squares.length; i++) {
    //Check whether the square clicked is correct
    squares[i].addEventListener("click", function(){
      var clickedColour = this.style.backgroundColor;
      if(clickedColour === pickedColour) {
        messageDisplay.textContent = "Correct";
        changeColours(clickedColour);
        h1.style.backgroundColor = clickedColour;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    })
  }
}

function reset(){
  //generate all new Colours
  colours = generateRandomColours(numSquares);
  //pick a new random colour from the array
  pickedColour = pickColour();
  //change colourDisplay
  colourDisplay.textContent = pickedColour;
  //change colours of squares
  for(var i = 0; i < squares.length; i++){
    if(colours[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colours[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colours";
}

resetButton.addEventListener("click", function(){
  reset();
})

//function to change all the squares to the same colour
function changeColours(colour) {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colour;
  }
}

//function to select a winning colour from the array
function pickColour() {
  var random = Math.floor(Math.random() * colours.length);
  return colours[random];
}

//function to generate an array of random colourDisplay
function generateRandomColours(num) {
  //create an array to put the colours in
  var arr = [];
  //get random colours and push to array
  for(var i = 0; i < num; i++){
    arr.push(randomColours());
  }
  //return the completed array
  return arr;
}

//function to create the random colours
function randomColours() {
  //pick a red
  var r = Math.floor(Math.random() * 256);
  //pick a green
  var g = Math.floor(Math.random() * 256);
  //pick a blue
  var b = Math.floor(Math.random() * 256);
  //add them together and return the value
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
