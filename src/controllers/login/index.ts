import { passportConfig } from "../../utils/passportConfig";
import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
    res.render("login");
});

loginRouter.post('/login', function(req, res, next) {
    passportConfig.authenticate('local', function(err, user, info) {
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

export { loginRouter };