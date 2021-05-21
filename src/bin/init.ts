import {logger} from "@utility";
import { bolt } from "@bin/bolt";
import db from "@models/index";
import RunCronTask from "./cron";
import {
  CommandSetPoll,
  getUserList,
  listenMessage,
  ListenUserAction,
  PublishHomeTab,
  TeamJoined,
} from "@bin/webhooks";
import { storeUsersInBulkQuery } from "@models/queries";

export default class Init {
  async connect() {
    await this.DatabaseConnect();
    await this.BoltConnect();
  }

  async start() {
    try {
      const members = await getUserList();
      if (members) {
        storeUsersInBulkQuery(members);
      }
      RunCronTask();
      listenMessage();
      ListenUserAction();
      TeamJoined();
      PublishHomeTab();
      CommandSetPoll();
    } catch (error) {}
  }

  private async DatabaseConnect() {
    try {
      const response = await db.sequelize.sync({
        force: process.env.NODE_ENV === "development",
      });
      console.log("🛹  Database is connected and working fine");
    } catch (error) {
      console.log("🤷‍♂️  Database is not reachable");
      logger.error(error);
    }
  }

  private async BoltConnect() {
    try {
      const port = Number(process.env.PORT || 3000);
      await bolt.start(port);
      console.log(`⚡  Bolt app is running! port ${port}`);
    } catch (error) {
      console.log(`😵  Unable to connect to slack via Bolt`);
      logger.error(error);
    }
  }
}
