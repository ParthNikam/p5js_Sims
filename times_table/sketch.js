let r;
let factor = 0; // times n
let total; // total number of points
let factor_slider;
let total_slider;

function setup() {
    createCanvas(600, 600);
    factor_slider = createSlider(1, 100, 0, 1);
    factor_slider.style('width', '200px');
    factor_slider.position(10, 620);
    total_slider = createSlider(1, 200, 0, 1);
    total_slider.style('width', '200px');
    total_slider.position(10, 650);

    r = height / 2 - 16;
}

function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI);
    const v = p5.Vector.fromAngle(angle + PI);
    v.mult(r);
    return v;
}

function draw() {
    background(0);
    total = total_slider.value();

    factor = factor_slider.value();
    console.log("total: ", total, "\tfactor: ", factor);
    
    
    translate(width / 2, height / 2);
    stroke(255, 150);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, r * 2);
    strokeWeight(2);
    for (let i = 0; i < total; i++) {
        const a = getVector(i, total);
        const b = getVector(i * factor, total);
        line(a.x, a.y, b.x, b.y);
    }
}