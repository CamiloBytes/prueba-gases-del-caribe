import express from 'express';
import userRoutes from './src/routes/user.routes.ts'
import documentTypeRoutes from './src/routes/documentType.routes.ts'
import { connectDB, sequelize } from './src/database/config.database.ts';
import cors from 'cors'


const app = express()
app.use(cors())

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/document-types", documentTypeRoutes)

 connectDB()

sequelize.sync({force: false}).then(()=>{
    console.log("Modelos cargados");
 })

export default app