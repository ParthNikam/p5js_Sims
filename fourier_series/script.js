let time = 0;
let wave = [];
let slider;


function setup() {
    createCanvas(800, 600);
    slider = createSlider(1, 50, 1, 1);
}


function draw() {
    background(0);
    fourierSeries(200, 300);
}


function fourierSeries(x, y) {
    for (let i = 0; i < slider.value(); i++) {
        let prevx = x;
        let prevy = y;

        let n = i * 2 + 1;
        let radius = 75 * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255, 100);
        strokeWeight(3);
        noFill();
        ellipse(prevx, prevy, radius * 2);        
        stroke(255);
        line(prevx, prevy, x, y);
    }

    wave.unshift(y);

    translate(200, 0);
    line(x - 200, y, 200, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i+200, wave[i]);
    }
    endShape();

    time += 0.05;


    if (wave.length > 300) {
        wave.pop();
    }
}
