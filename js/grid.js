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