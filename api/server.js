const express = require("express");
const bodyParser = require("body-parser");
const rpcMethods = require("./routes/api");
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", rpcMethods);

const port = process.env.PORT || 4444;

server = app.listen(port, () => console.log(`Server running on port ${port}`));