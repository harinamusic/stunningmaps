const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

//you should use compression in every server you ever create!!
//it minimizes/compresses the size of every response we send
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//NEVER DELETE THIS ROUTE
//NEVER COMMENT THIS ROUTE OUT
//WHEN THE USER GOES TO LOCALHOST: 3000, THIS ROUTE RUNS
//and it sends the HTML file back as a response
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//inside of server directory => ALL server-side code
// SQL, db, POST, GET routes all in this directory
