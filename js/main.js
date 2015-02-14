// Options
var cageSize = 45;

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
	cage.setAttribute('y', yaxis);
	xaxis = xaxis + 1;
	if (xaxis === cagesInWidth + 1) {
		yaxis = yaxis + 1;
		xaxis = 1;
	}
}

var forget = false;
var fastMoveInterval;

// creating figure class
function Figure() {
	this.xpos = parseInt(cagesInWidth / 2) + 1; // always centered
	this.ypos = 1;
	this.initializeFigure = function () {
		var cubes = document.querySelectorAll('[active]');
		var cubesLength = cubes.length;
		for (i = 0; i < cubesLength; i++) {
			cubes.item(i).removeAttribute('class');
			cubes.item(i).removeAttribute('active');
		}
		document.getElementById('x' + this.xpos + 'y' + this.ypos).className = 'cube';
		document.getElementById('x' + this.xpos + 'y' + this.ypos).setAttribute('active', '');
	};
	this.stepLeft = function () {

		if (this.xpos !== 1) {
			--this.xpos;
		}
		this.initializeFigure();
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

		if (nextCage && nextCage.className !== "cube") {
			++this.ypos;
		} else if (this.ypos === 1) {
			var reload = confirm('Игра закончена! Хотите перезапустить?');
			if (reload) {
				location.reload()
			} else {
				clearInterval(movingInterval, newObjectInterval)
			}
		} else {
			var cubes = document.querySelectorAll('[active]');
			var cubesLength = cubes.length;
			for (i = 0; i < cubesLength; i++) {
				cubes.item(i).removeAttribute('active');
			}
			document.getElementById('x' + this.xpos + 'y' + this.ypos).className = 'cube';

			return forget = true;
		}

	};
	this.fastMoveDown = function () {
		clearInterval(fastMoveInterval);
		fastMoveInterval = setInterval(function () {
			cube.stepDown();
		}, 50);

	};
}

//keyboard handling
window.addEventListener('keydown', function (e) {
	if (e.keyCode === 32) {//space
		cube.fastMoveDown();
	} else if (e.keyCode === 37) {//left
		cube.stepLeft();
	} else if (e.keyCode === 39) {//right
		cube.stepRight();
	} else if (e.keyCode === 40) {//down
		cube.fastMoveDown();
	}
});

var cube = new Figure();
cube.initializeFigure();

var movingInterval = setInterval(function () {
	cube.stepDown();
}, 1000);

var lastLine = document.querySelectorAll('[y="' + cagesInHeight + '"]');

var newObjectInterval = setInterval(function () {
	if (forget) {
		clearInterval(fastMoveInterval);
		cube = new Figure();
		cube.initializeFigure();
		var fullness = 0;
		for (i = 0; i < lastLine.length; i++) {
			if (lastLine.item(i).className === "cube") {
				fullness++;
			}
		}
		if (fullness === cagesInWidth) {
			setTimeout(function () {
				for (i = 0; i < lastLine.length; i++) {
					lastLine.item(i).removeAttribute('class');
				}
			}, 500)
		}

		return forget = false;
	}
}, 100);

