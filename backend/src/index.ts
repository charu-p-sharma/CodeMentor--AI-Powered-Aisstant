import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";
config();

// Connections
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("✅ Backend Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
