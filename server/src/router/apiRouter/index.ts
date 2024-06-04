import express, { Request, Response } from "express";
import supabase from "../../utils/supabase";
import { getIsAuthUserAProjectManager } from "../../utils/project-manager";
import { syncUsersAndContacts } from "../../utils/sync/users-and-contacts";
import { DEV_USER } from "../../constants/dev";

const apiRouter = express.Router();

apiRouter.route("/ping").get((_, response: Response) => {
  response.status(200).send({ data: "pong" });
});

apiRouter.get("/post-login", async (request: Request, response: Response) => {
  try {
    const refresh_token = request.query.refresh_token as string;
    const { error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) throw new Error(error.message);

    response.status(200).send("OK");
  } catch (error) {
    await supabase.auth.signOut();
    response.status(500).send("Auth error");
  }
});

apiRouter.get("/is-authenticated", async (_, response: Response) => {
  try {
    const isProduction = process.env.MODE === "production";
    if (!isProduction) {
      return response.status(200).send({ authenticated: true, user: DEV_USER });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Invalid session");

    const userIsProjectManager = await getIsAuthUserAProjectManager();
    if (!userIsProjectManager) throw new Error("Invalid user");

    return response.status(200).send({ authenticated: true, user });
  } catch (error) {
    await supabase.auth.signOut();
    response.status(500).send({ authenticated: false, user: null });
  }
});

apiRouter.get("/sync-users-and-contacts", async (_, response: Response) => {
  try {
    await syncUsersAndContacts();
  } finally {
    response.send({ data: "OK" });
  }
});

export default apiRouter;
