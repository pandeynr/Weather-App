const express = require('express');
const cors = require('cors');

let app = express();
    app.use(express.static(__dirname + '/public'));
    
    app.listen(8000, ()=>{
        console.log("Weather app is running on port 8000");
    })