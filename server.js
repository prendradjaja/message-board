const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const DB_PATH = './database/sqlite3';

const db = new sqlite3.Database(DB_PATH, startApp);

async function startApp() {
  const app = express();
  app.use(express.json());
  const PORT = process.env.PORT || 4001;

  app.use(express.static('public'));

  app.get('/api/messages', async (req, res) => {
    await fakeNetworkDelay();
    db.all('SELECT timestamp, author, body FROM messages ORDER BY timestamp DESC;', (err, rows) => {
      res.send(rows);
      // TODO error handling
    });
  });

  app.put('/api/messages', async (req, res) => {
    await fakeNetworkDelay();
    let { author, body } = req.body;
    author = author || 'Unknown';
    const timestamp = new Date().toISOString();
    // TODO use prepared statement
    const command = `
      INSERT INTO messages (timestamp, author, body)
      VALUES ("${timestamp}", "${author}", "${body}");
    `;
    console.log(command, req.body)
    db.run(command, (err) => {
      res.send("done");
      // TODO error handling
    });
  });

  app.listen(PORT, () => console.log('Example app listening at http://localhost:'+PORT))
}

function fakeNetworkDelay() {
  return wait(0);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
