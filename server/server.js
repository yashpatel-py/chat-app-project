const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); // path of the pubmic folder
const port = process.env.PORT || 80; // port variable to give port

var app = express();

app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server is uo on port ${port}`);
})