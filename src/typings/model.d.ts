import { Model, Optional } from "sequelize/types";

export interface IQuestionAttributes {
  id: number;
  description: string;
  channel: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IQuestionsCreationAttributes
  extends Optional<IQuestionAttributes, "id"> {}
export interface IQuestionModelInstance
  extends Model<IQuestionAttributes, IQuestionsCreationAttributes>,
    IQuestionAttributes {}

export interface IOptionsAttributes {
  id: number;
  questionId: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IOptionsCreationAttributes
  extends Optional<IOptionsAttributes, "id"|"createdAt"| "updatedAt"> {}
export interface IOptionsModelInstance
  extends Model<IOptionsAttributes, IOptionsCreationAttributes>,
    IOptionsAttributes {}

export interface IAnswerAttributes {
  id: number;
  questionId: number;
  optionId: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IAnswerCreationAttributes extends Optional<IAnswerAttributes, "id" | "createdAt"| "updatedAt"> {}
export interface IAnswerModelInstance
  extends Model<IAnswerAttributes, IAnswerCreationAttributes>,
    IAnswerAttributes {}

export interface IUserAttributes {
  id?: string;
  slackId: string;
  name: string;
  realName: string;
  isAdmin: boolean;
  isOwner: boolean;
  createdAt?: string;
  updatedAt?: string;
}
interface IUserCreationAttributes extends Optional<IUserAttributes, "id" | "createdAt"| "updatedAt"> {}
export interface IUserModelInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}

export interface IScheduleAttribute {
  id: number;
  questionId: number;
  scheduledAt: string;
  expiredIn: number;
  expiredAt: string;
  isAsked?: boolean;
  isExpired?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
interface IScheduleCreationAttributes
  extends Optional<IScheduleAttribute, "id" | "isExpired" | "createdAt"| "updatedAt"> {}
export interface IScheduleModelInstance
  extends Model<IScheduleAttribute, IScheduleCreationAttributes>,
    IScheduleAttribute {}
