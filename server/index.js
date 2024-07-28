require("dotenv").config();
const connectDB = require("./db");
const port = process.env.PORT || 3000;

const app = require("./app");

// Connect to MongoDB
connectDB()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.log(err));
