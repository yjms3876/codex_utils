const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lapList');

let startTime = null;
let elapsedTime = 0;
let timerId = null;
let lapCount = 0;

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function tick() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

startBtn.addEventListener('click', () => {
  if (timerId !== null) return;
  startTime = Date.now() - elapsedTime;
  timerId = setInterval(tick, 10);
});

stopBtn.addEventListener('click', () => {
  if (timerId === null) return;
  clearInterval(timerId);
  timerId = null;
});

lapBtn.addEventListener('click', () => {
  if (timerId === null) return;
  lapCount += 1;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
  lapList.prepend(lapItem);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  elapsedTime = 0;
  lapCount = 0;
  lapList.innerHTML = '';
  updateDisplay();
});

updateDisplay();
