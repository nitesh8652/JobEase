import './Config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkwebhooks } from './Controller/Webhooks.js';
import connectDB from './Config/db.js';

const app = express();
await connectDB()

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => res.send("API Running"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkwebhooks)
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})