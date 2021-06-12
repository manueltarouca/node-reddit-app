import * as dotenv from 'dotenv';
import { CommentStream, SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';

dotenv.config();

const creds = {
  userAgent: 'nodejs-app',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
}

const client = new Snoowrap(creds);

//const client = new Snoostorm(creds);

const streamOpts = {
  subreddit: 'portugal',
  results: 25,
  pollTime: 5000
};

const comments = new CommentStream(client, streamOpts);
const submissions = new SubmissionStream(client, streamOpts);

function mirror() {
  submissions.on('item', (submission) => {
    //console.log(submission);
    if (submission.is_crosspostable) {
      (<any>submission).submitCrosspost({
        subredditName: 'censugal',
        title: submission.title,
        sendReplies: false,
        resubmit: false
      });
      console.log('Submission by: ' + submission.author.name + ' was crossposted.');
    } else {
      console.log('Submission by: ' + submission.author.name + ' was not crossposted.');
    }
  });
}

function resetMySubmissions() {
  client.getUser('A_Besuga').getSubmissions({ results: 100 }).then(subs => {
    let total = subs.length;
    subs.forEach(sub => {
      sub.delete().then(() => {
        total--;
        console.log('deleted' + total)
      })
    })
  })
  // submissions.on('item', (submission) => {
  //   console.log('Removing item from ' + submission.author.name);
  //   submission.delete();

  // });
}

const reset = true;
reset ? resetMySubmissions() : mirror();