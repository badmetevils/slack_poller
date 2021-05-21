import db from "..";
import {logger} from "@utility";
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

export const getQuestionByIdQuery = async ({
  questionId,
}): Promise<IQuestion | undefined> => {
  try {
    const storedQuestion = await db.table.questions.findOne({
      where: { id: questionId },
      raw: true,
    });
    const storedSchedule = await db.table.schedule.findOne({
      where: { id: questionId },
      raw: true,
      attributes: ["scheduledAt", "expiredIn", "isAsked", "isExpired"],
    });
    if (storedQuestion && storedSchedule) {
      const options = await db.table.options.findAll({
        where: { questionId: storedQuestion.id },
        raw: true,
      });
      const answers = await db.table.answers.findAll({
        order: [['updatedAt', 'ASC']],
        where: {
          questionId: storedQuestion.id,
        },
        raw: true,
      });
      return {
        question: { ...storedQuestion, ...storedSchedule },
        options,
        answers,
      };
    }
  } catch (error) {
    logger.error(error);
  }
};

export default getQuestionByIdQuery;
