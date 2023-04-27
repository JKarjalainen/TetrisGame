const CANVAS_SIZE = 600;

let tetris = new Tetris();

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        tetris.player.move(-1);
    } else if (event.keyCode === 39) {
        tetris.player.move(1);
    } else if (event.keyCode === 40) {
        tetris.player.drop();
    } else if (event.keyCode === 81) {
        tetris.player.rotate(-1);
    } else if (event.keyCode === 38) {
        tetris.player.rotate(1);
    } else if (event.keyCode === 32) {
        tetris.player.hardDrop();
    }
});

function updateScore() {
    document.getElementById("score").innerText = tetris.player.score;
}
