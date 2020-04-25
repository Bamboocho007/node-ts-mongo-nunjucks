import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/user";
import { injectable } from "inversify";

@injectable()
class PassportConfig {

    public _passport: PassportStatic;
    get passport(): PassportStatic {
        return this._passport;
    }

    constructor() {
        this._passport = passport;
        this.init();
    }
    
    init() {
        this._passport.serializeUser((user: IUser, done) => {
            done(null, user._id);
        });
        
        this._passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });
    
        this._passport.use( new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (email, password, done) => {
            User.findOne({ email: email }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                  return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }));
    }
}

export { PassportConfig };