import { logger,generateQuestionTemplate } from '@utility';
import { bolt } from "@bin/bolt";
import { getQuestionByIdQuery } from "@models/queries";

const UpdateMessage = async ({ questionId, ts, channel }) => {
  try {
    const poll = await getQuestionByIdQuery({ questionId });
    if (poll) {
      const template = generateQuestionTemplate(poll);
      const update = await bolt.client.chat.update({
        token: process.env.SLACK_ACCESS_TOKEN,
        ts,
        channel,
        text: "",
        blocks: template.blocks,
      });
      
    }
  } catch (error) {
    logger.error(`Unable to update message ${error}`)
  }
};

export default UpdateMessage;