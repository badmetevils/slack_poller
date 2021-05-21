import { IAnswerAttributes } from "@typing/model";

const getAnswerStringForCSV = (
  ans: IAnswerAttributes[],
  user: { [key: string]: any }
): { [key: string]: Array<string> } => {
  const result = {};

  ans.forEach((a) => {
    if (!(a.optionId in result)) {
      result[a.optionId] = [user[a.userId]?.realName];
    } else {
      result[a.optionId].push(user[a.userId]?.realName);
    }
  });

  return result;
};
export { getAnswerStringForCSV };
