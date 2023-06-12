// query selectors
var grid = document.querySelector(".playing-box")
var playersTurn  = document.querySelector(".players-turn")
var box = document.getElementsByClassName("box")



// data model

var players = [ {
    id: 1,
    name: "player1",
    wins: 0,
    isTurn: false,
    token: "⭐️",
    class: ".star-emoji",
    boxesOccupied: []
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

var boxes = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"]

var wins = [
    ['box1', 'box2', 'box3'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9'],
    ['box1', 'box5', 'box9'],
    ['box3', 'box5', 'box7'],
    ['box1', 'box4', 'box7'],
    ['box2', 'box5', 'box8'],
    ['box3', 'box6', 'box9']
]

// event listeners

window.addEventListener("load", displayTurn)
grid.addEventListener("click", function(event) {
    addToken(event);
    addBoxes(event);
    increaseWins();
})


// functions
function randomPlayer(array) {
    return Math.floor(Math.random() * array.length)
}

function displayTurn() {
    var randoPlayer = players[randomPlayer(players)]
     playersTurn.innerHTML = `It's ${randoPlayer.token}'s Turn!`
     for (var i = 0; i < players.length; i ++) {
        if (randoPlayer.token === players[i].token) {
            players[i].isTurn = true
        }
     }
}

function alternatePlayerTurn() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].isTurn === true) {
            players[i].isTurn = false
        } else {
            (players[i].isTurn = true)
        }
    }
}

function addToken(event) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].isTurn === true) {
        event.target.closest('section').innerHTML = `${players[i].token}`
        }
    }
    alternatePlayerTurn()
}

function addBoxes(event) {
    var boxOccupied = false
    for (var i = 0; i < players.length; i++){
        if (event.target.innerHTML === players[i].token) {
            if (!players[i].boxesOccupied.includes(event.target.id)) {
                players[i].boxesOccupied.push(event.target.id)
                boxOccupied = true
            }
            if (boxOccupied = true) {
                event.target.id.setAttribute("disabled", "")
            }
        }
    }
}

function clearBoard() {
    for (var i = 0; i < box.length; i++) {
        box[i].innerHTML = ""
    }
}

function increaseWins() {
    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < players.length; j++) {
            var numberWins = 0
            for (var p = 0; p < wins[i].length; p++) {
                if (players[j].boxesOccupied.includes(wins[i][p])) {
                    numberWins ++
                }
            }
            if (numberWins === wins[i].length) {
                playersTurn.innerHTML = `${players[j].token} won!`
                players[j].wins ++
                setTimeout(clearBoard, 5000)
                players[j].boxesOccupied = []
            }
        }
    }
}

// players[i].wins += 1
// if players[i].wins = 3

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

// to keep track of the mark:
// he added a data num property and when it was clicked, he parseInt event.target.dataattribute? and pushed
// into player moves so he had an array of player moves
// data-num=0 added to each grid section