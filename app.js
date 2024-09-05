const track = document.getElementById("image-track");

const handleMove = (clientX) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseData = parseFloat(track.dataset.mouseDownAt) - clientX;
  const maxData = window.innerWidth / 2;
  const percentage = (mouseData / maxData) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );
  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: ` ${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousemove = (e) => handleMove(e.clientX);
window.ontouchmove = (e) => handleMove(e.touches[0].clientX);

const handleStart = (clientX) => {
  track.dataset.mouseDownAt = clientX;
};

window.onmousedown = (e) => handleStart(e.clientX);
window.ontouchstart = (e) => handleStart(e.touches[0].clientX);

window.onmouseup = window.ontouchend = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};
