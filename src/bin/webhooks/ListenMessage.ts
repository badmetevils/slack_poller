import { getUserById } from "@models/queries";
import { storeQuestionQuery } from "@models/queries";
import { bolt } from "@bin/bolt";
import { getCSVFromUrl } from "@utility";
import CSV from "csvtojson";
import { sanitizeJSONFromCSV } from "../../utility/sanitizeJSONFromCSV";

export default function listenMessage() {
  try {
    bolt.message("create-poll", async ({ message, say, client }) => {
      // console.log({ message });
      const { user: userId, files = [], ts, channel } = JSON.parse(
        JSON.stringify(message)
      );

      const user = await getUserById(userId);
      if (user?.isAdmin) {
        await say(
          `:wave: Request received\n:hourglass_flowing_sand: Poll creation is in progress\nYou will be notify shortly once done <@${message.user}>`
        );
        const csvUrls: string[] = files
          .map(({ mimetype, filetype, url_private_download }: any) => {
            if (
              mimetype === "text/csv" &&
              String(filetype).toLowerCase() === "csv"
            ) {
              return url_private_download as string;
            }
          })
          .filter(Boolean);

        if (csvUrls.length) {
          for (let i = 0; i < csvUrls.length; i++) {
            try {
              const { status, path } = await getCSVFromUrl(csvUrls[i]);
              if (status === "SUCCESS" && path) {
                try {
                  const json = await CSV().fromFile(path);
                  const questions = sanitizeJSONFromCSV(json);
                  if (Array.isArray(questions) && questions.length) {
                    for (let k = 0; k < questions.length; k++) {
                      try {
                        const { status, message } = await storeQuestionQuery(
                          questions[k]
                        );
                        if (!status) {
                          await say(
                            `<@${userId}> Something is not right\n Please find the error below ${JSON.stringify(
                              message
                            )}`
                          );
                        }
                      } catch (error) {
                        await say(
                          `<@${userId}> Unable to Store question \n Some Entries in CSV seems invalid please recheck`
                        );
                      }
                    }
                    await say(
                      `:white_check_mark:  Questions has been stored successfully. <@${userId}>`
                    );
                  }
                } catch (error) {
                  console.log(error);
                  await say(
                    `:no_entry:<@${userId}> Some Entries in CSV seems invalid please recheck \n\n *ERROR: ${error.message}*`
                  );
                }
              } else {
                await say(`:no_entry:<@{userId}>Seems like Uploaded CSV is not valid check logs for more details`);
              }
            } catch (error) {
              await say(
                `:no_entry:<@${userId}> Some Entries in CSV seems invalid please recheck`
              );
            }
          }
        } else {
          await say(`:no_entry:<@${userId}> Please attach a CSV file`);
        }
      } else {
        await say(`:no_entry:<@${userId}> You are not authorized to setup quiz`);
      }

      try {
        await client.chat.delete({
          token: process.env.SLACK_USER_TOKEN,
          ts,
          channel,
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    throw error;
  }
}
