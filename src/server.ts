import express from "express"
import { createConnection } from "typeorm"
import "reflect-metadata"
import { router } from "./routes"
import dotenv from "dotenv"
dotenv.config()

createConnection()
const server = express()
server.use(express.json())
server.use(router)

server.listen(process.env.PORT || 3000)
