const grid = document.getElementById('grid');
const search = document.getElementById('search');
let games = [];

async function loadGames() {
  try {
    const res = await fetch('data/games.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    games = data;
    render(games);
  } catch (err) {
    console.error('games.json yüklenemedi:', err);
    grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:red;">Oyun listesi yüklenemedi.</p>';
  }
}

function render(gamesList) {
  grid.innerHTML = '';
  gamesList.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.name}" onerror="this.src='placeholder.png'">
      <div class="overlay">Oyunu Oyna</div>
      <div class="card-title">${game.name}</div>
    `;
    card.onclick = () => openGame(game.url);
    grid.appendChild(card);
  });
}

function openGame(url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'modal';
  iframe.onclick = () => iframe.remove();
  document.body.appendChild(iframe);
}

loadGames();

search.addEventListener('input', () => {
  const query = search.value.toLowerCase();
  const filtered = games.filter(game => game.name.toLowerCase().includes(query));
  render(filtered);
});
```

---

# data/games.json
```json
[]
```
