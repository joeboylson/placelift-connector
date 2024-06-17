import express from "express";

import {
  authenticationRouter,
  requestsRouter,
  usersRouter,
  userActionsRouter,
  typesRouter,
  setStaticFolder,
} from "./router";

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authenticationRouter);
app.use("/api/user_requests", requestsRouter);
app.use("/api/users", usersRouter);
app.use("/api/user_actions", userActionsRouter);
app.use("/api", typesRouter);

setStaticFolder(app);

app.listen(SERVER_PORT, () => console.info(`>>> ${SERVER_PORT}`));
