import db from "..";
import {logger} from "@utility";
import { Op } from "sequelize";
import { IScheduleAttribute } from "@typing/model";

export const getQuestionIdFromTimeStamp = async (
  ts: string
): Promise<IScheduleAttribute[] | undefined> => {
  try {
    const storedQuestionId = await db.table.schedule.findAll({
      where: {
        scheduledAt: {
          [Op.lte]: ts,
        },
        isExpired: false,
        isAsked:false
      },
      raw: true,
    });
    return storedQuestionId;
  } catch (error) {
    logger.error(error);
  }
};

export default getQuestionIdFromTimeStamp;
