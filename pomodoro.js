const clock = document.getElementById("clock");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const break1 = document.getElementById("break1");
const break2 = document.getElementById("break2");
const div = document.getElementById("div");

let remaining = 1500;
let intervalId = null;

function nowTime() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  div.innerText = `現在の時刻:${h}:${m}`;
}

nowTime();

setInterval(() => {
  nowTime();
}, 1000);

function timer() {
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  clock.innerText = `${minutes}:${seconds}`;
}

start.addEventListener("click", () => {
  const startAudio = new Audio("start.mp3");
  startAudio.play();
  if (intervalId === null) {
    intervalId = setInterval(() => {
      remaining--;
      timer();
      if (remaining <= 0) {
        const finishAudio = new Audio("finish.mp3");
        finishAudio.play();
        return alert("終了!!!");
      }
    }, 1000);
  }
});

stop.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

reset.addEventListener("click", () => {
  clearInterval(intervalId);
  remaining = 1500;
  clock.style.color = "black";
  timer();
  intervalId = null;
});

break1.addEventListener("click", () => {
  clearInterval(intervalId);
  remaining = 300;
  clock.style.color = "blue";
  intervalId = null;
  timer();
});

break2.addEventListener("click", () => {
  clearInterval(intervalId);
  remaining = 1500;
  intervalId = null;
  clock.style.color = "blue";
  timer();
});
