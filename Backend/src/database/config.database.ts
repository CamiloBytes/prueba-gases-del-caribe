import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    database:process.env.DB_NAME || 'prueba_gases_del_caribe',
    username:process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSAWORD || 'Qwe.123*',
    host:process.env.DB_HOST || 'localhost',
    port:Number(process.env.DB_PORT) || 5432,
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