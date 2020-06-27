import app from "./app";
var server = app.listen(app.get("port"), function () {
    console.log("App is running on http://localhost:%d in %s mode", app.get("port"), app.get("env"));
});
export default server;
//# sourceMappingURL=../src/src/server.js.map