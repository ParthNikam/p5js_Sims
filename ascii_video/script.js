let video;
let asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];



function setup() {
  createCanvas(640*2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/2, height);
  video.hide();
}

function draw() {
  background(255);
  video.loadPixels();
  
  image(video, 640, 0, 640, 480);
  drawAscii(640, 480);
}

function drawAscii(w, h) {
  for (let y = 0; y < h; y += 5) {
    for (let x = 0; x < w; x += 5) {
      let index = (x + y * w) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let brightness = (r + g + b) / 3;
      let asciiIndex = map(brightness, 0, 255, 0, asciiChars.length - 1);
      let character = asciiChars[Math.round(asciiIndex)];
      textSize(9);
      text(character, x, 5+y);
    }
  }
}

