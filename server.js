const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve front-end
app.use(express.static(path.join(__dirname, 'public')));
// Serve games as static
app.use('/games', express.static(path.join(__dirname, 'games')));

// API: List available games
app.get('/api/games', (req, res) => {
  const gamesDir = path.join(__dirname, 'games');
  fs.readdir(gamesDir, (err, folders) => {
    if (err) return res.status(500).json({ error: 'Unable to scan games folder' });
    const games = folders.filter(f => fs.statSync(path.join(gamesDir, f)).isDirectory()).map(folder => ({
      id: folder,
      name: folder.replace(/[-_]/g, ' '),
      url: `/games/${folder}/index.html`,
      thumb: `/games/${folder}/thumb.png`
    }));
    res.json(games);
  });
});

app.listen(PORT, () => console.log(`OyunPortalı running on http://localhost:${PORT}`));
