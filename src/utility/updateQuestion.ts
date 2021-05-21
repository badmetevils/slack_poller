import { logger } from '@utility';
import axios from "axios";

interface IUpdateQuestion {
  url: string;
  blocks: any;
  text: string;
}

export const updateQuestion = async ({ url, blocks, text }:IUpdateQuestion):Promise<any|undefined> => {
  try {
    const response = await axios.post(
      url,
      {
        replace_original: true,
        blocks,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    logger.error(`Unable to Update template ${JSON.stringify(error)}`);
  }
};
