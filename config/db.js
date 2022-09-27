const mongoose = require("mongoose");

//MongoDB connexion
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.USER +
      ":" +
      process.env.PASSWORD +
      "@tarotcluster0.umittkb.mongodb.net/tarotApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));