import { Sequelize, DataTypes } from "sequelize";
import { IUserModelInstance } from "../typings/model";

const userModel = (db: Sequelize) =>
  db.define<IUserModelInstance>("users", {
    id: {
      type: DataTypes.INTEGER,
      field: "id",
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    slackId: {
      type: DataTypes.STRING,
      field: "slackId",
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
      allowNull: true,
    },
    realName: {
      type: DataTypes.STRING,
      field: "realName",
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: "isAdmin",
      allowNull: true,
      defaultValue: false,
    },
    isOwner: {
      type: DataTypes.BOOLEAN,
      field: "isOwner",
      allowNull: true,
      defaultValue: false,
    },
  });

export default userModel;
