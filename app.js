// LocalStorage Keys
const KIDS_KEY = "kidsData";
const LEVELS_KEY = "levelData";

let kids = JSON.parse(localStorage.getItem(KIDS_KEY) || "[]");
let levels = JSON.parse(localStorage.getItem(LEVELS_KEY) || "[]");

// Default levels (if empty)
if(levels.length === 0) {
  levels = [
    {name:"Explorador", min:0, max:49, color:"#4CAF50"},
    {name:"Aventurero", min:50, max:149, color:"#2196F3"},
    {name:"Valiente", min:150, max:299, color:"#9C27B0"},
    {name:"Héroe", min:300, max:499, color:"#FF9800"},
    {name:"Leyenda", min:500, max:999, color:"#FFEB3B"},
    {name:"Superestrella", min:1000, max:999999, color:"#F44336"}
  ];
  saveLevels();
}

renderKids();
renderLevels();
renderKidOptions();

// Add Kid
function addKid() {
  let name = document.getElementById("newKidName").value.trim();
  if(!name) return;
  kids.push({name, points:0});
  saveKids();
  renderKids();
  renderKidOptions();
  document.getElementById("newKidName").value = "";
}

// Give Points
function givePoints() {
  modifyPoints(true);
}

// Take Points
function takePoints() {
  modifyPoints(false);
}

// Modify Points Helper
function modifyPoints(isAdd) {
  let sel = document.getElementById("kidSelect");
  let points = parseInt(document.getElementById("pointAmount").value);
  if(!sel.value || isNaN(points)) return;

  let kid = kids.find(k => k.name === sel.value);
  kid.points = isAdd ? kid.points + points : kid.points - points;
  saveKids();
  renderKids();
}

// Render Kids List
function renderKids() {
  let ul = document.getElementById("kids-list");
  ul.innerHTML = "";
  kids.forEach(k => {
    let lvl = getLevel(k.points);
    let li = document.createElement("li");
    li.innerHTML = `<strong>${k.name}</strong> — ${k.points} pts 
      <span style="color:${lvl.color}">(${lvl.name})</span>`;
    ul.appendChild(li);
  });
}

// Render Levels List
function renderLevels() {
  let ul = document.getElementById("levels-list");
  ul.innerHTML = "";
  levels.forEach(l => {
    let li = document.createElement("li");
    li.innerHTML = `${l.name}: ${l.min} – ${l.max} 
      <span style="background:${l.color};padding:3px 6px;border-radius:3px;"></span>`;
    ul.appendChild(li);
  });
}

// Add Level
function addLevel() {
  let name = document.getElementById("lvlName").value;
  let color = document.getElementById("lvlColor").value;
  let min = parseInt(document.getElementById("lvlMin").value);
  let max = parseInt(document.getElementById("lvlMax").value);
  if(!name || isNaN(min) || isNaN(max)) return;

  levels.push({name,color,min,max});
  saveLevels();
  renderLevels();
}

// Get Level for Points
function getLevel(points) {
  return levels.find(l => points >= l.min && points <= l.max) || {};
}

// Save Helpers
function saveKids() {
  localStorage.setItem(KIDS_KEY, JSON.stringify(kids));
}

function saveLevels() {
  localStorage.setItem(LEVELS_KEY, JSON.stringify(levels));
}

// Populate Select
function renderKidOptions() {
  let sel = document.getElementById("kidSelect");
  sel.innerHTML = "<option value=''>Selecciona...</option>";
  kids.forEach(k => {
    let opt = document.createElement("option");
    opt.value = k.name;
    opt.text = k.name;
    sel.appendChild(opt);
  });
}
