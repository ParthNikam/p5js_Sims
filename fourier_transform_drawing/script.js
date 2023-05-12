let time = 0;
let path = [];

let y = [];
let x = [];
let fourierY;
let fourierX;
let xv = 100;


// 1. convert SVG to x y coordinates https://spotify.github.io/coordinator/
// save these coordinates in image_svg.js

function setup() {
    createCanvas(1000, 1000);
    
    for (let i = 0; i < drawing.length; i+=10){
        y.push(drawing[i][1]);
        x.push(drawing[i][0]);
    }

    fourierY = dft(y); // discrete fourier transform
    fourierX = dft(x);
    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
}


function draw() {
    background(0);
    
    let vx = fourierTransform(fourierX, width/2, 100, 0);
    let vy = fourierTransform(fourierY, 100, height/2, PI / 2);
    // fourierSeries(100, 800);
    let V = createVector(vx.x, vy.y);
    path.unshift(V);

    line(vx.x, vx.y, V.x, V.y);
    line(vy.x, vy.y, V.x, V.y);
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();
    const dt = (2 * PI) / fourierY.length;
    time += dt;

    if (time > 4 * PI) { // if we complete a full rotation cycle, set time to 0 and empty path array
        time = 0;
        path = [];
    }
}


function fourierTransform(fourierArr, x, y, rotation) {
    for (let i = 0; i < fourierArr.length; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourierArr[i].freq;
        let radius = fourierArr[i].amp;
        let phase = fourierArr[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(255,100)
        strokeWeight(2);
        noFill();
        ellipse(prevx, prevy, radius * 2);
        stroke(255)
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}

