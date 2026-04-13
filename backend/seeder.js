const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Job = require('./models/Job');
const Candidate = require('./models/Candidate');
const Application = require('./models/Application');
const StageHistory = require('./models/StageHistory');
const connectDB = require('./config/db');

dotenv.config({
    path: ['.env.local', '.env']
});

connectDB();


// --- DUMMY DATA ---

const jobs = [
    { title: 'Senior Frontend Developer', department: 'Engineering' },
    { title: 'Product Manager', department: 'Product' },
    { title: 'UI/UX Designer', department: 'Design' },
    { title: 'DevOps Engineer', department: 'Operations' },
];

const candidates = [
    { name: 'Alice Johnson', email: 'alice.j@example.com', photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg', },
    { name: 'Bob Williams', email: 'bob.w@example.com', photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg', },
    { name: 'Charlie Brown', email: 'charlie.b@example.com', photoUrl: 'https://randomuser.me/api/portraits/men/2.jpg', },
    { name: 'Diana Miller', email: 'diana.m@example.com', photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg', },
    { name: 'Ethan Davis', email: 'ethan.d@example.com', photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg', },
    { name: 'Fiona Garcia', email: 'fiona.g@example.com', photoUrl: 'https://randomuser.me/api/portraits/women/3.jpg', },
];

const stages = ['Applied', 'Shortlisted', 'Interviewing', 'In Assessment', 'Accepted', 'Rejected'];

// --- SEEDER FUNCTIONS ---

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Application.deleteMany();
        await StageHistory.deleteMany();
        await Job.deleteMany();
        await Candidate.deleteMany();

        // Insert new data
        const user = await User.create({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: await bcrypt.hash('admin123', 10) // Hashing password before saving
        });
        await user.save();
        const createdJobs = await Job.insertMany(jobs);
        const createdCandidates = await Candidate.insertMany(await Promise.all(candidates.map(async (candidate) => {
            // Randomly assign a job to each candidate
            const randomJob = createdJobs[Math.floor(Math.random() * createdJobs.length)];
            return { ...candidate, roleAppliedFor: randomJob._id };
        })));

        console.log('Jobs and Candidates Imported!');

        // Create dummy applications
        await Promise.all(createdCandidates.map(async (candidate) => {
            // Each candidate applies for 1 or 2 random jobs
            const numApplications = Math.floor(Math.random() * 2) + 1;
            const shuffledJobs = createdJobs.sort(() => 0.5 - Math.random());

            for (let i = 0; i < numApplications; i++) {
                const randomStageIndex = Math.floor(Math.random() * stages.length);
                const currentStage = stages[randomStageIndex];

                const app = await Application.create({
                    candidate: candidate._id,
                    job: candidate.roleAppliedFor._id,
                    currentStage: currentStage,
                });

                const savedApp = await app.save();

                // Create history for this application
                // Create a plausible history trail up to the current stage
                const currentStageOrder = stages.indexOf(currentStage);
                for (let j = 0; j <= currentStageOrder; j++) {
                    await StageHistory.create({
                        application: savedApp._id,
                        stage: stages[j],
                    }).then(async history => await history.save());
                }
            }
        }));

        console.log('Dummy Applications and Histories Created!');
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Application.deleteMany();
        await StageHistory.deleteMany();
        await Job.deleteMany();
        await Candidate.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error}`);
        process.exit(1);
    }
};

// --- RUN SCRIPT ---

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
