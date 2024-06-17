import express from "express";
import { getAllUserRequestWithRelations } from "../../constants";
import {
  authorizationMiddleware,
  makeGenericGetRequest,
  makeGenericUpdateRequest,
} from "../../utils";

const TABLE = "user_requests";
const QUERY = getAllUserRequestWithRelations;

export const requestsRouter = express.Router();
requestsRouter.use(authorizationMiddleware);

requestsRouter.get("/get", makeGenericGetRequest(TABLE, QUERY));
requestsRouter.post("/update", makeGenericUpdateRequest(TABLE, QUERY));
