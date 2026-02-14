const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const filePath = path.join(__dirname, 'capsules.json');
 let capsule = null; 
const readCapsules = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}
const writeCapsules = (capsules) => {
    fs.writeFileSync(filePath, JSON.stringify(capsules, null, 2));
}
app.post('/create', (req, res) => {
    const { message, unlockTime } = req.body;
    if (!message || !unlockTime) {
        return res.send("Please send message and unlockTime");
    }
    capsule = {
        message: message,
        unlockTime: unlockTime
    };
    res.send("Time capsule saved!");
});

app.get('/open', (req, res) => {
    if (!capsule) {
        return res.send("No capsule created yet.");
    }
    const now = new Date();
    const unlock = new Date(capsule.unlockTime);
    if (now < unlock) {
        return res.send("Message is locked. Come back later.");
    }
    res.send("Message: " + capsule.message);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});