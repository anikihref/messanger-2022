import { Router } from "express";
import messageController from "../controllers/messageController.js";

export const messageRouter = new Router();

messageRouter.post('/', messageController.create);
messageRouter.patch('/:id', messageController.edit);
messageRouter.get('/:id', messageController.getMessage);
messageRouter.delete('/:id', messageController.delete);
messageRouter.delete('/like', messageController.like);
