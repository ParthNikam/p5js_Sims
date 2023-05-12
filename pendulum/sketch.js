
function setup() {
	createCanvas(600, 600);
	p1 = new Pendulum(45, 300, 0, 200);
	p2 = new Pendulum(PI / 4, 300, 0, 300);
}

function draw() {
	background(0);
	p2.show();
}


class Pendulum {
	constructor(a, ox, oy, r) {
		this.a = a;
		this.origin = createVector(ox, oy);
		this.r = r;
		this.bob = createVector();
		this.aV = 0;
		this.aA = 0;
		this.g = 1;
		this.aR = 0.999;
	}
	
	show() {
		this.prevX = this.bob.x;
		this.prevY = this.bob.y;
		this.bob.x = this.r * sin(this.a) + this.origin.x;
		this.bob.y = this.r * cos(this.a) + this.origin.y;
		
		
		this.aA = -this.g/this.r * sin(this.a);
		this.aV += this.aA;
		this.a += this.aV;
		this.aV *= this.aR;
		
		
		stroke(255);
		strokeWeight(3);
		line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
		ellipse(this.bob.x, this.bob.y, 50);
	}
}