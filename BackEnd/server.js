var express = require('express');
var app = express();
const bodyParser=require('body-parser')
require("dotenv").config();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose=require('mongoose')
const todoRouter=require('./routes/todoRouter')

app.use(cors());


mongoose.connect(process.env.MONGOOOSE_URL, {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})




app.use(express.json())

app.use("/api",todoRouter)
const start = async () => {
    try {
      server.listen(process.env.PORT || 8081, () =>
        console.log(`Server is listening on port ${process.env.PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();