import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../services/types";
import { Router } from "express";
import { IUser } from "../../models/user";
import { ILogger } from "../../services/loggerService";
import { CommonController } from "..";

@injectable()
class HomeController implements CommonController {
    constructor( @inject(TYPES.Logger) private logger: ILogger ) {}

    CurrentRouter(): Router {
        const homeRouter = Router()

        homeRouter
            .get("/",  (req, res) => {
                this.logger.Log("home route");
            
                let user: IUser =  req.user ? req.user as IUser : null;
            
                res.render("index", { user: user });
            })
            
        return homeRouter;
    }
}

export { HomeController };