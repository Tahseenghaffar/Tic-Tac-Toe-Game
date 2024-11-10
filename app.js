console.log("Welcome to Tic Tac Toe");
let backgroundMusic = new Audio("music.mp3");
let gameOverSound = new Audio("gameover.mp3");
let turnSound = new Audio("ting.mp3");
let turn = "X";
let gameOver = false;

// Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let winningCombos = [
        [0, 1, 2, 2, 5 ,0],
        [3, 4, 5, 2, 15, 0],
        [6, 7, 8, 2, 25, 0],
        [0, 3, 6, -8, 15, 90],
        [1, 4, 7, 2, 15, 90],
        [2, 5, 8, 12, 15, 90],
        [0, 4, 8, 2, 15, 45],
        [2, 4, 6, 2, 15, 135]
    ];

    winningCombos.forEach(combo => {
        if ((boxtext[combo[0]].innerText === boxtext[combo[1]].innerText) && 
            (boxtext[combo[2]].innerText === boxtext[combo[1]].innerText) && 
            (boxtext[combo[0]].innerText !== "")) {
                
            document.querySelector(".info").innerText = boxtext[combo[0]].innerText + " Won";
            gameOver = true;
            gameOverSound.play();
            document.querySelector('.imageBox').getElementsByTagName('img')[0].style.width = '200px';
            document.querySelector('.line').style.width = "25vw";
            document.querySelector('.line').style.transform = `translate(${combo[3]}vw, ${combo[4]}vw) rotate(${combo[5]}deg)`
        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) {
            boxtext.innerText = turn;
            turnSound.play();
            checkWin();
            if (!gameOver) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// Optional: Add a reset button to restart the game
document.getElementById("reset").addEventListener("click", () => {
    Array.from(boxes).forEach(element => {
        element.querySelector('.boxtext').innerText = '';
    });
    turn = "X";
    gameOver = false;
    document.querySelector('.line').style.width = "0";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imageBox').getElementsByTagName('img')[0].style.width = '0px'; // Reset the image width
});