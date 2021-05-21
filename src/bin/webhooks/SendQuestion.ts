import { bolt } from "@bin/bolt";
import { getQuestionByIdQuery } from "@models/queries";
import { logger, generateQuestionTemplate } from "@utility";

const SendQuestion = async ({
  questionId,
}): Promise<{ sent: boolean; response?: { [key: string]: any } }> => {
  const poll = await getQuestionByIdQuery({ questionId });
  if (poll) {
    try {
      const template = generateQuestionTemplate(poll);
      const response = await bolt.client.chat.postMessage({
        token: process.env.SLACK_ACCESS_TOKEN,
        channel: poll.question.channel,
        text: "",
        blocks: template.blocks,
      });
      // console.log({ sent: response });
      if (response.ok) {
        return { sent: true, response };
      } else {
        return { sent: false };
      }
    } catch (error) {
      logger.error(`Unable to send message ${error}`);
      return { sent: false };
    }
  } else {
    logger.error(`Unable fetch question from Database`);
    return { sent: false };
  }
};
export default SendQuestion;
