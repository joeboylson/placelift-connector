import express from "express";
import { TableName } from "queries";
import {
  makeGenericGetRequest,
  makeGenericUpdateRequest,
} from "../../utils/router";

const TABLE: TableName = "users";
const GET_QUERY = "*, user_homes(*), user_requests(*)";

const usersRouter = express.Router();

usersRouter.get("/get", makeGenericGetRequest(TABLE, GET_QUERY));
usersRouter.get("/update", makeGenericUpdateRequest(TABLE));

export default usersRouter;
