import { Router } from "express";
import userController from '../controllers/userController.js'

export const userRouter = new Router();

userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.edit);
userRouter.delete('/:id', userController.delete)
userRouter.patch('/friend/add', userController.addFriend);
userRouter.patch('/friend/remove', userController.delete);
