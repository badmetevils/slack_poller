import db from "..";
import {logger} from "@utility";
import { IUserModelInstance, IUserAttributes } from "@typing/model";

/**
 * Return Store users in bulk
 * @returns {(Promise<[IUserModelInstance[]] | undefined>)}
 */
const storeUsersInBulkQuery = async (
  users: IUserAttributes[]
): Promise<IUserModelInstance[] | undefined> => {
  try {
    return await db.table.users.bulkCreate(users, {
      updateOnDuplicate: ["isAdmin", "realName", "isOwner", "name"],
    });
  } catch (error) {
    logger.error(error);
  }
};

export default storeUsersInBulkQuery;
