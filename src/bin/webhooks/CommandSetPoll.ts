import { getQuestionByIdQuery } from "./../../models/queries/getQuestionByIdQuery";
import { bolt } from "@bin/bolt";
import time from "@lib/time";
import {
  getAllUsersQuery,
  getQuestionIdWithinDateRange,
  getUserById,
} from "@models/queries";
import {
  getAnswerStringForCSV,
  isValidJSONString,
  logger,
  storeDataToFile,
} from "@utility";
import path from "path";
import { createReadStream } from "fs";

export default function CommandSetPoll() {
  const COMMAND_NAME = "/poller-get-result";
  try {
    bolt.command(COMMAND_NAME, async ({ ack, say, body, command,client }) => {
      await ack();
      try {
        const { user_id, text,channel_id,token } = command;
        const user = await getUserById(user_id);
        if (user) {
          if (user.isAdmin) {
            const isValidParams = isValidJSONString(text);
            if (isValidParams) {
              const params: { from: string; to: string } = JSON.parse(text);
              const { from, to } = params;
              const dateRegexFormat = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
              if (dateRegexFormat.test(from) && dateRegexFormat.test(to)) {
                const fromDate = time(from, "YYYY-MM-DD", true).format(
                  "YYYY-MM-DD"
                );
                const toDate = time(to, "YYYY-MM-DD", true).format(
                  "YYYY-MM-DD"
                );
                const diff = time(toDate).diff(fromDate, "days");
                const isValidRange = diff > 0 && diff < 31;
                if (isValidRange) {
                  const quids = await getQuestionIdWithinDateRange({
                    fromDate,
                    toDate,
                  });
                  const userList = await getAllUsersQuery();
                  const users = {};
                  if (Array.isArray(userList)) {
                    userList.forEach((user) => {
                      users[user.slackId] = user;
                    });
                  }

                  if (Array.isArray(quids) && quids.length) {
                    await say(":see_no_evil: we have received your request and processing the same. It may take a while")
                    const result = [
                      [
                        "QID",
                        "CHANNEL",
                        "SCHEDULED_ON",
                        "QUESTION",
                        "OPTIONS",
                        "VOTES",
                        "USERS",
                      ],
                    ];
                    for (let i = 0; i < quids.length; i++) {
                      const {
                        questionId,
                        scheduledAt,
                        expiredAt,
                        expiredIn,
                      } = quids[i];
                      const data = await getQuestionByIdQuery({ questionId });
                      if (data) {
                        try {
                          const { question, options, answers } = data;
                          if (
                            Array.isArray(answers) &&
                            Array.isArray(options) &&
                            question
                          ) {
                            const answerByUsers = getAnswerStringForCSV(
                              answers,
                              users
                            );
                            options.forEach((option) => {
                              const votes =
                                option.id in answerByUsers
                                  ? answerByUsers[option.id].length
                                  : 0;
                              const userNames =
                                option.id in answerByUsers
                                  ? answerByUsers[option.id].join("|")
                                  : "";
                              const entry = [
                                String(question.id).replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ),
                                String(question.channel).replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ),
                                String(
                                  time(question.scheduledAt).toMySqlDateTime()
                                ).replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ),
                                String(question.description).replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ),
                                String(option.description).replace(
                                  /(\r\n|\n|\r)/gm,
                                  ""
                                ),
                                String(votes).replace(/(\r\n|\n|\r)/gm, ""),
                                String(userNames).replace(/(\r\n|\n|\r)/gm, ""),
                              ];
                              result.push(entry);
                            });
                          }
                        } catch (error) {
                          logger.error(error);
                        }
                      }
                    }
                    const csvName = `quiz_report__${time().format(
                      "DD-MMM-YYYY__h-mm-ss-a"
                    )}.csv`;
                    const filePath = path.join(
                      __dirname,
                      `../../files/${csvName}`
                    );
                    const CSV = result.map((r) => r.join(", ")).join("\n");
                    const fileLocation = storeDataToFile(CSV, filePath);
                    if (fileLocation.status === "SUCCESS" && !!fileLocation.path) {
                      const result = client.files.upload({
                        token:process.env.SLACK_ACCESS_TOKEN,
                        channels: channel_id,
                        initial_comment: ":sunglasses: Here you go. download the report",
                        file: createReadStream(fileLocation.path),
                        filename: csvName
                      });
                    } else {
                      await say(":cold_face:Unable to create CSV. Please see logs for more details");
                    }
                  } else {
                    await say(
                      `:confused: No Data found for the specified date ranges`
                    );
                  }
                } else {
                  await say(
                    `<@${user_id}> Something is not right \n either the difference between dates is more than 30 or \`to\` date can't be less than \`from\` date`
                  );
                }
              } else {
                await say(
                  `<@${user_id}> Please enter valid date range eg. \n \`${COMMAND_NAME} {"from":"2021-05-01","to":"2021-05-15"}\``
                );
              }
            } else {
              await say(
                `<@${user_id}> Please enter valid command \n \`${COMMAND_NAME} {"from":"2021-05-01","to":"2021-05-15"}\``
              );
            }
          } else {
            await say(`<@${user_id}> :fearful: not Authorized\``);
          }
        }
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
}
