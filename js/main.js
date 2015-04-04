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
			if (nextCage && nextCage.hasAttribute('marked')) {
				game.createFigure();
			}
			return nextCage;
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
			if (nextCage && nextCage.hasAttribute('marked')) {
				game.createFigure();
			}
			return nextCage;
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
		var nextCagesExist = this.coords.every(function (el) {
			var nextCage = document.getElementById('x' + el.x + 'y' + (el.y + 1));
			return nextCage && !nextCage.hasAttribute('marked');
		});

		if (nextCagesExist) {
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
				game.createFigure();
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
		var rotatePointa = this.coords[2].x;
		var rotatePointb = this.coords[2].y;
		this.coords.forEach(function (el) {
			var a = rotatePointa - el.x, b = rotatePointb - el.y;
			el.x = rotatePointa - b;
			el.y = rotatePointb + a;
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

function Stair2() {
	this.name = 'stair2';
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
Stair2.prototype = new Figure();

function Pyramid(){
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

// game utils
var fastMoveInterval, figure;

var game = {
	reload: function () {
		var reload = confirm('Игра закончена! Хотите перезапустить?');
		if (reload) {
			location.reload()
		} else {
			clearInterval(movingInterval)
		}
	},
	figureTypes: [Cube, Stick, Stair, Stair2, Pyramid],
	getRandomType: function () {
		return parseInt(Math.random() * 5);
	},
	createFigure: function () {
		var cubes = document.querySelectorAll('[active]');
		var cubesLength = cubes.length;
		for (i = 0; i < cubesLength; i++) {
			var item = cubes.item(i);
			if (item.hasAttribute('marked')) {
				game.reload();
			} else {
				item.removeAttribute('active', '');
				item.setAttribute('marked', '');
			}
		}

		clearInterval(fastMoveInterval);
		figure = new game.figureTypes[game.getRandomType()];

		figure.initializeFigure();
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
}, 1000);


