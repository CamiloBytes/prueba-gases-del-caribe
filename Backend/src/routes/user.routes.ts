import { Router } from "express";

import * as userControler from "../controllers/user.controllers.ts"

const route = Router()

route.get("/", userControler.getusers)
route.get("/:id", userControler.getusersId)
route.post("/", userControler.createUser)
route.post("/login", userControler.loginUser)
route.put("/:id", userControler.updateuser)
route.delete("/:id", userControler.deleteuser)

export default route
