import { bolt } from "@bin/bolt";
import { storeUsersQuery } from "@models/queries";

const TeamJoined = () => {
  bolt.event("team_join", async ({ event, client }) => {
    try {
      const { user } = event;
      const {
        id,
        name,
        real_name: realName,
        is_admin: isAdmin,
        is_owner: isOwner,
      }: any = user;
      console.log({ event });
      await storeUsersQuery({ slackId: id, realName, isAdmin, isOwner, name });
    } catch (error) {
      console.error(error);
    }
  });
};
export default TeamJoined;