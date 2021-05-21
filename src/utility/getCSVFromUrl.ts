import time from "@lib/time";
import axios from "axios";
import * as path from "path";
import { storeDataToFile } from "./storeDataToFile";

export const getCSVFromUrl = async (url: string, useAuth = true): Promise<{
  status: "SUCCESS" | "FAILURE";
  path?: string;
} >=> {
  try {
    let headers = {};
    if (useAuth) {
      headers = { Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}` };
    }

    const csvName = `${time().format("DD-MMM-YYY__h-mm-ss-a")}.csv`;
    const filePath = path.join(__dirname, `../files/${csvName}`);

    const { data: csv = null } = await axios({
      url,
      headers,
    });
    return storeDataToFile(csv, filePath);
  } catch (error) {
    return {
      status: "FAILURE"
    };
  }
};
