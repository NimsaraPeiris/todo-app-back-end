import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "todo_app",
  logging: false,
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Connected to MySQL Database");
  } catch (error) {
    console.error("❌ Error connecting to MySQL:", error);
    process.exit(1);
  }
};

export default sequelize;
