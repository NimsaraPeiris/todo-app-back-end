import { Model, DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { ITodo, ITodoCreationAttributes } from "../interfaces/todo.interface";

class Todo extends Model<ITodo, ITodoCreationAttributes> implements ITodo {
  public id!: number;
  public task!: string;
  public description?: string;
  public completed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "todos",
  }
);

export default Todo;
