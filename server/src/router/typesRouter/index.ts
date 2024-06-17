import express from "express";
import { makeGenericGetRequest, authorizationMiddleware } from "~/utils";
import { TableName } from "~/types";

const tables: TableName[] = [
  "action_types",
  "event_types",
  "preferred_contact_method_types",
  "product_status_types",
  "room_types",
  "status_types",
  "timing_option_types",
  "update_types",
];

export const typesRouter = express.Router();
typesRouter.use(authorizationMiddleware);

tables.forEach((table) => {
  typesRouter.get(`/${table}/get`, makeGenericGetRequest(table, "*"));
});
