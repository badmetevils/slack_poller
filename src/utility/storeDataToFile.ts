import fs from "fs";

type TStoreData = {
  status: "SUCCESS" | "FAILURE";
  path?: string;
};
export const storeDataToFile = (data: string, path: string): TStoreData => {
  try {

    fs.writeFileSync(path, data);
    return {
      status: "SUCCESS",
      path,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "FAILURE",
    };
  }
};
