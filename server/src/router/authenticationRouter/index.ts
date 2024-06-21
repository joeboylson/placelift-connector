import express, { Request, Response } from "express";
import { VerifyOtpParams } from "@supabase/supabase-js";
import {
  supabase,
  getAuthenticatedUser,
  decodeStringToTokenResult,
  encodeTokenResultToString,
  getIsAuthUserAProjectManager,
} from "../../utils";
import { getUserByEmail } from "../../database";
import { IsAuthenticated } from "@shared/types";

export const authenticationRouter = express.Router();

authenticationRouter.get(
  "/is-authenticated",
  async (request: Request, response: Response) => {
    try {
      // ensure user is authenticated
      const token = request.query.token as string;
      const { accessToken, refreshToken } = decodeStringToTokenResult(token);

      const authUser = await getAuthenticatedUser(accessToken, refreshToken);
      if (!authUser) throw new Error("Invalid user");

      // get the user from the database
      if (!authUser.email) throw new Error("Invalid user");
      const user = await getUserByEmail(authUser.email);
      if (!user) throw new Error("Invalid user");

      // ensure user is project manager
      const userIsProjectManager = await getIsAuthUserAProjectManager();
      if (!userIsProjectManager) throw new Error("Invalid user");

      const _response: IsAuthenticated = { authenticated: true, user };
      return response.status(200).send(_response);
    } catch (error) {
      await supabase.auth.signOut();
      const _response: IsAuthenticated = { authenticated: false, user: null };
      return response.status(200).send(_response);
    }
  }
);

authenticationRouter.get(
  "/send-login-otp",
  async (request: Request, response: Response) => {
    try {
      const email = request.query.email as string;

      const { data: _, error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw new Error(error.message);

      response.status(200).send("OK");
    } catch (error) {
      await supabase.auth.signOut();
      response.status(500).send("Auth error");
    }
  }
);

authenticationRouter.get(
  "/verify-login-otp",
  async (request: Request, response: Response) => {
    try {
      const email = request.query.email as string;
      const token = request.query.otp as string;
      const verifyOtpParams: VerifyOtpParams = {
        email,
        token,
        type: "magiclink",
      };

      const { data, error } = await supabase.auth.verifyOtp(verifyOtpParams);
      if (error) throw new Error(error.message);

      const jwt = encodeTokenResultToString({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      });

      response.status(200).send(jwt);
    } catch (error) {
      await supabase.auth.signOut();
      console.error(error);
      response.status(500).send("Auth error");
    }
  }
);
