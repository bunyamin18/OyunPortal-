fetch('/api/games')
  .then(res => res.json())
  .then(games => {
    const grid = document.getElementById('game-grid');
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <img src="${game.thumb}" alt="${game.name}">
        <div class="overlay"><span>Oyunu Oyna</span></div>
      `;
      card.onclick = () => window.open(game.url, '_blank');
      grid.appendChild(card);
    });
  });
