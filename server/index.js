const express = require('express');
const gh = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  gh.getReposByUsername(req.body.owner_name, (err, repos) => {
    if (err) {
      res.status(400).send('Error');
    } else {
      const added = repos.data.map((repo) => {
        const n = {
          id: repo.id,
          name: repo.name,
          owner_id: repo.owner.id,
          owner_name: repo.owner.login,
          owner_url: repo.owner.html_url,
          repo_url: repo.html_url,
          description: repo.description,
          forks_count: repo.forks_count
        };
        return n
      })
      db.save(added, (err) => {
        if (err) {
          res.status(400).send('error');
        } else {
          db.getTop25((err, repos) => {
            if (err) {
              res.status(400).send('error');
            } else {
              res.status(200).send(repos);
            }
          })
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  db.getTop25((err, repos) => {
    if (err) {
      res.status(400).send('error');
    } else {
      res.status(200).send(repos);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

