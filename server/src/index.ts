import express, { Response } from "express";
import path from "path";
import apiRouter from "./router/apiRouter";
import authenticationRouter from "./router/authenticationRouter";
import requestsRouter from "./router/requestsRouter";
import usersRouter from "./router/usersRouter";
import userActionsRouter from "./router/userActionsRouter";

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api", apiRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/user-requests", requestsRouter);
app.use("/api/users", usersRouter);
app.use("/api/user-actions", userActionsRouter);

// public folder
app.use(express.static(path.join(__dirname, "./public")));
app.use((_, response: Response) => {
  const isProduction = process.env.MODE === "production";

  if (isProduction) {
    const frontEndPath = path.join(__dirname, "./public/index.html");
    return response.sendFile(frontEndPath);
  }

  return response.redirect("http://localhost:3000");
});

// start
app.listen(PORT, () => console.log(`>>> ${PORT}`));
