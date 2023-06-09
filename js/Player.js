class Player {
    constructor(tetris) {
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;

        this.pos = { x: 0, y: 0 };
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    move(dir) {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.pos.x -= dir;
        }
    }

    reset() {
        const pieces = "ILJOTSZ";
        this.matrix = this.createPiece(
            pieces[(pieces.length * Math.random()) | 0]
        );
        this.pos.y = 0;
        this.pos.x =
            ((this.arena.matrix[0].length / 2) | 0) -
            ((this.matrix[0].length / 2) | 0);

        if (this.arena.collide(this)) {
            this.arena.clear();
            this.score = 0;
            updateScore();
        }
    }

    createPiece(type) {
        if (type === "T") {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        } else if (type === "O") {
            return [
                [2, 2],
                [2, 2],
            ];
        } else if (type === "L") {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        } else if (type === "J") {
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        } else if (type === "I") {
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
            ];
        } else if (type === "S") {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if (type === "Z") {
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
        }
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }

    drop() {
        this.pos.y++;
        if (this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            this.reset();
            this.score += this.arena.sweep();
            updateScore();
        }
        this.dropCounter = 0;
    }

    hardDrop() {
        while (!this.arena.collide(this)) {
            this.pos.y++;
        }
        this.pos.y--;
        this.arena.merge(this);
        this.reset();
        this.score += this.arena.sweep();
        updateScore();
    }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix(matrix, dir) {
        // Transpose + reverse = rotate
        // Transpose = swap the values of the rows and columns of the matrix (matrix[y][x] = matrix[x][y])
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }

        if (dir > 0) {
            matrix.forEach((row) => row.reverse());
        } else {
            matrix.reverse();
        }
    }
}
