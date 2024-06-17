import express, { Response, Express } from "express";
import path from "path";

const PUBLIC_FOLDER = "./../../../../public";

export function setStaticFolder(app: Express) {
  app.use(express.static(path.join(__dirname, PUBLIC_FOLDER)));
  app.use((_: unknown, response: Response) => {
    const isProduction = process.env.MODE === "production";

    if (isProduction) {
      const frontEndPath = path.join(__dirname, PUBLIC_FOLDER, "index.html");
      return response.sendFile(frontEndPath);
    }

    return response.redirect("http://localhost:3000");
  });
}
