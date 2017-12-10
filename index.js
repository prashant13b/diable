const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      config = require('./config/index'),
      routes = require('./routes/route'),
      session = require('express-session'),
      {
          mongoose
      } = require("./db/mongoose.js")
      
          app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true
          }))
     
     
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));
      
app.use('/',routes);

app.listen(config.port,()=>{
    console.log(`Working at ${config.port}`);
  });
  