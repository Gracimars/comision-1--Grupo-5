const cors_proxy = require("cors-anywhere");

const host = "127.0.0.1";
const port = 8080;

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
