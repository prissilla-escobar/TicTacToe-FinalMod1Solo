// query selectors
var grid = document.querySelector(".playing-box")
var playersTurn  = document.querySelector(".players-turn")





// data model

var players = [ {
    id: 1,
    name: "player1",
    wins: 0,
    isTurn: false,
    token: "⭐️",
    class: ".star-emoji",
    boxesOccupied = []
    }, 
    {id: 2,
    name: "player2",
    wins: 0,
    isTurn: false,
    token: '💚',
    class: ".heart-emoji",
    boxesOccupied: []
    }
]

var boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

var wins = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9],
    [box1, box5, box9],
    [box3, box5, box7],
    [box1, box4, box7],
    [box2, box5, box8],
    [box3, box6, box9]
]

// event listeners

window.addEventListener("load", displayTurn)

grid.addEventListener("click", function(event) {

})


// functions

function displayTurn() {
    var randoPlayer = players[randomPlayer(players)]
     playersTurn.innerHTML = `It's ${randoPlayer.token}'s Turn!`
}

function increaseWins() {
    for (var i = 0; i < wins.length; i++) {
    }
    for (var i = 0; i < players.length; i++) {
        if (players.boxesOccupied[j]) {

        }
    }
}

// players[i].wins += 1
// if players[i].wins = 3

function randomPlayer(array) {
    return Math.floor(Math.random() * array.length)
}

function addToken() {

}

// maybe try to do it this way when refactoring
// function createPlayer(player) {
//     return {
//         id: Date.now(),
//         name: player,
//         wins: wins || 0,
//         isTurn: false,
//         class: ".star-emoji"
//     }
// }

// function increaseWins() {
//     if (
// }

// to keep track of the mark:
// he added a data num property and when it was clicked, he parseInt event.target.dataattribute? and pushed
// into player moves so he had an array of player moves
// data-num=0 added to each grid section