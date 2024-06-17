import { TokenResult } from "@shared/types";
import { getIsAuthUserAProjectManager, supabase } from "~/utils";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export function decodeStringToTokenResult(tokenString: string) {
  return jwt.verify(tokenString, JWT_SECRET) as TokenResult;
}

export function encodeTokenResultToString(tokenResult: TokenResult) {
  return jwt.sign(tokenResult, JWT_SECRET);
}

export async function getSessionUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getAuthenticatedUser(
  access_token?: string,
  refresh_token?: string
) {
  const user = await getSessionUser();
  if (user) return user;

  /**
   * if user is not present, try refreshing the session with params and
   * getting the retrieving the user again
   */
  const doRetry = !!access_token && !!refresh_token;
  if (doRetry) {
    // set session
    await supabase.auth.setSession({ access_token, refresh_token });

    // retry
    const user = await getSessionUser();
    if (user) return user;
  }

  // if user does not exist after retry, throw an error
  throw new Error("Invalid session");
}

export function authorizationMiddleware(
  _: Request,
  response: Response,
  next: NextFunction
) {
  getIsAuthUserAProjectManager().then((isProjectManager) => {
    if (!isProjectManager) {
      /**
       * 404, because to a unauthenticated user, this route should not exist
       */
      return response.status(404).send();
    }
    next();
  });
}
