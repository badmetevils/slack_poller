import db from "..";
import {logger} from "@utility";
import { IUserModelInstance, IUserAttributes } from "@typing/model";

/**
 * Return Store users 
 */
const storeUsersQuery = async (
  users: IUserAttributes
): Promise<IUserModelInstance | undefined> => {
  try {
    return await db.table.users.create(users);
  } catch (error) {
    logger.error(error);
  }
};

export default storeUsersQuery;
