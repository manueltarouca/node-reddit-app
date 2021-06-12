require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const client = new Snoowrap({
  userAgent: 'nodejs-app',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

//const client = new Snoostorm(creds);

const streamOpts = {
  subreddit: 'portugal',
  results: 25,
  pollTime: 2000
};

const comments = new Snoostorm.CommentStream(client, streamOpts);
const submissions = new Snoostorm.SubmissionStream(client, streamOpts);

submissions.on('item', (comment) => {
  console.log(comment);
});