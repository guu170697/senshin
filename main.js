const animals = [
  { name: 'リス', image: 'animal_risu.png', description: '森の守り神で俊敏な動きが得意なリス。' },
  { name: '熊', image: 'animal_kuma.png', description: '力強いけど優しい、森のリーダー的存在。' },
  { name: 'ウサギ', image: 'animal_usagi.png', description: 'ぴょんぴょん跳ねる、好奇心旺盛な住人。' },
  { name: 'キツネ', image: 'animal_kitsune.png', description: 'ずる賢くも礼儀正しい、森の案内人。' },
  { name: 'タヌキ', image: 'animal_tanuki.png', description: 'いたずら好きだけど憎めない人気者。' },
  { name: 'カワウソ', image: 'animal_kawauso.png', description: '水辺の遊び達人、元気いっぱい！' },
  { name: 'インコ', image: 'animal_inko.png', description: 'よくしゃべる情報屋。空から森を見守る。' },
  { name: '猫', image: 'animal_neko.png', description: 'マイペースな観察者、気ままに登場。' }
];

const messages = {
  1: ["今日もきれいな空気をありがとう！", "この森はとっても居心地がいいよ！", "すごく快適だね！"],
  2: ["空気が新鮮で元気いっぱい！", "自然の力って素晴らしい！", "今日はのびのびできるなぁ！"],
  3: ["ちょっと空気がこもってきたかも…？", "そろそろ窓を開けた方がいいかも！", "気分転換に換気しようよ！"],
  4: ["空気が重たく感じるなあ…", "もしかしてCO₂が増えてる？換気しよ！", "新しい空気が欲しいな～"],
  5: ["空気が苦しいよ！窓を開けてー！", "換気して！今すぐ！", "空気が悪い！お願い、風を入れて！"],
  6: ["もはや非常事態！窓を全開にして！", "ううっ…早く換気してくれぇ…！", "このままじゃだめだ！風を入れて！"]
};

let previousCO2 = null;
let previousLevel = null;
let currentAnimal = null;
let currentLevel = null;
const discoveredSet = new Set();

document.getElementById("animalDexToggle").addEventListener("click", () => {
  document.getElementById("animalDex").classList.toggle("open");
});

function setAnimal(level) {
  currentLevel = level;
  currentAnimal = animals[Math.floor(Math.random() * animals.length)];
  document.getElementById("animalImage").src = `image/${currentAnimal.image}`;

  const isNew = ![...discoveredSet].some(a => a.name === currentAnimal.name);
  discoveredSet.add(currentAnimal);
  updateAnimalDex();

  if (isNew) showPopup(currentAnimal);
}

function talk() {
  if (!currentAnimal || !currentLevel) return;
  const lines = messages[currentLevel];
  const line = lines[Math.floor(Math.random() * lines.length)];
  const message = `${currentAnimal.name}：${line}`;

  document.getElementById("messageBoard").textContent = message;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'ja-JP';
  speechSynthesis.speak(utterance);
}

function updateAnimalDex() {
  const container = document.getElementById("discoveredAnimals");
  container.innerHTML = "";

  discoveredSet.forEach(animal => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <img src="image/${animal.image}" alt="${animal.name}">
      <div style="font-weight:bold">${animal.name}</div>
      <div style="font-size:11px; color:#555">${animal.description}</div>
    `;
    container.appendChild(wrapper);
  });
}

function showPopup(animal) {
  document.getElementById("popupImage").src = `image/${animal.image}`;
  document.getElementById("popupName").textContent = animal.name;
  document.getElementById("popupDesc").textContent = animal.description;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

async function fetchSensorData() {
  try {
    const res = await fetch("http://localhost:5000/api/data");
    const data = await res.json();
    const target = data.find(d => d.sensorName.includes("Ｒ３ー４０１"));
    if (!target) throw new Error("対象センサー（Ｒ３ー４０１）が見つかりません");

    const co2 = target.co2;
    const temp = target.temperature;
    const humi = target.relativeHumidity;
    const time = new Date(target.timestamp).toLocaleString();

    const status = document.getElementById("status");
    const details = document.getElementById("details");
    const image = document.getElementById("forestImage");

    let level = 6;
    if (co2 < 500) level = 1;
    else if (co2 < 550) level = 2;
    else if (co2 < 600) level = 3;
    else if (co2 < 650) level = 4;
    else if (co2 < 700) level = 5;

    if (previousCO2 !== null) {
      status.className = co2 > previousCO2 ? "increase" : co2 < previousCO2 ? "decrease" : "nochange";
    }

    status.textContent = `現在のCO₂濃度：${co2} ppm（レベル ${level}）`;
    details.innerHTML = `
      <strong>センサー名：</strong>${target.sensorName}<br>
      <strong>CO₂濃度：</strong>${co2} ppm<br>
      <strong>気温：</strong>${temp} ℃<br>
      <strong>湿度：</strong>${humi} %<br>
      <strong>測定時刻：</strong>${time}
    `;

    if (level !== previousLevel) {
      image.classList.add("fade-out");
      setTimeout(() => {
        image.src = `image/${level}.png?t=${Date.now()}`;
        image.classList.remove("fade-out");
        setAnimal(level);
      }, 400);
    }

    previousCO2 = co2;
    previousLevel = level;
  } catch (e) {
    document.getElementById("status").textContent = "取得エラー：" + e.message;
    document.getElementById("details").textContent = "";
    document.getElementById("forestImage").src = "";
  }
}

fetchSensorData();
setInterval(fetchSensorData, 30000);
