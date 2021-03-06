// get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build functions
function togglePlay() {
  /*
  alternate
  const method = video.paused? 'play':'pause';
  video[method]();
  */
  //'paused' is a property of video, 'playing' is not, however
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function switchButton() {
  //'this' is bound to the video
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", switchButton);
video.addEventListener("pause", switchButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

//TODO: add drag listener
// ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
// TODO: add fullscreen button
// Add a button that toggles the full screen display of the video

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
