
const grid = document.getElementById('grid');
const search = document.getElementById('search');
let games = [];

function render(list) {
grid.innerHTML = '';
list.forEach(g => {
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = 
      <img src="${g.thumbnail}" alt="${g.name}" onerror="this.src='placeholder.png'" />
      <div class="overlay">Oyunu Oyna</div>
      <div class="card-title">${g.name}</div>;
card.onclick = () => openGame(g.url);
grid.appendChild(card);
});
}

function openGame(url) {
const iframe = document.createElement('iframe');
iframe.src = url;
iframe.className = 'modal';
iframe.onclick = () => document.body.removeChild(iframe);
document.body.appendChild(iframe);
}

fetch('data/games.json')
.then(r => r.json())
.then(data => {
games = data;
render(games);
});

search.addEventListener('input', e => {
const q = e.target.value.toLowerCase();
const filtered = games.filter(g => g.name.toLowerCase().includes(q));
render(filtered);
});
