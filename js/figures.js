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