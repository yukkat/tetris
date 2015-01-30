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
		cage.setAttribute('id', 'x'+xaxis + 'y' + yaxis);
		xaxis = xaxis + 1;
		if (xaxis === cagesInWidth + 1) {
			yaxis = yaxis + 1;
			xaxis = 1;
		}
	}


	// creating figure class
	function Figure() {
		//this.index = index;
		this.xpos = parseInt(cagesInWidth / 2);
		this.ypos = 1;
		this.initializeFigure = function () {
			var cubes = document.querySelectorAll('.cube');
			var cubesLength = cubes.length;
			for ( i = 0; i < cubesLength; i++ ) {
				cubes.item(i).removeAttribute('class');
			}
			document.getElementById('x'+this.xpos+'y'+this.ypos).className = 'cube';
			document.getElementById('x'+this.xpos+'y'+(this.ypos+1)).className = 'cube';
		};
		this.moveDown = function(){
			this.initializeFigure()
			if(this.ypos!=cagesInHeight-1){
				this.ypos = this.ypos + 1;
				this.moveDown();
			}
		}
	}

	var cube1 = new Figure();

	cube1.moveDown();

}();

