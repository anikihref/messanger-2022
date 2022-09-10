import { Router } from "express";
import chatController from "../controllers/chatController.js";

export const chatRouter = new Router();

chatRouter.post('/', chatController.create);
chatRouter.get('/:id', chatController.getChat);
chatRouter.delete('/:id', chatController.delete);
chatRouter.get('/messages', chatController.getMessages);
chatRouter.patch('/title', chatController.changeTitle);
chatRouter.get('/member', chatController.getMembers);
chatRouter.patch('/member/delete/:id', chatController.deleteMember);
chatRouter.patch('/member/add/:id', chatController.addMember);
chatRouter.patch('/clear', chatController.clearHistory);
