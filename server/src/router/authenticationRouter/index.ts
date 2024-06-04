import express, { Request, Response } from "express";
import supabase from "../../utils/supabase";
import { VerifyOtpParams } from "@supabase/supabase-js";

const authenticationRouter = express.Router();

authenticationRouter.get(
  "/send-login-otp",
  async (request: Request, response: Response) => {
    try {
      const email = request.query.email as string;

      const { data, error } = await supabase.auth.signInWithOtp({ email });
      console.log({ data });

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
      console.log(request.query);

      const email = request.query.email as string;
      const token = request.query.otp as string;
      const verifyOtpParams: VerifyOtpParams = {
        email,
        token,
        type: "magiclink",
      };

      const { data, error } = await supabase.auth.verifyOtp(verifyOtpParams);
      console.log({ data });

      if (error) throw new Error(error.message);

      response.status(200).send("OK");
    } catch (error) {
      await supabase.auth.signOut();
      console.log(error);
      response.status(500).send("Auth error");
    }
  }
);

export default authenticationRouter;
