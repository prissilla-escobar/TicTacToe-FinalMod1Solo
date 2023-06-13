// query selectors

var grid = document.querySelector(".playing-box")
var playersTurn  = document.querySelector(".players-turn")
var box = document.getElementsByClassName("box")
var starWinCount = document.querySelector(".star-counter")
var heartWinCount = document.querySelector(".heart-counter")

// data model

var players = [
    {
    id: 1,
    name: "player1",
    wins: 0,
    isTurn: false,
    token: "⭐️",
    boxesOccupied: []
    }, 
    {
    id: 2,
    name: "player2",
    wins: 0,
    isTurn: false,
    token: '💚',
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
    addToken(event)
    addBoxes(event)
    increaseWins()
    updateWins()
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
        } else if (players[i].isTurn === false) {
            players[i].isTurn = true
            playersTurn.innerHTML = `It's ${players[i].token}'s turn!`
        }
    }
}

// function alternatePlayerAfterGame() {
//     for (var i = 0; i < players.length; i++) {
//         if (players[i].isTurn === false) {
//             players[i].isTurn = true
//         } else if (players[i].isTurn === true) {
//             players[i].isTurn = false
//             playersTurn.innerHTML = `It's ${players[i].token}'s turn!`
//         }
//     }
// }

function timeOutAlternatePlayerTurn() {
    alternatePlayerTurn()
    clearBoard()
}

function addToken(event) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].isTurn === true) {
        event.target.closest('div').innerHTML = `${players[i].token}`
        }
    }
    alternatePlayerTurn()
}

function addBoxes(event) {
    var boxOccupied = false
    var occupiedBoxes = []
    for (var i = 0; i < players.length; i++){
        if (event.target.innerHTML === players[i].token) {
            if (!players[i].boxesOccupied.includes(event.target.id)) {
                players[i].boxesOccupied.push(event.target.id)
                occupiedBoxes.push(event.target.id)
                boxOccupied = true
            }
        }
    }
    for (var p = 0; p < occupiedBoxes.length; p++) {
        var boxId = document.getElementById(occupiedBoxes[p]) 
        boxId.classList.add("disabled")
    }
}

function clearBoard() {
    for (var i = 0; i < box.length; i++) {
        box[i].innerHTML = ""
        box[i].classList.remove("disabled")
    }
}

function increaseWins() {
    var isDraw = true
    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < players.length; j++) {
            var numberWins = 0
            for (var p = 0; p < wins[i].length; p++) {
                if (players[j].boxesOccupied.includes(wins[i][p])) {
                    numberWins ++
                }
            }
            if (numberWins === wins[i].length) {
                var isDraw = false
                playersTurn.innerHTML = `${players[j].token} won!`
                players[j].wins ++
                setTimeout(timeOutAlternatePlayerTurn, 5000)
                players[0].boxesOccupied = []
                players[1].boxesOccupied = []
                return
            } 
        }
    }
    if (isDraw === true) {
        for (var k = 0; k < boxes.length; k++) {
            if (!players[0].boxesOccupied.includes(boxes[k]) && !players[1].boxesOccupied.includes(boxes[k])) {
                isDraw = false
                return
            }
        }
    if (isDraw === true) {
        playersTurn.innerHTML = "It's a draw!"
        setTimeout(clearBoard, 5000)
        players[0].boxesOccupied = []
        players[1].boxesOccupied = []
        setTimeout(timeOutAlternatePlayerTurn, 5000)
        }
    }
} 

function updateWins() {
    starWinCount.innerHTML = `${players[0].wins} wins`
    heartWinCount.innerHTML = `${players[1].wins} wins`
}