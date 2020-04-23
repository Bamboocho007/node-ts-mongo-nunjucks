import { passportConfig } from "../../utils/passportConfig";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../services/types";
import { Router } from "express";
import { ILogger } from "../../services/loggerService";
import { CommonController } from "..";

@injectable()
class LoginController implements CommonController {
    CurrentRouter(): Router {
        const loginRouter = Router();

        loginRouter.get("/login", (req, res) => {
            res.render("login");
        });

        loginRouter.post('/login', function(req, res, next) {
            passportConfig.get().authenticate('local', function(err, user, info) {
                if ( err ) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if ( !user ) {
                    return res.send({ success : false, message : 'authentication failed' });
                }
                req.logIn(user, function(err) {
                    if( err ) {
                        return next(err);
                    }
                    return res.redirect("/");        
                });
            })(req, res, next);
        });

        return loginRouter;
    }
}

export { LoginController };