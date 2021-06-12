"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var snoostorm_1 = require("snoostorm");
var snoowrap_1 = __importDefault(require("snoowrap"));
dotenv.config();
var creds = {
    userAgent: 'nodejs-app',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
};
var client = new snoowrap_1.default(creds);
//const client = new Snoostorm(creds);
var streamOpts = {
    subreddit: 'portugal',
    results: 25,
    pollTime: 5000
};
var comments = new snoostorm_1.CommentStream(client, streamOpts);
var submissions = new snoostorm_1.SubmissionStream(client, streamOpts);
submissions.on('item', function (submission) {
    //console.log(submission);
    if (submission.is_crosspostable) {
        submission.submitCrosspost({
            subredditName: 'censugal',
            title: submission.title,
            sendReplies: false,
            resubmit: false
        });
        console.log('Submission by: ' + submission.author.name + ' was crossposted.');
    }
    else {
        console.log('Submission by: ' + submission.author.name + ' was not crossposted.');
    }
});
