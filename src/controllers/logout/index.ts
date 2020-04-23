import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../inversify/types";
import { Router } from "express";
import { ILogger } from "../../services/loggerService";
import { CommonController } from "..";

@injectable()
class LogoutController implements CommonController {
    CurrentRouter(): Router {
        const logoutRouter = Router();

        logoutRouter.get("/logout", (req, res) => {
            req.logout();
            res.redirect('/');
        });

        return logoutRouter;
    }
}

export { LogoutController };