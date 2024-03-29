const functions = require('firebase-functions');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const db = require("./app/models");

var corsOptions = {
  origin: ["https://cosc360project-9d804.web.app", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '16MB'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Init DB
db.sequelize.sync();

 //db.sequelize.sync({ force: true }).then(() => {
 //  console.log("Drop and re-sync db.");
 //});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Testing JSON response." });
});

require("./app/routes/post.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/comment.routes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

exports.app = functions.https.onRequest(app);
