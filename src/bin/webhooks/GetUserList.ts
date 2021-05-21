import { bolt } from '@bin/bolt';
import { WebAPICallResult } from '@slack/web-api';
import { IMemberUserList } from '@typing/member';
import { IUserAttributes } from '@typing/model';

interface IUserList extends WebAPICallResult {
  members?: IMemberUserList[];
}

export default async function getUserList(): Promise<IUserAttributes[] | undefined> {
  try {
    const result: IUserList = await bolt.client.users.list({
      token: process.env.SLACK_ACCESS_TOKEN
    });
    if (result.ok) {
      const members:IUserAttributes[] = [];
      result.members?.forEach(d => {
        if (!d.is_bot && !d.deleted) {
          members.push({
            slackId:d.id,
            name:d?.name || "",
            realName:d?.real_name || "",
            isAdmin: d.is_admin,
            isOwner: d.is_owner
         })
       }});
      return members;
    }
  } catch (error) {
    throw error;
  }
}
