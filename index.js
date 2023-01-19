const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');

app.use(cors());

//read
app.get('/macskak', function(req, res) {
    fs.readFile('./macskak.json', function(err, data){
        res.send(JSON.parse(data));
    });
});

//read by id
app.get('/macskak/:id', function(req, res) {
    const id = req.params.id;
    fs.readFile('./macskak.json', function(err, data){
        const macskak = (JSON.parse(data));
        const macskaById = macskak.find(macska => macska.id === id);
        if(!macskaById) {
            res.status(404);
            res.send({error: `id: {id} Not found`});
            return;
        }
        res.status(200);
        res.send(macskaById);
    });
});

app.listen(9000);