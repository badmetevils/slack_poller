import { TypeQuestion } from "../typings/question";
import { logger } from "@utility";

type TypeJSON = { [key: string]: any };

export const sanitizeJSONFromCSV = (
  json: TypeJSON[]
): TypeQuestion[] | undefined => {
  const allowedHeader = [
    "question",
    "options",
    "schedule_at",
    "expire_in",
    "channel",
  ];
  const jsonKeys = Object.keys(json[0]);
  const hasValidHeaders = allowedHeader.every((ah) => jsonKeys.includes(ah));

  if (hasValidHeaders) {
    //@ts-ignore
    return json.map((j) => {
      const options = String(j?.options).split("|");
      return {
        ...j,
        options,
      };
    });
  } else {
    const errorMessage = `CSV headers are not valid expected ${allowedHeader.join(
      ", "
    )} but get ${jsonKeys.join(", ")}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};
