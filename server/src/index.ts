import express, { Request, Response } from 'express'
import path from 'path';
import apiRouter from "./router/apiRouter";


const app = express()
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers 
app.use('/api', apiRouter);


// public folder
app.use(express.static(path.join(__dirname, './public')));
app.use((_, response: Response) => {
    const isProduction = process.env.PORT === "80";
    const responseText = `Mode: ${isProduction ? "Production" : "Development"}`
    response.status(200).send(responseText);
});


// start
app.listen(PORT, () => console.log(`>>> ${PORT}`));


