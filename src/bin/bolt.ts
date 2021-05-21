import { App, LogLevel } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_ACCESS_TOKEN,
  signingSecret: process.env.SLACK_SIGN_IN_SECRET,
  // logLevel: LogLevel.DEBUG,
});

export { app as bolt };
