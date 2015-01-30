/* options */
var cagesInWidth = 27;

var box = document.getElementById('box');
var area = document.getElementById('area');

/* calculates */
var areaCalculates = function () {
	var boxWidth = box.offsetWidth;
	var boxHeight = box.offsetHeight;
	var cageSize = parseInt(boxWidth / cagesInWidth);
	var cageSizepx = cageSize + 'px';
	var cagesInHeight = parseInt(boxHeight / cageSize);
	area.style.width = cagesInWidth * cageSize + 'px';
	var areaHeight = cagesInHeight * cageSize;
	area.style.paddingTop = (
	boxHeight - areaHeight) / 2 + 'px';

	var numberOfCages = cagesInWidth * cagesInHeight;

	console.log(boxWidth + ',' + boxHeight + ',' + numberOfCages);

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
		cage.setAttribute('id', xaxis + '-' + yaxis);
		xaxis = xaxis + 1;
		if (xaxis === cagesInWidth + 1) {
			yaxis = yaxis + 1;
			xaxis = 1;
		}
	}

	var cube = document.getElementById("1-1");
	cube.className('cube');

	// creating figure class
	//function Cube(index) {
	//	this.index = index;
	//	this.xpos = parseInt(cagesInWidth / 2);
	//	this.ypos = 1;
	//	this.initialize = function () {
	//		area.getElementById("1-1");
	//		cube.className('cube')
	//	}
	//}
	//
	//var cube = new Cube;
	//
	//cube.initialize();

}();


