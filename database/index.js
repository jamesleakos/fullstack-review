const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  owner_id: Number,
  owner_name: String,
  owner_url: String,
  repo_url: String,
  description: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  Repo.collection.insertMany(repos, (err, output) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

let getTop25 = (callback) => {
  Repo.find({})
    .sort({'forks_count': -1})
    .limit(25)
    .exec((err, repos) => {
      if (err) {
        callback(err);
      } else {
        callback(null, repos);
      }
    });
}

module.exports.save = save;
module.exports.getTop25 = getTop25;