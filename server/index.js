// // const http = require("http");
// // const express = require("express");
// // const cors = require("cors");
// // const socketIO = require("socket.io");

// // const app = express();
// // const port = process.env.PORT || 4500;
// // const users = {}; 
// // app.use(cors());

// // app.get("/", (req, res) => {
// //   res.send("Hi, it's working");
// // });

// // const server = http.createServer(app);
// // const io = socketIO(server);

// // io.on("connection", (socket) => {
// //   console.log("New connection");

// //   socket.on('joined', ({ user }) => {
// //     users[socket.id] = user;
// //     console.log(`${user} has joined`);
// // socket.on('message',({message,id})=>{
// // io.emit('sendMessage',{user:users[id],message})
// // })
// //     socket.emit('welcome', {
// //       user: "Admin",
// //       message: `Welcome to the chat, welcome to the chat,${users[socket.id]}`
// //     });

// //     socket.broadcast.emit('userJoined', {
// //       user,
// //       admin: "Admin",
// //       message: `${users[socket.id]} has joined`
// //     });
// //   });

// //   socket.on('disconnect', () => {
// //     // console.log(`${users[socket.id]} has left`);
// //    socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}user has left`});
// //    console.log(`user left`);
// //     delete users[socket.id];  
// // });

// // server.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });

// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app = express();
// const port = process.env.PORT || 4500;
// const users = {}; 
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hi, it's working");
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("New connection");

//   // Listen for the 'joined' event and store the user
//   socket.on('joined', ({ user }) => {
//     if (!user) {
//       return socket.emit('error', { message: "Username is required" });
//     }
//     users[socket.id] = user;
//     console.log(`${user} has joined`);

//     // Handle incoming messages
//     socket.on('message', ({ message, id }) => {
//       // Emit the message to all users
//       io.emit('sendMessage', { user: users[id], message,id });
//     });

//     // Send a welcome message to the newly joined user
//     socket.emit('welcome', {
//       user: "Admin",
//       message: `Welcome to the chat, ${users[socket.id]}`
//     });

//     // Broadcast to other users that someone has joined
//     socket.broadcast.emit('userJoined', {
//       user,
//       admin: "Admin",
//       message: `${users[socket.id]} has joined`
//     });
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     if (users[socket.id]) {
//       // Broadcast to all users that this user has left
//       socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
//       console.log(`${users[socket.id]} has left`);

//       // Remove user from the 'users' object
//       delete users[socket.id];
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;
const users = {}; 
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi, it's working");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection");

  // Listen for the 'joined' event and store the user
  socket.on('joined', ({ user }) => {
    if (!user) {
      return socket.emit('error', { message: "Username is required" });
    }
    users[socket.id] = user;
    console.log(`${user} has joined`);

    // Send a welcome message to the newly joined user
    socket.emit('welcome', {
      user: "Admin",
      message: `Welcome to the chat, ${user}`
    });

    // Broadcast to other users that someone has joined
    socket.broadcast.emit('userJoined', {
      user: "Admin",
      message: `${user} has joined the chat`
    });
  });

  // Handle incoming messages
  socket.on('message', ({ message, id }) => {
    if (!users[id]) return;  // Validate that the id exists

    // Emit the message to all users
    io.emit('sendMessage', {
      user: users[id], // Send the username that corresponds to the id
      message,
      id
    });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      // Broadcast to all users that this user has left
      socket.broadcast.emit('leave', {
        user: "Admin",
        message: `${users[socket.id]} has left`
      });
      console.log(`${users[socket.id]} has left`);

      // Remove user from the 'users' object
      delete users[socket.id];
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
