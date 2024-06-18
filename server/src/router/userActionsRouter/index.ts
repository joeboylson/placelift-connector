import express from "express";
import { Request, Response } from "express";
import { TableName } from "queries";
import { getFilteredUserActionsByKey } from "../../database";
import { getAllUserActionsWithRelations } from "../../constants";
import {
  authorizationMiddleware,
  makeGenericGetRequest,
  makeGenericInsertRequest,
  makeGenericUpdateRequest,
} from "../../utils";

const TABLE: TableName = "user_actions";
const GET_QUERY = getAllUserActionsWithRelations;
export const userActionsRouter = express.Router();
userActionsRouter.use(authorizationMiddleware);

userActionsRouter.get("/get", makeGenericGetRequest(TABLE, GET_QUERY));
userActionsRouter.post("/update", makeGenericUpdateRequest(TABLE, GET_QUERY));
userActionsRouter.post("/insert", makeGenericInsertRequest(TABLE, GET_QUERY));

userActionsRouter.get(
  "/filter",
  async (request: Request, response: Response) => {
    try {
      const key = request.query.key as string;
      const value = request.query.value as string;
      const data = await getFilteredUserActionsByKey(key, value);
      if (!data) throw new Error("Error");
      response.status(200).send(data);
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  }
);
