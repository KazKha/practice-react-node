const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT =  3300;
app.use(bodyParser.json());

app.use('/user', (req, res) => {
    res.status(201).json(req.body);
} );

app.listen(PORT, () => {
  console.log("Servber Is Connected");
});
