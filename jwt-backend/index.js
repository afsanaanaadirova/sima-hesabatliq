const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const fs   = require('fs');
const privateKEY  = fs.readFileSync('config/private.key', 'utf8');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}))


dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

	
app.post("/user/generateToken", (req, res) => {

  const token = jwt.sign(req.body, privateKEY);
  let data = 
    {
    "token": token
    }

  res.send(data);
});
