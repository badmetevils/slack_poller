import { Sequelize } from "sequelize";
import userModel from "./users.model";
import optionsModel from "./options.model";
import answerModel from "./answers.model";
import scheduleModel from "./schedule.model";
import questionModel from "./questions.model";


const {
  DB_USER = "root",
  DB_PASSWORD = "root",
  DB_NAME = "test_db",
  DB_PORT = "3306",
  DB_HOST = "localhost",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    dateStrings: true,
  },
  logging: false,
});


const db = {
  sequelize,
  dataType: Sequelize,
  table: {
    answers: answerModel(sequelize),
    options: optionsModel(sequelize),
    users: userModel(sequelize),
    questions: questionModel(sequelize),
    schedule: scheduleModel(sequelize),
  },
};

export default db;
