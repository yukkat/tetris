// Options
var cageSize = 30;

var box = document.getElementById('box');
var area = document.getElementById('area');
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;

var cagesInWidth = parseInt(boxWidth / cageSize);
if (cagesInWidth % 2 === 0) {
	cagesInWidth = cagesInWidth - 1;
}
var cageSizepx = cageSize + 'px';
var cagesInHeight = parseInt(boxHeight / cageSize);
area.style.width = cagesInWidth * cageSize + 'px';
var areaHeight = cagesInHeight * cageSize;
area.style.paddingTop = (boxHeight - areaHeight) / 2 + 'px';

var numberOfCages = cagesInWidth * cagesInHeight;

console.log(boxWidth + ',' + boxHeight + ',' + numberOfCages);

// Grid creating
for (var i = 0; i < numberOfCages; i++) {
	area.appendChild(document.createElement("div"));
}

var cages = area.querySelectorAll('div');

var xaxis = 1, yaxis = 1;

for (var item in cages) {
	var cage = cages.item(item);
	cage.style.width = cageSizepx;
	cage.style.height = cageSizepx;
	cage.setAttribute('id', 'x' + xaxis + 'y' + yaxis);
	xaxis = xaxis + 1;
	if (xaxis === cagesInWidth + 1) {
		yaxis = yaxis + 1;
		xaxis = 1;
	}
}


// creating figure class
function Figure() {
	this.xpos = parseInt(cagesInWidth / 2);
	this.ypos = 1;
	this.initializeFigure = function (index) {
		var cubes = document.querySelectorAll('.cube'+index);
		var cubesLength = cubes.length;
		for (i = 0; i < cubesLength; i++) {
			cubes.item(i).removeAttribute('class');
		}
		document.getElementById('x' + this.xpos + 'y' + this.ypos).className = 'cube'+index;
		document.getElementById('x' + this.xpos + 'y' + (this.ypos + 1)).className = 'cube'+index;
	};
	this.fastMoveDown = function (index) {
		this.initializeFigure(index);
		if (this.ypos != cagesInHeight - 1) {
			this.ypos = this.ypos + 1;
			this.fastMoveDown();
		}
	};
	this.stepDown = function (index) {
		this.initializeFigure(index);
		if (this.ypos != cagesInHeight - 1) {
			this.ypos = this.ypos + 1;
		}
	};
	this.stepLeft = function (index) {
		this.initializeFigure(index);
		if (this.xpos !== 1) {
			this.xpos = this.xpos - 1;
		}
	};
	this.stepRight = function (index) {
		this.initializeFigure(index);
		if (this.xpos !== cagesInWidth) {
			this.xpos = this.ypos - 1;
		}
	}
}

// Creating figures
var cube1 = new Figure();
var cube2 = new Figure();

cube1.initializeFigure(1);
cube2.initializeFigure(2);
