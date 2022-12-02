// adding everything associated with p1 and p2 into seperate objects
const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display")
}

const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display")
}


const reset = document.querySelector("#reset");
const playTo = document.querySelector("#playto");

// establishing the winning score default and isGameOver is false
let winningScore = 3;
let isGameOver = false

// generic function that inputs player and opponent to shorten code, not differentiating between p1 and p2 specifically
// incrementing player's score by 1 when button is clicked and tying player display text content to change when button is clicked
// adding isGameOver variable and saying if it's not true then add to the score
// once 1 player gets to winningScore first the scores will stop increment because isGameOver is true
function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score === winningScore) {
           isGameOver = true;
           // using Bulma framework to change colors depending on who wins or loses
           player.display.classList.add("has-text-success");
           opponent.display.classList.add("has-text-danger");
           // disabling the buttons when game is over
           player.button.disabled = true;
           opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}
// adding updateScore function to p1 and p2 buttons, and switching the positions of p1 and p2 so they switch between whose the player and opponent
p1.button.addEventListener("click", function () {
    updateScore(p1, p2);
});
p2.button.addEventListener("click", function () {
    updateScore(p2, p1);
});

// adding event listener for when there is a change with the winning score
// using this refers to this specific opject we are listening for when the playto is changed
playTo.addEventListener("change", function () {
    //parseInt makes a number in a string into a number
    winningScore = parseInt(this.value);
    // using the resetGame function to call for the game to reset once the playto option is reached
    resetGame();
});

// resetting the scores back to zero when reset button is clicked
reset.addEventListener("click", resetGame);

// adding a seperate function for reset and then adding it to the event listener
function resetGame() {
    isGameOver = false;
    // using for loop to loop over both players to reset everything
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        // removing the colors when game is reset
        p.display.classList.remove("has-text-success", "has-text-danger");
        // buttons not disabled when game is reset
        p.button.disabled = false;
    }
}