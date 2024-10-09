const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn
const board = document.getElementById("board")
const winningMessageElemet = document.getElementById("winningMessage")
const winningMessageTextElemet = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById("restartButton")

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

restartButton.addEventListener("click", startGame)

//slect random sign (true or false)
//map cellElements
function startGame(){
    circleTurn = Math.random() < 0.5;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener("click", handleClick, {once: true})
    });
    setBoardHoverClass()
    winningMessageElemet.classList.remove("show")
}


//click on current (e) cell 
//define a class
function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
  
}


function endGame(draw){
    if(draw){
        winningMessageTextElemet.innerHTML = "Draw!"

    }else{
        winningMessageTextElemet.innerHTML =  `${circleTurn ? "O" : "X" } Wins!`
    }
    winningMessageElemet.classList.add("show")

}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

// add curent class to curent cell to place in there sign
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

//swap turns XD
function swapTurns(){
    circleTurn = !circleTurn
}

//current player`s shadow
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}


function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}