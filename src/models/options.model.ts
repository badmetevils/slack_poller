import { Sequelize, DataTypes } from 'sequelize';
import { IOptionsModelInstance } from '../typings/model';
import questionModel from './questions.model';

const optionsModel = (db: Sequelize) => {
  const options = db.define<IOptionsModelInstance>(
    'options',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
        allowNull: false,
      },
      questionId: {
        type:DataTypes.INTEGER
      }
    },
   );
   options.belongsTo(questionModel(db), {
    foreignKey:"questionId"
  });
  return options;
};
export default optionsModel;
