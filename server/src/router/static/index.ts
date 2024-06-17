import express, { Response, Express } from "express";
import path from "path";

export function setStaticFolder(app: Express) {
  app.use(express.static(path.join(__dirname, "./public")));
  app.use((_: unknown, response: Response) => {
    const isProduction = process.env.MODE === "production";

    if (isProduction) {
      const frontEndPath = path.join(__dirname, "./public/index.html");
      return response.sendFile(frontEndPath);
    }

    return response.redirect("http://localhost:3000");
  });
}
