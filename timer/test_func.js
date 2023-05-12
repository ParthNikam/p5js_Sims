let durationInput;
let startButton;
let duration = 0;
let timer = duration * 60;
let isPaused = true;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(48);

  // Create the input field
  durationInput = createInput();
  durationInput.position(20, height + 20);

  // Create the start/pause button
  startButton = createButton('Start');
  startButton.position(durationInput.x + durationInput.width + 10, height + 20);
  startButton.mousePressed(startPause);
}

function draw() {
  background(220);

  // Update the duration and timer
  duration = durationInput.value();
  timer = duration * 60;

  let progress = map(timer, 0, duration * 60, 0, TWO_PI);
  strokeWeight(20);
  noFill();
  stroke(255, 0, 0);
  arc(width / 2, height / 2, 300, 300, -HALF_PI, progress - HALF_PI);
  stroke(220);
  arc(width / 2, height / 2, 300, 300, progress - HALF_PI, TWO_PI - HALF_PI);
  
  if (!isPaused) {
    timer--;
  }
  
  if (timer < 0) {
    timer = 0;
    isPaused = true;
  }
  
  let minutes = floor(timer / 60);
  let seconds = timer % 60;
  let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
  text(timeString, width / 2, height / 2);
  
  // Update the start/pause button text
  if (isPaused) {
    startButton.html('Start');
  } else {
    startButton.html('Pause');
  }
}

function startPause() {
  isPaused = !isPaused;
}
