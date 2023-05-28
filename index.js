const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const router = require('./routes');
const { AppError } = require('./Lib');
const { handleResponseError } = require('./middlewares');
const { messagesController } = require('./controllers');

io.on('connection', (socket) => {
  socket.on('setup', async (userChats) => {
    socket.join(userChats.newRoom);
    if (userChats.previousRoom) socket.leave(userChats.previousRoom);
    const allMessages = await messagesController.getMessages({ chat: userChats.newRoom });
    console.log(allMessages);
    socket.emit('connected', allMessages);
  });

  socket.on('messages', async (data) => {
    console.log(data);
    const allMessages = await messagesController.getMessages(data);
    console.log(allMessages);
    socket.emit('messages', allMessages);
    socket.broadcast.emit('messages', allMessages);
  });

  socket.on('message-room', async (chat, content, sender) => {
    console.log(chat, content, sender);
    const newMessage = await messagesController.createMessages({ chat, content, sender });
    const allMessages = await messagesController.getMessages({ chat });
    console.log(allMessages);
    // sending message to room
    io.to(chat).emit('room-messages', allMessages);
    socket.broadcast.emit('notifications', chat);
  });
});

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/whatsapp';
mongoose.connect(MONGO_URL);

app.use(router);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(handleResponseError);

const PORT = process.env.PORT || 3050;
server.listen(PORT, () => {
  console.log(`Up: localhost:${PORT}`);
});
