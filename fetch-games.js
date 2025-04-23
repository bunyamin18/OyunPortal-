// Node script for GitHub Action
const fs = require('fs');
const fetch = require('node-fetch');
const API_KEY = process.env.RAWG_API_KEY;
const OUT = 'data/games.json';

async function fetchAll() {
  let all = [], page = 1;
  while (page <= 20) { // 20×200 ≈4000 games
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=200&page=${page}`
    );
    const json = await res.json();
    all.push(...json.results.map(g=>({
      name: g.name,
      thumbnail: g.background_image,
      url: `https://rawg.io/games/${g.slug}/play`
    })));
    page++;
  }
  fs.writeFileSync(OUT, JSON.stringify(all, null, 2));
}
fetchAll();
