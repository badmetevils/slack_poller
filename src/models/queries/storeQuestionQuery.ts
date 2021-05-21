import db from "..";
import {logger} from "@utility";
import { TypeQuestion } from "@typing/question";

const storeQuestionQuery = async (
  que: TypeQuestion
): Promise<{ status: boolean; message?: any }> => {
  try {
    const storedQuestion = await db.table.questions.create(
      { description: que.question,channel:que.channel },
      { raw: true }
    );
    const options = que.options?.map((o) => ({
      description: o,
      questionId: storedQuestion.id,
    }));

    await db.table.schedule.create({
      questionId: storedQuestion.id,
      scheduledAt: que.schedule_at,
      expiredIn: que.expire_in,
      expiredAt: "",
    });

    if (Array.isArray(options) && options.length) {
      await db.table.options.bulkCreate(options);
    }
    return { status: true };
  } catch (error) {
    logger.error(error);
    return { status: false, message: error };
  }
};

export default storeQuestionQuery;
