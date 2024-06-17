import express, { Request, Response } from "express";
import { VerifyOtpParams } from "@supabase/supabase-js";
import {
  supabase,
  getAuthenticatedUser,
  decodeStringToTokenResult,
  encodeTokenResultToString,
  getIsAuthUserAProjectManager,
} from "~/utils";

export const authenticationRouter = express.Router();

authenticationRouter.get(
  "/is-authenticated",
  async (request: Request, response: Response) => {
    try {
      // ensure user is authenticated
      const token = request.query.token as string;
      const { accessToken, refreshToken } = decodeStringToTokenResult(token);

      const user = await getAuthenticatedUser(accessToken, refreshToken);
      if (!user) throw new Error("Invalid user");

      // ensure user is project manager
      const userIsProjectManager = await getIsAuthUserAProjectManager();
      if (!userIsProjectManager) throw new Error("Invalid user");

      return response.status(200).send({ authenticated: true, user });
    } catch (error) {
      await supabase.auth.signOut();
      response.status(403).send({ authenticated: false, user: null });
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
