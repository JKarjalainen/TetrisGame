class Tetris {
    constructor() {
        this.canvas = document.getElementById("tetris");
        this.context = this.canvas.getContext("2d");
        this.canvas.height = CANVAS_SIZE;
        this.canvas.width = this.canvas.height / 2;
        this.context.scale(this.canvas.width / 10, this.canvas.height / 20);

        this.arena = new Arena(10, 20);
        this.player = new Player(this);

        this.colors = [
            null,
            "#FF0D72",
            "#0DC2FF",
            "#0DFF72",
            "#F538FF",
            "#FF8E0D",
            "#FFE138",
            "#3877FF",
        ];

        let lastTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);

            this.draw();
            requestAnimationFrame(update);
        };

        update();
    }

    draw() {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }
}
