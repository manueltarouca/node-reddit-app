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
  subreddit: 'censugal',
  results: 25,
  pollTime: 5000
};

const comments =  new CommentStream(client, streamOpts);
const submissions = new SubmissionStream(client, streamOpts);

submissions.on('item', (submission) => {
  //console.log(submission);
  if (submission.is_crosspostable){
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