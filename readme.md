# Poller : A smart slack polling app

> Poller is a smart slack bot that  publish polls and save user response to the  desired slack channel.

## Features
- Schedule Polls 
- Polls Bulk Creation 
- CSV export of the expired/answered poll
- Polls with expiry feature
- Unlimited options for the polls
- Emonji support in Questions and options

## Applications
- Can be used to create a scheduled fun activities in  team. eg who will win the IPL today RCB or CSK?
- Can be used to create Survey

## How it works
- Create a Slack app with appropite scopes and add BOT token into the `.env` file 
- Add the bot into the channle where you want to publish poll 
- Type `create-poll` and attached a appropirate CSV with the defined format (Watch APP home section for this).
- It will schedule the polls and save user responses with in the expiry time
