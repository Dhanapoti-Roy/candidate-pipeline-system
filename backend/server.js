const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const stageHistoryRoutes = require('./routes/stageHistoryRoutes');
const connectDB = require('./config/db');

dotenv.config({
    path: ['.env.local', '.env']
})

connectDB();

const app = express();

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
    maxAge: 3600
}))

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/stage-history', stageHistoryRoutes);

app.use(errorHandler);

app.get("/", async (req, res) => {
    res.send("i am running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});