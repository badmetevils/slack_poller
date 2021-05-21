import { bolt } from "@bin/bolt";
import { WebAPICallResult } from "@slack/web-api";
import { IMemberUserList } from "@typing/member";

export default function listenMention() {
  try {
    bolt.event(
      "app_mention",
      async ({
        event,
        client,
      }) => {
        // console.log({ mention: { event, client } });
      }
    );
  } catch (error) {
    throw error;
  }
}
