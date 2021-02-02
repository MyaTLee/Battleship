/*
SET player 1 on the gameboard
RANDOMLY SET player 2 (computer)
CLICK on tiles to try and hit player 2
player 2 RANDOMLY PICKS a tile to try and hit player 1

IF player 1 hits player 2 (coding for one hit)
    player 1 wins
IF player 2 hits player 1 (coding for one hit)
    player 2 wins

*/
let battleships = 2;
const perRow = 3; //this chnages the size of the gameboard
const root = document.documentElement; //get me the entire element
root.style.setProperty("--perRow", perRow)

let player1 = [];
let player2 = [];
let gameover = false;

let computerShots = [];

const message = document.getElementById("message");

const setPlayer = document.getElementById("setPlayer");
setPlayer.addEventListener("click", setPlayerOne);

const reset = document.getElementById("reset");
reset.addEventListener("click", resetGame);

function init() {//short for initialize
    const gameboard = document.getElementById("gameboard");
    for (let i = 0; i < perRow ** 2; i++) { // ** means to the power of 
        let tile = document.createElement("div");
        tile.className = `tile tile-${i}`;
        tile.innerText = i; //adds the numbers on the inside of the tile in the html
        gameboard.appendChild(tile);
        // appendChild: adds child element
    }
}

function resetGame() {
    const gameboard = document.getElementById("gameboard");
    gameboard.innerText = "";
    init(); //reinitialize the gameboard
    setPlayer.disabled = false;
    gameover = false;
    computerShots = [];
    message.innerText = "";
}

function setPlayerOne() {
    reset.disabled = true;
    const tiles = document.querySelectorAll(".tile");

    // tiles.forEach(tile => tile.addEventListener("click", pickTile)); //one way to do this

    for (const tile of tiles) {
        tile.addEventListener("click", pickTile);
    }//another way

    alert("Please select a tile for player 1.");
    // https://meet.google.com/linkredirect?authuser=4&dest=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow
}

function pickTile(event) {
    // console.log(event.target);

    let tile = event.target; //lets us know which tile was clicked

    if (confirm("Is this your choice?")) {
        setPlayer.disabled = true;
        // setPlayer.remove(); //this happens after the conditional has occurred  
        
        player1.push(tile); //.push allows you to add things to an array

        tile.classList.add("battleship");
        const tiles = document.querySelectorAll(".tile");

        //pick a randon tile for player 2 (computer)
        player2.push(tiles[getRandomInt(tiles.length)]); //this is dependent upon when you want the computer to chose the tile (before or after Player 1)      
        
        battleships--;

        if (battleships ==0) {
            for (const tile of tiles) {
                //find each tile and remove the pickTile event listener
                tile.removeEventListener("click", pickTile);
                tile.addEventListener("click", play);
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function play(event) {
    if (!gameover) {
        let tile = event.target;
        tile.classList.add("shot");

        //if the tile that we clicked on matches the player 2 tile
        if (player2.includes(tile)) {
            let idx = player2.indexOf(tile);
            player2.splice(idx, 1);
            
            if (player2.length == 0) {
                gameover = true;
                message.innerText = "Player 1 wins!!!";
                tile.classList.add("winPlayer1");
                reset.disabled = false;
            }
            
        } else {
            //get all the tiles
            let tiles = document.querySelectorAll(".tile");
            //converting a NodelIst to an array
            tiles = Array.from(tiles);
            tiles = tiles.filter((tile) => {
                if (!computerShots.includes(tile)) {
                    return tile;
                }
            });

            // console.log(tiles);
            let idx = getRandomInt(tiles.length);
            let shot = tiles[idx];
            computerShots.push(shot);

            // do stuff 

            //remove any tiles from the tiles nodelist that may be in the computershots array

            //loop through the tiles and decide if the computershots array contains this tiles index

            // console.log(idx, player1); //to log out where the shot and player 1 is
            // console.log(computerShots);

        if (player1.includes(shot)) {
            let idx = player1.indexOf(shot);
            player1.splice(idx, 1);

            if (player1.length == 0) {
                gameover = true;
                message.innerText = "Player 2 wins!!!";
                shot.classList.add("winPlayer2");
                reset.disabled = false;
            }
        }
    } 
}
}

init(); //when the js gets loaded, it's going to fire the init function and loop through and create the div and give it a number