var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var app = express();
var db = mongojs('188.166.219.68/catalog',['products']);

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('It Works!');
});

app.get('/products',function(req,res){
    console.log('Fetching products....');
    db.products.find(function(err, docs){
        if(err){
          res.send(err);
        }else{
          console.log('Sending products...');
          res.json(docs);
        }
    });
});

app.get('/products/:id',function(req,res){
    console.log('Fetching products....');
    db.products.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        if(err){
          res.send(err);
        }else{
          console.log('Sending products...');
          res.json(doc);
        }
    });
});

app.post('/products', function(req,res){
    db.products.insert(req.body, function(err,doc){
        if(err){
          res.send(err);
        }else{
          console.log('Adding products...');
          res.json(doc);
        }
    })

});

app.listen(3000);
console.log('Service is running on 3000');
