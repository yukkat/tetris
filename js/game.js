var game = {
    figureTypes: [Cube, Stick, Stair, StairReverse, Pyramid, Axe, AxeReverse],
    reload: function () {
        var reload = confirm('Игра закончена! Хотите перезапустить?');
        if (reload) {
            location.reload()
        } else {
            clearInterval(movingInterval)
        }
    },
    getRandomType: function () {
        return parseInt(Math.random() * 7);
    },
    createFigure: function () {
        var cubes = document.querySelectorAll('[active]');
        var cubesLength = cubes.length;
        for (i = 0; i < cubesLength; i++) {
            var item = cubes.item(i);
            if (item.hasAttribute('marked')) {
                game.reload();
                break;
            } else {
                item.removeAttribute('active', '');
                item.setAttribute('marked', '');
            }
        }

        clearInterval(fastMoveInterval);
        figure = new game.figureTypes[game.getRandomType()];

        figure.initializeFigure();
    },
    cagesRecount: function () {
        var cages = area.querySelectorAll('div');
        var xaxis = 1, yaxis = 1;
        for (var i = 0; i < numberOfCages; i++) {
            var cage = cages.item(i);
            cage.setAttribute('id', 'x' + xaxis + 'y' + yaxis);
            xaxis = xaxis + 1;
            if (xaxis === cagesInWidth + 1) {
                yaxis = yaxis + 1;
                xaxis = 1;
            }
        }
    },
    lineDestroy: function () {
        game.createFigure();
        for (var y = cagesInHeight; y >= 1; y--) {
            var cagesInLine = [];
            for (var x = 1; x <= cagesInWidth; x++) {
                cagesInLine.push(document.getElementById('x' + x + 'y' + y));
            }
            var fullness = cagesInLine.every(function (cage) {
                return cage.hasAttribute('marked')
            });
            if (fullness) {
                cagesInLine.forEach(function (cage) {
                    area.removeChild(cage);
                    var newCage = document.createElement('div');
                    newCage.style.width = cageSize + 'px';
                    newCage.style.height = cageSize + 'px';
                    area.insertBefore(newCage, area.firstChild)
                });
            }

        }

        game.cagesRecount();
    }
};

game.figureTypes.forEach(function (el) {
    el.prototype = new Figure();
});

//keyboard handling
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {//space
        figure.rotate();
    } else if (e.keyCode === 37) {//left
        figure.stepLeft();
    } else if (e.keyCode === 39) {//right
        figure.stepRight();
    } else if (e.keyCode === 40) {//down
        figure.fastMoveDown();
    }
});

//start game
game.createFigure();

var speed = startSpeed;

var acceleration = function(){
return speed * .999;
};

var movingInterval = setInterval(function () {
    figure.stepDown();
    console.log(speed)
}, acceleration());