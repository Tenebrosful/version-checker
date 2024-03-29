import { Router } from "express";
import { authRouter } from "./auth";
import * as _jwt from "express-jwt";
import { config } from "../../config";
import { userRouter } from "./user";
import { softwareRouter } from "./software";

const jwt = _jwt({ secret: config.auth.jwt_secret, algorithms: ['HS256'] });

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/software', softwareRouter);
apiRouter.use('/user', jwt, userRouter)