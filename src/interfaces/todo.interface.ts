import { Optional } from "sequelize";

export interface ITodo {
  id?: number;
  task: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITodoCreationAttributes extends Optional<ITodo, "id"> {}