const bells = new Audio("./mixkit-achievement-bell-600.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelectorAll(".btn-pause-resume");
const session = document.querySelector(".minutes");
let myInterval;
let state = true;
let paused = false;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state && !paused) {
    state = false;
    paused = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      if (paused) return; // add this line to exit the function if paused

      const minuteDiv = document.querySelector(".minutes");
      const secondDiv = document.querySelector(".seconds");

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else if (paused) {
    alert("Session has already paused.");
  } else {
    alert("Session has already started.");
  }
};

const pauseResumeBtn = document.querySelector(".btn-pause-resume");
const resetBtn = document.querySelector(".btn-reset");

pauseResumeBtn.addEventListener("click", () => {
  if (state) {
    alert("Session has not started yet.");
  } else {
    paused = !paused;
    if (paused) {
      pauseResumeBtn.textContent = "Resume";
    } else {
      pauseResumeBtn.textContent = "Pause";
    }
  }
});

resetBtn.addEventListener("click", () => {
  if (state) {
    alert("Session has not started yet.");
  } else {
    state = true;
    paused = false;
    clearInterval(myInterval);
    const minuteDiv = document.querySelector(".minutes");
    const secondDiv = document.querySelector(".seconds");
    minuteDiv.textContent = "25";
    secondDiv.textContent = "00";
    pauseResumeBtn.textContent = "Pause";
  }
});

startBtn.addEventListener("click", appTimer);
