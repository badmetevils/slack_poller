import { SendQuestion, UpdateMessage } from "@bin/webhooks";
import time from "@lib/time";
import {
  getQuestionIdFromTimeStamp,
  updateAskedStatusById,
  updateExpiryById,
} from "@models/queries";
import cron from "node-cron";

export default function RunCronTask() {
  cron.schedule("* * * * *", async () => {
    try {
      const currentTimeStamp = time().format("YYYY-MM-DD HH:mm:ss").toString();
      const quids = await getQuestionIdFromTimeStamp(currentTimeStamp);
      // console.log(quids);
      if (Array.isArray(quids) && quids.length) {
        quids.map(({ questionId, expiredIn }) => {
          SendQuestion({ questionId }).then(({ sent, response }) => {
            if (sent) {
              // console.log(response);
              updateAskedStatusById({ questionId, isAsked: true });
              setTimeout(() => {
                (async (questionId,response) => {
                  await updateExpiryById({ questionId, expiry: true });
                  await UpdateMessage({
                    questionId,
                    ts: response?.ts,
                    channel: response?.channel,
                  });
                })(questionId,response);
              }, expiredIn * 1000);
            }
          });
        });
      }
    } catch (error) {}
  });
}
