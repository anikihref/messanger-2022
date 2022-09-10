import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import ws from 'express-ws'
import { config } from 'dotenv';
import { userRouter } from './routers/user.js';
import { messageRouter } from './routers/message.js';
import { chatRouter } from './routers/chat.js';

const app = express();
const WSServer = ws(app);
// dotenv config
config();
// middlewares
app.use(cors());
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
