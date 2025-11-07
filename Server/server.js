import './Config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkwebhooks } from './Controller/Webhooks.js';
import connectDB from './Config/db.js';
import CompanyRoutes from './Routes/CompanyRoutes.js'
import connectCloudinary from './Config/cloudinary.js';
import JobRoutes from './Routes/JobRoutes.js';

const app = express();
await connectDB();
await connectCloudinary()

app.use(cors())

// Webhook route BEFORE express.json()
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkwebhooks)

// Then apply express.json() for other routes
app.use(express.json());

app.get('/', (req, res) => res.send("API Running"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.use('/api/company', CompanyRoutes)
app.use("/api/jobs",JobRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
