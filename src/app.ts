import { usersRoute } from "./routes/users.routes"
import "express-async-errors"
import express, { Application } from "express"
import { handleErrors } from "./errors"
import { loginRoute } from "./routes/login.routes"
import { categoriesRoute } from "./routes/categories.routes"
import { realEstateRoute } from "./routes/realEstate.routes"
import { schedulesRoute } from "./routes/schedules.routes"

export const app: Application = express()
app.use(express.json())

app.use("/users", usersRoute)
app.use("/login", loginRoute)
app.use("/categories", categoriesRoute)
app.use("/realEstate", realEstateRoute)
app.use("/schedules", schedulesRoute)

app.use(handleErrors)