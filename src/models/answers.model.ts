import { Sequelize, DataTypes } from "sequelize";
import { IAnswerModelInstance } from "../typings/model";
import optionsModel from "./options.model";
import questionModel from "./questions.model";
import userModel from "./users.model";

const answerModel = (db: Sequelize) => {
  const answers = db.define<IAnswerModelInstance>("answers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    optionId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
    },
  });
  answers.belongsTo(questionModel(db), {
    foreignKey: "questionId",
  });
  answers.belongsTo(optionsModel(db), {
    foreignKey: "optionId",
  });

  return answers;
};
export default answerModel;
