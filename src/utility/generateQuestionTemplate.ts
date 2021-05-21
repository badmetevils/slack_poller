import time from "@lib/time";
import {
  IAnswerAttributes,
  IOptionsAttributes,
  IQuestionAttributes,
  IScheduleAttribute,
} from "@typing/model";

interface IQuestionAndSchedule
  extends IScheduleAttribute,
    IQuestionAttributes {}
interface IQuestion {
  question: IQuestionAndSchedule;
  options: IOptionsAttributes[];
  answers: IAnswerAttributes[];
}

export const generateQuestionTemplate = ({
  question,
  answers,
  options,
}: IQuestion) => {
  const questionTitle = {
    type: "header",
    text: {
      type: "plain_text",
      text: `#${question.id} ${question.description}`,
    },
  };

  const optionsContext = options.map((option, index) => {
    let count = 0;
    const mentions: string[] = [];
    let fastestTimeStamp: string = "";
    answers.forEach((ans, i) => {
      if (ans.optionId === option.id) {
        count++;
        mentions.push(`<@${ans.userId}>`);
        if (i == 0) {
          fastestTimeStamp = ans?.updatedAt || "";
        }
      }
    });

    const button = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${index + 1}: ${option.description.replace(
          /(\r\n|\n|\r)/gm,
          ""
        )}*`,
      },
      accessory: {
        type: "button",
        action_id: `${process.env.ACTION_ID}`,
        text: {
          type: "plain_text",
          emoji: true,
          text: count ? `Vote :thumbsup: ${count}` : `Vote`,
        },
        value: JSON.stringify(option),
      },
    };

    const context = {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: mentions.join(" "),
        },
      ],
    };

    if (question.isExpired) {
      const timeGap = time(fastestTimeStamp).diff(question.scheduledAt,"second");
      const ctx = [
        {
          type: "mrkdwn",
          text: `*${count} Votes*`,
        },
        {
          type: "mrkdwn",
          text: `Fastest answer by ${mentions[0]}  in ${timeGap} seconds`,
        },
      ];
      context.elements = [...context.elements, ...ctx];
      //@ts-ignore
      delete button.accessory;
    }

    if (count == 0) {
      return [button];
    }
    return [button, context];
  });

  const optionDetails = optionsContext.reduce((acc, curVal) => {
    return acc.concat(curVal);
  }, []);

  if (question.isExpired) {
    return {
      blocks: [
        questionTitle,
        ...optionDetails,
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: "This Poll has ended",
              emoji: true,
            },
          ],
        },
      ],
    };
  }
  return {
    blocks: [questionTitle, ...optionDetails],
  };
};
