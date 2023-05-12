let angle = 0;
let w = 30;
let ma; // magic angle
let maxD;
let x = 500;
let slider;



function setup() {
    createCanvas(600, 600, WEBGL);
    ma = atan(cos(QUARTER_PI));
    maxD = dist(0, 0, 200, 200);
}

function draw() {
    background(0);
    ortho(-x, x, -x, x, 0, 1000); // orthographic projection
    rotateX(-ma);
    rotateY(-QUARTER_PI);

    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push();
            let d = dist(x, z, width / 2, height / 2);
            let offset = map(d, 0, maxD, -3, 3);
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 100, 300));
            translate(x-width/2, 0, z - height/2);
            normalMaterial();
            box(w-2, h, w-2);
            pop();
        }
    }
    angle -= 0.08;
}