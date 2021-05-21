import db from "..";
import {logger} from "@utility";
import { IUserModelInstance } from "@typing/model";

/**
 * Return  user
 */
const getUserById = async (
  id: string
): Promise<IUserModelInstance | null | undefined> => {
  try {
    const user = await db.table.users.findOne({ where: { slackId: id },raw:true });
    return user;
  } catch (error) {
    logger.error(error);
  }
};

export default getUserById;
