import express from 'express';
const server = express();

server.get('/', (req,res) => {res.json(
    {message: "Hello World"}
)})

server.listen(process.env.PORT || 3000 )