import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password: process.env.DB_PASSAWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    dialect: "postgres"
})

export const connectDB = async () => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}