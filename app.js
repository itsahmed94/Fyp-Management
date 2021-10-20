const path = require('path');
const express = require("express");
const { MongooseConnect } = require("./models/mongoose");
const app = express();
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io');
const io = new Server(server);
// const msg = require('./models/message')




require("dotenv").config();
app.use(express.json())

//setting view engine 'ejs'
app.set("view engine", "ejs");

//set static folder
// app.use(express.static(path.join(__dirname, "public")));
app.use("/public",express.static("public"))
app.use("/views", express.static("views"));
app.use("/uploads", express.static("uploads"))


//using route
app.use("/", require("./Routes/route"));
// app.use('bcryptjs',require('./controllers/user'))
app.use((error, req, res, next) => {
  res.status(500).json({ error, success: false, message: error.message });
});

//socket connection 
io.on('connection', (socket) => {
  global.socket = socket  ;
  console.log('a user connected');
  
  socket.on('online' , user=>{
    console.log(user)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
 
      
});





const port = process.env.Port || 5000;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  MongooseConnect();
});
