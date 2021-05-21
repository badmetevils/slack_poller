import { DataTypeAbstract, ModelAttributeColumnOptions } from "sequelize";

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
  namespace NodeJS {
    interface ProcessEnv {
       PORT: string;
      HOST: string;
      SLACK_ACCESS_TOKEN: string;
      SLACK_SIGN_IN_SECRET: string;
      SLACK_USER_TOKEN: string;
      SLACK_BOT_ID: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_HOST: string;
      ACTION_ID: string;
      NODE_ENV: "development" | "production";
    }
  }
}
