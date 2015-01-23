/* options */
var cageSize = 30;

var cageSizepx = cageSize + 'px';
var box = document.getElementById('box');
var area = document.getElementById('area');

/* calculates */
var areaCalculates = function () {
	var boxWidth = box.offsetWidth;
	var boxHeight = box.offsetHeight;
	var cagesInWidth = parseInt(boxWidth / cageSize);
	var cagesInHeight = parseInt(boxHeight / cageSize);
	area.style.width = cagesInWidth * cageSize + 'px';
	var areaHeight = cagesInHeight*cageSize;
	area.style.paddingTop = (boxHeight - areaHeight)/2 + 'px';

	var numberOfCages = cagesInWidth * cagesInHeight;

	console.log(boxWidth + ',' + boxHeight + ',' + numberOfCages);

	for ( var i = 0; i < numberOfCages; i++ ) {
		area.appendChild(document.createElement("div"));
	}

	var cages = area.querySelectorAll('div');

	for ( var item in cages ) {
		var cage = cages.item(item);
		cage.style.width = cageSizepx;
		cage.style.height = cageSizepx;
		cage.className = 'cage';
	}
}();

