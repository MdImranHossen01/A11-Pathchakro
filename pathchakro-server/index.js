const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const verifyToken = require('./middleware/verifyToken'); // Make sure you have this middleware file
const port = process.env.PORT || 5000;
const app = express();
// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://pathchakro-a6827.web.app',
    ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});
async function run() {
  try {
    // Define your database and collections
    const database = client.db("studySphereDB");
    const assignmentsCollection = database.collection("assignments");
    const submissionsCollection = database.collection("submissions");
    const usersCollection = database.collection("users"); // Add users collection
    
    console.log("Successfully connected to MongoDB!");
    
    // --- AUTHENTICATION API ---
    app.post('/api/auth/login', async (req, res) => {
        const user = req.body;
        console.log('Logging in user and creating token:', user);
        
        // Check if user exists in database
        const query = { email: user.email };
        const existingUser = await usersCollection.findOne(query);
        
        // If user doesn't exist, create a new user record
        if (!existingUser) {
            const newUser = {
                email: user.email,
                createdAt: new Date(),
                lastLoginAt: new Date()
            };
            const result = await usersCollection.insertOne(newUser);
            console.log('Created new user:', result.insertedId);
        } else {
            // Update last login time
            await usersCollection.updateOne(
                { email: user.email },
                { $set: { lastLoginAt: new Date() } }
            );
        }
        
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ success: true, token });
    });
    
    app.post('/api/auth/logout', (req, res) => {
        console.log('User logged out');
        res.send({ success: true });
    });
    
    // --- USER PROFILE API ---
    // Get user profile
    app.get('/api/users/profile', verifyToken, async (req, res) => {
        try {
            const email = req.user.email;
            const user = await usersCollection.findOne({ email });
            
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            
            res.send(user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    });
    
    // Update user profile
    app.put('/api/users/profile', verifyToken, async (req, res) => {
        try {
            const email = req.user.email;
            const { displayName, photoURL, bio } = req.body;
            
            const filter = { email };
            const updateDoc = {
                $set: {
                    displayName,
                    photoURL,
                    bio,
                    updatedAt: new Date()
                },
            };
            
            const options = { upsert: true };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            
            if (result.upsertedId) {
                console.log('Created new user profile with ID:', result.upsertedId);
            } else if (result.modifiedCount > 0) {
                console.log('Updated user profile for:', email);
            }
            
            res.send({ success: true, message: "Profile updated successfully" });
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    });
    
    // --- ASSIGNMENTS API ---
    app.post('/api/assignments', verifyToken, async (req, res) => {
        const newAssignment = req.body;
        const result = await assignmentsCollection.insertOne(newAssignment);
        res.send(result);
    });
    
    app.get('/api/assignments', async (req, res) => {
        const difficulty = req.query.difficulty;
        let query = {};
        if (difficulty) {
            query.difficulty = difficulty;
        }
        const cursor = assignmentsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });
    
    app.get('/api/assignments/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await assignmentsCollection.findOne(query);
        res.send(result);
    });
    
    app.put('/api/assignments/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                title: updatedData.title,
                description: updatedData.description,
                marks: updatedData.marks,
                thumbnailURL: updatedData.thumbnailURL,
                difficulty: updatedData.difficulty,
                dueDate: updatedData.dueDate,
            },
        };
        const result = await assignmentsCollection.updateOne(filter, updateDoc);
        res.send(result);
    });
    
    // ✅ UPDATED AND SECURE DELETE ROUTE
    app.delete('/api/assignments/:id', verifyToken, async (req, res) => {
        try {
            const id = req.params.id;
            const userEmail = req.user.email; // Email from the verified JWT token
            
            // 1. Find the assignment first to check its creator
            const assignment = await assignmentsCollection.findOne({ _id: new ObjectId(id) });
            if (!assignment) {
                return res.status(404).send({ message: "Assignment not found." });
            }
            
            // 2. Check if the logged-in user is the creator of the assignment
            if (assignment.creatorEmail !== userEmail) {
                // 3. If not the creator, send a 403 Forbidden error
                return res.status(403).send({ message: "Forbidden! You can only delete your own assignments." });
            }
            
            // 4. If the user is the creator, proceed with deletion
            const query = { _id: new ObjectId(id) };
            const result = await assignmentsCollection.deleteOne(query);
            res.send(result);
        } catch (error) {
            console.error("Error deleting assignment:", error);
            res.status(500).send({ message: "Internal server error." });
        }
    });
    
    // --- SUBMISSIONS API ---
    app.post('/api/submissions', verifyToken, async (req, res) => {
        const submissionData = req.body;
        const result = await submissionsCollection.insertOne(submissionData);
        res.send(result);
    });
    
    app.get('/api/submissions/my-submissions', verifyToken, async (req, res) => {
        if (req.user.email) {
            const query = { studentEmail: req.user.email };
            const result = await submissionsCollection.find(query).toArray();
            res.send(result);
        } else {
            res.status(403).send({ message: 'forbidden access' });
        }
    });
    
    app.get('/api/submissions/pending', async (req, res) => {
        const query = { status: 'pending' };
        const result = await submissionsCollection.find(query).toArray();
        res.send(result);
    });
    
    app.patch('/api/submissions/:id/grade', verifyToken, async (req, res) => {
        const id = req.params.id;
        const { marks, feedback } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                status: 'completed',
                obtainedMarks: marks,
                feedback: feedback,
            },
        };
        const result = await submissionsCollection.updateOne(filter, updateDoc);
        res.send(result);
    });
    
    // --- Root Route ---
    app.get('/', (req, res) => res.send('Pathchakro Server is running!'));
  } finally {
    // This block is often left empty in a long-running server application
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});