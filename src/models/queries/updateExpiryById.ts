import { IScheduleModelInstance } from "@typing/model";
import { logger } from "@utility";
import db from "..";

export const updateExpiryById = async ({
  questionId,
  expiry,
}: {
  questionId: number;
  expiry: boolean;
}): Promise<[number, IScheduleModelInstance[]] | undefined> => {
  try {
    const updatedRow = await db.table.schedule.update(
      { isExpired: expiry },
      {
        where: {
          questionId,
        },
      }
    );
    return updatedRow;
  } catch (error) {
    logger.error(`unable to update Expiry for questionId ${questionId}`);
  }
};
export default updateExpiryById;