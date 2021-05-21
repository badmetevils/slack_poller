import { Sequelize, DataTypes } from "sequelize";
import { IQuestionModelInstance } from "../typings/model";

const questionModel = (db: Sequelize) => {
  const question = db.define<IQuestionModelInstance>(
    "questions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
        allowNull: false,
      },
      channel: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "channel",
      }
    },
  );

  return question;
}


export default questionModel;
