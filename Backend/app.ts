import express from 'express';
import userRoutes from './src/routes/user.routes'
import { connectDB, sequelize } from './src/database/config.database';
import cors from 'cors'


const app = express()
app.use(cors())

app.use(express.json())
app.use("/api/users", userRoutes)

// connectDB()

// sequelize.sync({alter: true}).then(()=>{
//     console.log("Modelos cargados");

// })

export default app