import "express-async-errors"
import express, { Application } from "express"
import { handleErrors } from "./errors"

export const app: Application = express()
app.use(express.json())

app.use(handleErrors)