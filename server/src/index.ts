import express, { Request, Response } from 'express'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { createClient } from '@supabase/supabase-js'
import path from 'path';

const supabase = createClient("https://ovoyksiyukivurwhxzbk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92b3lrc2l5dWtpdnVyd2h4emJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4OTE1MzEsImV4cCI6MjAxNDQ2NzUzMX0.Hs9LYT8LbdqahjFglOByzuHGfsR_mjk2YOlPu9zcZ1M", {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

supabase.auth.onAuthStateChange((event, session) => {
    console.log({ event })
    console.log({ session })
})

const apiRouter = express.Router();

apiRouter.route('/ping')
    .get((_, response: Response) => {
        response.status(200).send({ data: "pong" });
    });

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, './public')));

app.use((_, response: Response) => {
    const isProduction = process.env.PORT === "80";
    const responseText = `Mode: ${isProduction ? "Production" : "Development"}`
    response.status(200).send(responseText);
});




// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`>>> ${PORT}`));

// https://ovoyksiyukivurwhxzbk.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:8080/post-login

// app.get('/post-login', async (_, response: Response) => {
//     const filepath = path.join(__dirname, "./pages/post-login.html");
//     response.sendFile(filepath)
// })
