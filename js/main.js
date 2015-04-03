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
for (var i = 0; i < numberOfCages; i++) {
	area.appendChild(document.createElement("div"));
}

var cages = area.querySelectorAll('div');
var cagesLength = cages.length;

var xaxis = 1, yaxis = 1;

for (i = 0; i < cagesLength; i++) {
	var cage = cages.item(i);
	cage.style.width = cageSize + 'px';
	cage.style.height = cageSize + 'px';
	cage.setAttribute('id', 'x' + xaxis + 'y' + yaxis);
	xaxis = xaxis + 1;
	if (xaxis === cagesInWidth + 1) {
		yaxis = yaxis + 1;
		xaxis = 1;
	}
}

var fastMoveInterval, figure;

function reload() {
	var reload = confirm('Игра закончена! Хотите перезапустить?');
	if (reload) {
		location.reload()
	} else {
		clearInterval(movingInterval)
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
		for (i = 0; i < 4; i++) {
			if (this.coords[i].x !== 1) {
				--this.coords[i].x;
			}
		}
		this.initializeFigure();
	};
	this.stepRight = function () {
		for (i = 0; i < 4; i++) {
			if (this.coords[i].x !== cagesInWidth) {
				++this.coords[i].x;
			}
		}
		this.initializeFigure();
	};
	this.stepDown = function () {
		var canMove = this.coords.every(function (el) {
			var nextCage = document.getElementById('x' + el.x + 'y' + (el.y + 1));
			return (nextCage && !nextCage.hasAttribute('marked'));
		});

		console.log(canMove)

		if (canMove) {
			this.coords.forEach(function (el) {
					++el.y
				}
			);
			this.initializeFigure();
		} else {
			createFigure()
		}

	};
	this.fastMoveDown = function () {
		clearInterval(fastMoveInterval);
		fastMoveInterval = setInterval(function () {
			figure.stepDown();
		}, 50);

	};
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

var figureTypes = [Cube, Stick, Stair, Stair2];

function getRandomType(){
	return parseInt(Math.random() * 4);
}

function createFigure() {
	var cubes = document.querySelectorAll('[active]');
	var cubesLength = cubes.length;
	for (i = 0; i < cubesLength; i++) {
		var item = cubes.item(i);
		if (item.hasAttributes('marked')) {
			reload();
		} else {
			cubes.item(i).setAttribute('marked', '');
			cubes.item(i).removeAttribute('active', '');
		}
	}

	clearInterval(fastMoveInterval);
	figure = new figureTypes[getRandomType()];

	figure.initializeFigure();
}

//keyboard handling
window.addEventListener('keydown', function (e) {
	if (e.keyCode === 32) {//space
		figure.fastMoveDown();
	} else if (e.keyCode === 37) {//left
		figure.stepLeft();
	} else if (e.keyCode === 39) {//right
		figure.stepRight();
	} else if (e.keyCode === 40) {//down
		figure.stepDown();
	}
});

createFigure();

var movingInterval = setInterval(function () {
	figure.stepDown();
}, 1000);


