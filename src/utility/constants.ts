export const COUNT_EMONJI = {
  0: ":one:",
  1: ":two:",
  2: ":three:",
  3: ":four:",
  4: ":five:",
  5: ":six:",
  6: ":seven:",
  7: ":eight:",
  8: ":nine:",
  9: ":keycap_ten:",
};

export const APP_HOME_VIEW = {
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "A smart bot to create polls and survey (single and bulk) with the schedule  with expiry",
      },
    },
    {
      type: "divider",
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "How to create poll?",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "*_Inorder to create poll you need the follow the steps below_*",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            ":wave: Please make sure the poll creator/user must have admin access.",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "The format of the CSV be must be as follow with the defined headers feel free to copy the same",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "*NOTE:* \n The `expire_in` field in he CSV must be in seconds only.\n The `schedule_at` is the datetime and format must be  `yyyy-mm-dd hh:mm`",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            '```question,options,schedule_at,expire_in,channel\nWhat is one of the big differences between traditional media and social media?,"participatory production, social media reaches only a few people at a time, the management structure of the companies, traditional media offers no way for audiences to communicate with media producers",17-04-2021 22:20,10,random```',
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "The App must be added to the channel in which you want to publish/ask your poll\nin-order to upload poll go to any channel where the poller is added and type `create-poll` and attach the valid CSV file and send.\n once done you will be notified  and in case something is not right you will get a valid error message.",
        },
      ],
    },
    {
      type: "divider",
    },

    {
      type: "header",
      text: {
        type: "plain_text",
        text: "How to ask  for poll results?",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "*_In-order to get result of the published poll you need the follow the steps below_*",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            ":wave: Please make sure the poll creator/user must have admin access.",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            'go to the channel where poller is invited. click on the input box and type the command as follow `/poller-get-result {"from":"2021-04-05" , "to": "2021-04-15"}`',
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "*Please note the day difference between `from` and `to` date should not be greater than 30 days and `to` date must be greater than the `from` data and the date format must be `yyyy-mm-dd` and a  should be a valid JSON string.*",
        },
      ],
    },
  ],
};
