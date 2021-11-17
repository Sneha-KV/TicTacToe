const $cellElements = document.querySelectorAll('[data-cell]');
const $board = document.getElementById('board');
const $playerMsg = document.querySelectorAll('.player-msg')[0];
const $winSection = document.getElementById('end-game-section');
const $winText = document.querySelector('.winner-text');
const $restart = document.querySelector('.restart');

const X_CLASS = 'x';
const CIRCLE_CLASS='circle';
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let isCircle = false;

const placeMark = (cell) => {
   
    let currentClass = isCircle ? CIRCLE_CLASS : X_CLASS;
    
    cell.classList.add(currentClass); // place mark
}

const setBoardState = () => {
    $board.classList.remove(X_CLASS);
    $board.classList.remove(CIRCLE_CLASS);
    let boardClass = !isCircle ? CIRCLE_CLASS : X_CLASS;
    
    $board.classList.add(boardClass); // set board
    $playerMsg.innerHTML = isCircle ? 'Player X' : 'Player O';
}
// check for winning combination
const checkForWin = () => {
    let currentClass = isCircle ? CIRCLE_CLASS : X_CLASS;
    return WIN_COMBINATIONS.some (combn => {
        return combn.every(index => {
            return $cellElements[index].classList.contains(currentClass);
        })
    });
}

const displayWinner = (isDraw) => {
    if (isDraw) {
        $winText.innerHTML = `It's a Draw, play again!`
    } else {
        $winText.innerHTML = `Player ${isCircle ? 'O' : 'X'} wins!`;
        $winSection.classList.add('win');
    }
    $winSection.classList.add('show');
}

const handleCellClick = (e) => {
    console.log(e);
    placeMark(e.target);
    console.log(checkForWin());
    if(checkForWin()) {
        displayWinner(false);
    } else {
        let xCells = document.querySelectorAll('.cell.x');
        let circleCells = document.querySelectorAll('.cell.circle');
        if(xCells.length + circleCells.length === 9) {
            // or we can check if the cells have x or circle class
            displayWinner(true);
        } else {
            setBoardState();
            isCircle = !isCircle // swap turns
        }
    }
    
}


const startGame  = () => {
    $winSection.classList.remove('show');
    $winSection.classList.remove('win');
    isCircle = false
    $cellElements.forEach( $cell => {
        $cell.classList.remove(X_CLASS);
        $cell.classList.remove(CIRCLE_CLASS);
        $cell.removeEventListener('click', handleCellClick);
        $cell.addEventListener('click', handleCellClick, {once: true});
    })
}


$restart.addEventListener('click', () => {
    startGame();
})

startGame();