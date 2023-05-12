let duration = 10 * 60; // duration in seconds
let timer = duration;
let isPaused = true;
let input;

function setup() {
  createCanvas(1920, 1080);
  textAlign(width-200, 500);
  textSize(48);
  
  // Create input field for timer duration
  input = createInput(duration);
  input.position(width/2 - 280, height/2 );
  
  // Create start/pause button
  button = createButton('Start');
  button.position(width/2 - 100, height/2);
  button.mousePressed(toggleTimer);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(width/2 - 40, height/2);
  resetButton.mousePressed(resetTimer);
}

function draw() {
  background(20, 30, 40);
  
  let elapsed =  timer - duration;
  let progress = map(elapsed, 0, duration, 0, TWO_PI);
  
  strokeWeight(20);
  noFill();
  stroke(0, 191, 255);
  arc(width / 2 - 100, 300, 300, 300, -HALF_PI, progress - HALF_PI);
  
  if (!isPaused) {
    timer--;
  }
  
  if (timer < 0) {
    timer = 0;
    isPaused = true;
  }
  
  let hours = floor(timer / 3600);
  let minutes = floor((timer % 3600) / 60);
  let seconds = timer % 60;
  let timeString = nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2);
  fill(255);
  textSize(32);
  strokeWeight(1);
  text(timeString, width / 2 - 160, height / 2 - 220);
}

function toggleTimer() {
  if (isPaused) {
    isPaused = false;
    button.html('Pause');
  } else {
    isPaused = true;
    button.html('Start');
  }
}

function resetTimer() {
  timer = input.value() * 60;
  isPaused = true;
  button.html('Start');
}
