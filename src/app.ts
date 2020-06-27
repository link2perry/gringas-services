import express from "express";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3005);

// API Endpoints
app.get("/", (req, res) => {
  res.send("Hi");
});

// export our app
export default app;