const express = require('express');
const app = express();



//processing http requests

app.get('/',(req,res) => res.send('hello world!'));




//starting server
app.listen(8000, () => console.log('listening on port 8000'));

app.use(express.static('.'));