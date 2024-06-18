import express from "express";
import { Request, Response } from "express";
import { TableName } from "../../types";
import { getAllUsersWithRelations } from "../../constants";
import { getUserById } from "../../database";
import {
  authorizationMiddleware,
  makeGenericGetRequest,
  makeGenericUpdateRequest,
} from "../../utils";

const TABLE: TableName = "users";
const GET_QUERY = getAllUsersWithRelations;

export const usersRouter = express.Router();
usersRouter.use(authorizationMiddleware);

usersRouter.get("/get", makeGenericGetRequest(TABLE, GET_QUERY));
usersRouter.post("/update", makeGenericUpdateRequest(TABLE, GET_QUERY));

usersRouter.get("/id", async (request: Request, response: Response) => {
  try {
    const userId = request.query.userId as string;
    const user = await getUserById(Number(userId));
    if (!user) throw new Error("Error");
    response.status(200).send(user);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});
