'use strict';

// Options
var cageSize = 50;

// nodes
var box = document.body;
var area = document.getElementById('area');

// area calculates
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;

var cagesInWidth = parseInt(boxWidth / cageSize);
if (cagesInWidth % 2 === 0) {
	cagesInWidth = cagesInWidth - 1; //always odd
}

var cagesInHeight = parseInt(boxHeight / cageSize);
area.style.width = cagesInWidth * cageSize + 'px';
var areaHeight = cagesInHeight * cageSize;
area.style.paddingTop = (
boxHeight - areaHeight) / 2 + 'px';

var numberOfCages = cagesInWidth * cagesInHeight;

console.log(boxWidth + ',' + boxHeight + ',' + numberOfCages);

// Grid creating
var xaxis = 1, yaxis = 1;

for (var i = 0; i < numberOfCages; i++) {
	var cage = document.createElement("div");
	area.appendChild(cage);
	cage.style.width = cageSize + 'px';
	cage.style.height = cageSize + 'px';
	cage.setAttribute('id', 'x' + xaxis + 'y' + yaxis);
	xaxis = xaxis + 1;
	if (xaxis === cagesInWidth + 1) {
		yaxis = yaxis + 1;
		xaxis = 1;
	}
}

// creating figure class
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

// creating different figure classes
function Cube() {
	this.name = 'cube';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx + 1,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx + 1,
			y: this.starty + 1
		}
	];

}
Cube.prototype = new Figure();

function Stair() {
	this.name = 'stair';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx - 1,
			y: this.starty + 1
		}, {
			x: this.startx - 1,
			y: this.starty + 2
		}
	];

}
Stair.prototype = new Figure();

function Stick() {
	this.name = 'stick';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx,
			y: this.starty + 2
		}, {
			x: this.startx,
			y: this.starty + 3
		}
	];

}
Stick.prototype = new Figure();

function StairReverse() {
	this.name = 'stair-reverse';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx + 1,
			y: this.starty + 1
		}, {
			x: this.startx + 1,
			y: this.starty + 2
		}
	];

}
StairReverse.prototype = new Figure();

function Pyramid() {
	this.name = 'pyramid';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx + 1,
			y: this.starty + 1
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx - 1,
			y: this.starty + 1
		}
	];

}
Pyramid.prototype = new Figure();

function Axe() {
	this.name = 'axe';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx,
			y: this.starty + 2
		}, {
			x: this.startx + 1,
			y: this.starty + 2
		}
	];

}
Axe.prototype = new Figure();
function AxeReverse() {
	this.name = 'axe-reverse';
	this.coords = [
		{
			x: this.startx,
			y: this.starty
		}, {
			x: this.startx,
			y: this.starty + 1
		}, {
			x: this.startx,
			y: this.starty + 2
		}, {
			x: this.startx - 1,
			y: this.starty + 2
		}
	];

}
AxeReverse.prototype = new Figure();

// game utils
var fastMoveInterval, figure;

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

var movingInterval = setInterval(function () {
	figure.stepDown();
}, 750);


