import express, { Response } from "express";
import path from "path";
import apiRouter from "./router/apiRouter";

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api", apiRouter);

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

console.log(process.env);

// start
app.listen(PORT, () => console.log(`>>> ${PORT}`));
