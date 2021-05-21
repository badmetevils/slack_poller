import db from "..";
import {logger} from "@utility";
import { IUserModelInstance } from "@typing/model";

/**
 * Return  user
 */
const getAllUsersQuery = async (): Promise<IUserModelInstance[] | null | undefined> => {
  try {
    const user = await db.table.users.findAll({raw:true});
    return user;
  } catch (error) {
    logger.error(error);
  }
};

export default getAllUsersQuery;
