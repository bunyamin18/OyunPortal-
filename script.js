const grid = document.getElementById('grid');
const search = document.getElementById('search');
let games = [];

async function loadGames() {
  try {
    const res = await fetch('data/games.json');
    if (!res.ok) throw new Error(res.status);
    games = await res.json();
    render(games);
  } catch (e) {
    console.error('games.json yüklenemedi', e);
    grid.innerHTML = '<p style="color:red; text-align:center; grid-column:1/-1;">Oyun listesi yüklenemedi.</p>';
  }
}

function render(list) {
  grid.innerHTML = '';
  list.forEach(g => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="${g.thumbnail}" alt="${g.name}" onerror="this.src='placeholder.png'">
      <div class="overlay">Oyunu Oyna</div>
      <div class="card-title">${g.name}</div>`;
    card.onclick = () => openGame(g.url);
    grid.appendChild(card);
  });
}

function openGame(url) {
  const iframe = document.createElement('iframe'); iframe.src = url;
  iframe.className = 'modal'; iframe.onclick = () => iframe.remove();
  document.body.appendChild(iframe);
}

loadGames();
search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  render(games.filter(g=>g.name.toLowerCase().includes(q)));
});
