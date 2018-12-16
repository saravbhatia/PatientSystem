const express = require('express');
const app = express();



//processing http requests

app.get('/',(req,res) => res.send('hello world!'));




//starting server
const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log('listening on port ' + port);

    }
);

app.use(express.static('.'));