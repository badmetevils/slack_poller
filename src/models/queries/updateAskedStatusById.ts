import { IScheduleModelInstance } from "@typing/model";
import { logger } from "@utility";
import db from "..";

export const updateAskedStatusById = async ({
  questionId,
  isAsked,
}: {
  questionId: number;
  isAsked: boolean;
}): Promise<[number, IScheduleModelInstance[]] | undefined> => {
  try {
    const updatedRow = await db.table.schedule.update(
      { isAsked },
      {
        where: {
          questionId,
        },
      }
    );
    return updatedRow;
  } catch (error) {
    logger.error(`unable to update asked status for questionId ${questionId}`);
  }
};
export default updateAskedStatusById;