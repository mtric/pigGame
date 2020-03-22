/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var playerScores, roundScore, activePlayer, isGamePlaying,
prevFirstDice, prevSecondDice, firstDice, secondDice;

playerScores = [0,0];
roundScore = 0;
activePlayer = 0;
prevFirstDice = 0;
prevSecondDice = 0;

// change style of css element to none (hide the dice)
hideDice()

resetValues();

// anonymous function for roll button
document.querySelector(".btn-roll").addEventListener("click", function(){
    if(isGamePlaying){
        // create random number between 1-6
        firstDice = randomNumber()
        secondDice = randomNumber();
        console.log(firstDice, secondDice);

        // display the result
        displayDice();

        // update the round score IF the rolled number was not 1
        if(firstDice !== 1 && secondDice !== 1){

            if (firstDice === 6 && prevFirstDice === 6 || firstDice === 6 && secondDice === 6
                || secondDice === 6 && prevSecondDice === 6 || secondDice === 6 && prevFirstDice === 6){
                // active player looses entire score
                playerScores[activePlayer] = 0;
                // update the DOM
                document.getElementById("score-"+activePlayer).textContent = "0";
                // change player
                window.setTimeout(changePlayer(), 2000);
            } else {
                // add score to player
                roundScore += firstDice + secondDice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        } else{
            // change player
            window.setTimeout(changePlayer(), 2000);
        }
        prevFirstDice = firstDice;
        prevSecondDice = secondDice;
    }
});

// anonymous function for hold button
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(isGamePlaying){
        // add CURRENT score to players GLOBAL score
        playerScores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById("score-"+activePlayer).textContent = playerScores[activePlayer];

        // read the input field value and set to max score
        var inputMaxScore = document.querySelector(".max-score").value;
        var winningScore;
        // falsy values: Undefined, null, 0 or ""
        if(inputMaxScore){
            winningScore = inputMaxScore;
        } else {
            winningScore = 100;
        }

        // check if player won the game
        if (playerScores[activePlayer] >= winningScore){
            document.getElementById("name-"+activePlayer).textContent = "WINNER!";
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            hideDice();
            isGamePlaying = false;
        } else{
            // change player
            changePlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", resetValues);

document.querySelector(".max-score").addEventListener("oninput", function(evt){
    evt.preventDefault;
    maxScore = document.querySelector("#max-score").value;
    console.log(maxScore);
});

function submitMaxScore(){
    maxScore = document.querySelector("#max-score").value;
    console.log(maxScore);
};

function changePlayer(){
    // next players turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevFirstDice = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // hide the dice
    window.setTimeout(hideDice(), 2000);
}

function resetValues(){
    // change all score values to 0
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("winner");
    activePlayer = 0;
    roundScore = 0;
    playerScores = [0,0];
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");
    document.getElementById("name-0").textContent = "PLAYER 1";
    document.getElementById("name-1").textContent = "PLAYER 2";
    isGamePlaying = true;
    hideDice();

}

function hideDice(){
    document.querySelector("#dice-0").style.display = "none";
    document.querySelector("#dice-1").style.display = "none";
}

function displayDice(){
    var firstDiceDOM = document.querySelector("#dice-0");
    firstDiceDOM.style.display = "block";
    firstDiceDOM.src = "dice-" + firstDice + ".png";
    var secondDiceDOM = document.querySelector("#dice-1");
    secondDiceDOM.style.display = "block";
    secondDiceDOM.src = "dice-" + secondDice + ".png";
}

function randomNumber(){
    return Math.floor(Math.random() * 6) + 1;
}




// TEST CODE
/*
// change plain text in HTML document
document.querySelector("#current-" + activePlayer).textContent = dice;

// example how to change the HTML code
document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

// example how to read values
var test = document.querySelector("#score-1").textContent;
console.log(test);

function btn(){
    // do something here
}
btn();
// btn is our callback function. the event listener calls it for us
document.querySelector(".btn-roll").addEventListener("click", btn);

// add and remove classes from HTML document
document.querySelector(".player-0-panel").classList.remove('active');
        document.querySelector(".player-1-panel").classList.add("active");
*/


