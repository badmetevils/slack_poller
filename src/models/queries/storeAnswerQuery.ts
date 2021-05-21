import db from "..";
import {logger} from "@utility";

const storeAnswerQuery = async ({ optionId, questionId, userId }) => {
  try {
    const existingAnswer = await db.table.answers.findOne({
      where: {
        userId,
        questionId,
      },
    });
    if (existingAnswer) {
      await db.table.answers.update(
        { optionId, questionId, userId },
        {
          where: {
            userId,
            questionId,
          },
        }
      );
    } else {
      await db.table.answers.create({ optionId, questionId, userId });
    }
  } catch (error) {
    logger.error(error);
  }
};

export default storeAnswerQuery;
