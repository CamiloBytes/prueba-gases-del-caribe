import { Router } from "express";
import * as documentTypeController from "../controllers/documentType.controllers.ts";

const route = Router();

route.get("/", documentTypeController.getDocumentTypes);

export default route;
