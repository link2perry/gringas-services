import express from "express";
// Our Express APP config
var app = express();
app.set("port", process.env.PORT || 3005);
// API Endpoints
app.get("/", function (req, res) {
    res.send("Hi");
});
// export our app
export default app;
//# sourceMappingURL=../src/src/app.js.map