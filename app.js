/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, round, activePlayer, playing, lastDice, targetScore, twoDice;
twoDice = false;
init();

// set a value
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// get a value, # is css style
//var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll').addEventListener('click', 
    function() {
        if(playing){

            // rand num
            var dice = Math.floor(Math.random() * 6) + 1;

            // display result
            var diceDOM = document.getElementById('dice-1');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            
            if(twoDice){
                // the second dice
                var dice2 = Math.floor(Math.random() * 6) + 1;
                // display second dice
                var diceDOM = document.getElementById('dice-2');
                diceDOM.style.display = 'block';
                diceDOM.src = 'dice-' + dice2 + '.png';
                if(dice === 1 || dice2 === 1) {
                    // lose current score
                    round = 0;
                    alert("ONE OF THE DICES IS ONE, YOU LOSE YOUR CURRENT POINTS!");
                }
                else if(dice === 6 && dice2 === 6) {
                    // lose all score but remains current score
                    scores[activePlayer] = 0;
                    round += (dice+dice2);
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    alert("LOL, YOU GOT WRECKED BY DOUBLE 6!");
                }
                else{
                    round += (dice+dice2);
                }
                document.querySelector('#current-' + activePlayer).textContent = round;
            }
            else{
                // if rolled two 6 in a roll, set scores to 0;
                if(dice === 6 && lastDice === 6){
                    scores[activePlayer] = 0;
                    alert("LOL, YOU GOT WRECKED BY TWO 6 IN A ROW!")
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    nextPlayer();
                }
                // update the round score if the rolled num is not 1
                else if(dice !== 1){
                    // add score
                    round += dice;
                    document.querySelector('#current-' + activePlayer).textContent = round;
                    //console.log(dice, lastDice);
                    // update lastDice
                    lastDice = dice;
                }
                else{
                    // next player
                    nextPlayer();
                }
            }
        }
    }
);

document.querySelector('.btn-hold').addEventListener('click', 
    function() {
        if(playing){
            // add current to global
            scores[activePlayer] += round;
            // update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            var inputVal = document.querySelector('.score-input').value;
            // undefined, 0 , null, "" are coerced to false
            if(inputVal){
                // do nothing here
            }
            else{
                inputVal = 100;
            }
            //console.log(inputVal);

            // check if player won the game
            if(scores[activePlayer] >= inputVal){
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.getElementById('dice-1').style.display = 'none';
                document.getElementById('dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                playing = false;
            }
            else{
                // next player
                nextPlayer();
            }
        }
    }
);

function nextPlayer() {

    // reset
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    round = 0;
    // when it is next player, set lastDice to 0;
    lastDice = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').src = 'dice-0.png';
    if(twoDice) document.getElementById('dice-2').src = 'dice-0.png';
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    round = 0;
    activePlayer = 0;
    playing = true;
    targetScore = 100;

    //document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').src = 'dice-0.png';
    if(!twoDice){
        document.getElementById('dice-2').style.display = 'none';
    }
    else{
        document.getElementById('dice-2').src = 'dice-0.png';
    }

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-dice1or2').addEventListener('click', 
    function(){
        if(playing){
            twoDice = twoDice ? false : true;
            document.querySelector('.btn-dice1or2').innerHTML = '<i class="ion-link"></i>' + (twoDice ? 'ONE DICE' : 'TWO DICES');
            var diceDOM = document.getElementById('dice-1');
            var diceDOM2 = document.getElementById('dice-2');
            if(twoDice){
                diceDOM.src = 'dice-0.png';
                diceDOM2.style.display = 'block';
                diceDOM2.src = 'dice-0.png';
            }
            else{
                diceDOM2.style.display = 'none';
            }
        }
    }
);