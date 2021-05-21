import time from "@lib/time";
import { Sequelize, DataTypes } from "sequelize";
import { IScheduleModelInstance } from "../typings/model";
import questionModel from "./questions.model";

const scheduleModel = (db: Sequelize) => {
  const scheduler = db.define<IScheduleModelInstance>("schedule", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    scheduledAt: {
      type: DataTypes.DATE,
      field: "scheduledAt",
      allowNull: false,
      get() {
        const t = time(this.getDataValue("scheduledAt"));
        return time(t.clone().utcOffset(0, false))
          .clone()
          .utcOffset(330, false)
          .toMySqlDateTime()
          .toString();
      },
      set(valueToBeSet: string) {
        const value = time(valueToBeSet,"YYYY-MM-DD HH:mm:ss")
          .utcOffset(330, false)
          .toMySqlDateTime()
          .toString();
        // console.log({sch:valueToBeSet,value,tt:time(valueToBeSet)})
        return this.setDataValue("scheduledAt", value);
      },
    },
    expiredIn: {
      type: DataTypes.INTEGER,
      field: "expiredIn",
      defaultValue: 300,
    },
    expiredAt: {
      type: DataTypes.DATE,
      field: "expiredAt",
      allowNull: false,
      get() {
        const t = time(this.getDataValue("expiredAt"));
        return time(t.clone().utcOffset(0, false))
          .clone()
          .utcOffset(330, false)
          .toMySqlDateTime()
          .toString();
      },
      set(valueToBeSet: string) {
        const expiredIn = this.getDataValue("expiredIn");
        const scheduledAt = this.getDataValue("scheduledAt");
        // console.log({expiredIn, scheduledAt})
        const value = time(scheduledAt,"YYYY-MM-DD HH:mm:ss")
          .add(expiredIn, "s")
          .utcOffset(330, false)
          .toMySqlDateTime()
          .toString();
        return this.setDataValue("expiredAt", value);
      },
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field:"isExpired"
    },
    isAsked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field:"isAsked"
    }
  });
  scheduler.belongsTo(questionModel(db), {
    foreignKey: "questionId",
  });
  return scheduler;
};
export default scheduleModel;
