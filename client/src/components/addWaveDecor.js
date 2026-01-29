function addWaveDecor() {
  const element = document.getElementById("wave-animation");
  if (!element) return;

  if (element.dataset.waveActive === "true") return;
  element.dataset.waveActive = "true";

  const frames = ["(｡･ω･)ﾉﾞ", "ヽ(･ω･｡)"];
  let index = 0;

  element.innerHTML = frames[index];

  setInterval(() => {
    index = (index + 1) % frames.length;
    element.innerHTML = frames[index];
  }, 1500);
}

export { addWaveDecor };
