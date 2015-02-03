// Options
var cageSize = 30;

var box = document.getElementById('box');
var area = document.getElementById('area');
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;

var cagesInWidth = parseInt(boxWidth / cageSize);
if (cagesInWidth % 2 === 0) {
	cagesInWidth = cagesInWidth - 1; //always odd
}
var cageSizepx = cageSize + 'px';
var cagesInHeight = parseInt(boxHeight / cageSize);
area.style.width = cagesInWidth * cageSize + 'px';
var areaHeight = cagesInHeight * cageSize;
area.style.paddingTop = (
boxHeight - areaHeight) / 2 + 'px';

var numberOfCages = cagesInWidth * cagesInHeight;

console.log(boxWidth + ',' + boxHeight + ',' + numberOfCages);

// Grid creating
for ( var i = 0; i < numberOfCages; i++ ) {
	area.appendChild(document.createElement("div"));
}

var cages = area.querySelectorAll('div');
var cagesLength = cages.length;

var xaxis = 1, yaxis = 1;

for ( i = 0; i < cagesLength; i++ ) {
	var cage = cages.item(i);
	cage.style.width = cageSizepx;
	cage.style.height = cageSizepx;
	cage.setAttribute('id', 'x' + xaxis + 'y' + yaxis);
	xaxis = xaxis + 1;
	if (xaxis === cagesInWidth + 1) {
		yaxis = yaxis + 1;
		xaxis = 1;
	}
}

var forget = false;

// creating figure class
function Figure(index) {
	this.xpos = parseInt(cagesInWidth / 2) + 1; // always centered
	this.ypos = 1;
	this.initializeFigure = function () {
		var cubes = document.querySelectorAll('.cube.active');
		var cubesLength = cubes.length;
		for ( i = 0; i < cubesLength; i++ ) {
			cubes.item(i).removeAttribute('class');
		}
		document.getElementById('x' + this.xpos + 'y' + this.ypos).className = 'cube active';
	};
	this.stepLeft = function () {

		if (this.xpos !== 1) {
			--this.xpos;
		}this.initializeFigure();
	};
	this.stepRight = function () {
		if (this.xpos !== cagesInWidth) {
			++this.xpos;
		}
		this.initializeFigure();
	};
	this.stepDown = function () {
		this.initializeFigure();
		var nextCage = document.getElementById('x' + this.xpos + 'y' + (
		this.ypos + 1));
		if (this.ypos !== cagesInHeight - 1 || nextCage&&nextCage.className !== "cube") {
			++this.ypos;
		} else {
			var cubes = document.querySelectorAll('.cube.active');
			var cubesLength = cubes.length;
			for ( i = 0; i < cubesLength; i++ ) {
				cubes.item(i).removeAttribute('class');
			}
			document.getElementById('x' + this.xpos + 'y' + this.ypos).className = 'cube';
			return forget = true;
		}

	};
	this.fastMoveDown = function () {

		this.initializeFigure();

		if (this.ypos != cagesInHeight) {
			var nextCage = document.getElementById('x' + this.xpos + 'y' + (
			this.ypos + 1));
			if (nextCage && nextCage.className !== "cube") {
				++this.ypos;
				this.fastMoveDown();

			}
		}return forget = true;
	};
}

//keyboard handling
window.addEventListener('keydown', function (e) {
	if (e.keyCode === 32) {//space
		cube.stepDown();
	} else if (e.keyCode === 37) {//left
		cube.stepLeft();
	} else if (e.keyCode === 39) {//right
		cube.stepRight();
	} else if (e.keyCode === 40) {//down
		cube.fastMoveDown();
	}
});

var index;
// Creating figures
var cube = new Figure(index);

cube.initializeFigure();

setInterval(function(){
	if (forget){
		++index;
		cube = new Figure(index);
		cube.xpos = parseInt(cagesInWidth / 2) + 1; // always centered
		cube.ypos = 1;
		cube.initializeFigure();
	}
},100);