const timerDisplay = document.querySelector('.timer-display');
const inputTime = document.querySelector('.input-time');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resetButton = document.querySelector('.reset-button');

let countdown;

function displayTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainderSeconds = seconds % 60;
  const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
}

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}

function startTimer() {
  const seconds = parseInt(inputTime.value) * 60;
  timer(seconds);
  inputTime.value = '';
}

startButton.addEventListener('click', startTimer);

pauseButton.addEventListener('click', function() {
  clearInterval(countdown);
});

resetButton.addEventListener('click', function() {
  clearInterval(countdown);
  timerDisplay.textContent = '00:00:00';
});
