import db from "..";
import {logger} from "@utility";
import { Op } from "sequelize";
import { IScheduleAttribute } from "@typing/model";

export const getQuestionIdWithinDateRange = async ({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}): Promise<IScheduleAttribute[] | undefined> => {
  try {
    const storedQuestionId = await db.table.schedule.findAll({
      where: {
        scheduledAt: {
          [Op.between]: [fromDate, toDate],
        },
        isExpired: true,
        isAsked: true,
      },
      raw: true,
    });
    return storedQuestionId;
  } catch (error) {
    logger.error(error);
  }
};

export default getQuestionIdWithinDateRange;
