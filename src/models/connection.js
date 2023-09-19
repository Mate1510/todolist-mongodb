const mongoose = require("mongoose");

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

module.exports = connectToDatabase;