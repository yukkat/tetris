function Figure() {
    this.startx = parseInt(cagesInWidth / 2) + 1;// always centered
    this.starty = 1;
    this.initializeFigure = function () {
        var cubes = document.querySelectorAll('[active]');
        var cubesLength = cubes.length;
        for (i = 0; i < cubesLength; i++) {
            cubes.item(i).removeAttribute('class');
            cubes.item(i).removeAttribute('active');
        }
        for (i = 0; i < 4; i++) {
            var cage = document.getElementById('x' + this.coords[i].x + 'y' + this.coords[i].y);
            cage.className = this.name;
            cage.setAttribute('active', '');
        }
    };
    this.stepLeft = function () {
        var canMove = this.coords.every(function (el) {
            var nextCage = document.getElementById('x' + (el.x - 1) + 'y' + el.y);

            return nextCage && !nextCage.hasAttribute('marked');
        });

        if (canMove) {
            this.coords.forEach(function (el) {
                    --el.x
                }
            );
            this.initializeFigure();
        }
    };
    this.stepRight = function () {
        var canMove = this.coords.every(function (el) {
            var nextCage = document.getElementById('x' + (el.x + 1) + 'y' + el.y);
            return nextCage && !nextCage.hasAttribute('marked');
        });

        if (canMove) {
            this.coords.forEach(function (el) {
                    ++el.x
                }
            );
            this.initializeFigure();
        }
    };
    this.stepDown = function () {
        var canMove = this.coords.every(function (el) {
            var nextCage = document.getElementById('x' + el.x + 'y' + (el.y + 1));
            return nextCage && !nextCage.hasAttribute('marked');
        });

        if (canMove) {
            this.coords.forEach(function (el) {
                    ++el.y
                }
            );
            this.initializeFigure();
        } else {
            var endIsReached = this.coords.every(function (el) {
                var nextCage = document.getElementById('x' + el.x + 'y' + (el.y + 1));
                return el.y <= cagesInHeight || !nextCage.hasAttribute('marked')
            });
            if (endIsReached) {
                game.lineDestroy();
            }
        }

    };
    this.fastMoveDown = function () {
        clearInterval(fastMoveInterval);
        fastMoveInterval = setInterval(function () {
            figure.stepDown();
        }, 50);

    };
    this.rotate = function () {
        var rotatePointx = this.coords[2].x;
        var rotatePointy = this.coords[2].y;

        this.coords.forEach(function (el) {
            var a = rotatePointx - el.x, b = rotatePointy - el.y;
            el.x = rotatePointx - b;
            el.y = rotatePointy + a;
        });
        this.initializeFigure();
    }
}