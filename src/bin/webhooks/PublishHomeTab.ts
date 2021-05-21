import { bolt } from "@bin/bolt";
import { APP_HOME_VIEW } from "@utility";

const PublishHomeTab = async () => {
  try {
    const { SLACK_ACCESS_TOKEN, SLACK_BOT_ID } = process.env;
    if (SLACK_ACCESS_TOKEN && SLACK_BOT_ID) {
      const response = await bolt.client.views.publish({
        token: SLACK_ACCESS_TOKEN,
        user_id: SLACK_BOT_ID,
        view: {
          type: "home",
          blocks: APP_HOME_VIEW.blocks,
        },
      });
    }
  } catch (error) {
    console.log({ error });
  }
};
export default PublishHomeTab;
