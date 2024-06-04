import express from "express";
import {
  makeGenericGetRequest,
  makeGenericUpdateRequest,
} from "../../utils/router";

const TABLE = "user_requests";
const GET_QUERY =
  "*, user:users(*), room_type:room_types(*), status_type:status_types(*), update_types(*)";

const requestsRouter = express.Router();

requestsRouter.get("/get", makeGenericGetRequest(TABLE, GET_QUERY));
requestsRouter.post("/update", makeGenericUpdateRequest(TABLE));

export default requestsRouter;
