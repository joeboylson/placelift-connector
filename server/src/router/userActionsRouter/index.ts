import express from "express";
import { Request, Response } from "express";
import { TableName } from "queries";
import {
  makeGenericGetRequest,
  makeGenericUpdateRequest,
} from "../../utils/router";
import supabase from "../../utils/supabase";
import { Database, Tables } from "supabase";

const TABLE: TableName = "user_actions";
const GET_QUERY =
  "*, sender:sender_id(*), action_type:action_type_id(*), user:user_id(*)";

const userActionsRouter = express.Router();

userActionsRouter.get("/get", makeGenericGetRequest(TABLE, GET_QUERY));
userActionsRouter.get("/update", makeGenericUpdateRequest(TABLE));

userActionsRouter.post(
  "/blank-bot-message",
  async (request: Request, response: Response) => {
    try {
      const { id } = request.body;

      const blankBotMessage: Database["public"]["Tables"]["user_actions"]["Insert"] =
        {
          action_type_id: 1,
          sender_id: 0,
          user_id: id,
        };

      const { data: _, error } = await supabase
        .from("user_actions")
        .insert(blankBotMessage);

      if (error) throw new Error(error.message);
      response.status(200).send("OK");
    } catch (error) {
      console.error(error);
      response.status(500).send("error");
    }
  }
);

export default userActionsRouter;
