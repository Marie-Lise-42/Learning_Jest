const mongoose = require("mongoose"); 

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://firstmatchauser:firstmatchapassword@cluster0.givnd.mongodb.net/learning_jest",
            { useNewUrlParser: true, useUnifiedTopology: true  }
        );
    } catch (err) {
        console.error("Error connecting to MongoDB");
        console.error(err);
    }
}

module.exports = { connect };