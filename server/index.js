import express from 'express';
import WebSocket, {WebSocketServer } from 'ws'
import mongoose from 'mongoose'
import cors from 'cors';
import { config } from 'dotenv';
import { userRouter } from './routers/user.js';
import { messageRouter } from './routers/message.js';
import { chatRouter } from './routers/chat.js';
import { onClose, onConnect } from './ws.js';
import bodyParser from 'body-parser';

const app = express();
export const wsServer = new WebSocketServer({ port: 8000 });

// ws server listeners
wsServer.on('connection', onConnect)
wsServer.on('close', onClose)

// dotenv config
config();

// middlewares
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use('/static', express.static('static'));

// routes
app.use('/chat', chatRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();
