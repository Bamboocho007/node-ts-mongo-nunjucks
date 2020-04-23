import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import { DBConfig } from "./dbConfig";
import { Server } from "./server";
import { iocContainer } from "./inversify/inversify.config";
import { TYPES } from "./inversify/types";
import { HomeController } from "./controllers/home";
import { RegistrationController } from "./controllers/registration";
import { LoginController } from "./controllers/login";
import { LogoutController } from "./controllers/logout";

const dbData = new DBConfig();
const app = express();
const server = new Server(app);
const homeController = iocContainer.get<HomeController>(TYPES.HomeController);
const loginController = iocContainer.get<LoginController>(TYPES.LoginController);
const logoutController = iocContainer.get<LogoutController>(TYPES.LogoutController);
const registrationController = iocContainer.get<RegistrationController>(TYPES.RegistrationController);

server.ApplySetting([
    ['view engine', 'njk']
]);

server.AddHtmlFilters([
    {
        name: "shorten",
        func: (str, count) => {
            return str.slice(0, count || 5);
        }
    }
]);

server.ApplyMiddlewares([
    express.static(__dirname + "/public"),
    cookieParser(),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    session({ secret: 'keyboard dog', resave: true, saveUninitialized: false }),
    flash(),
    passport.initialize(),
    passport.session(),
]);

server.ApplyRoutes([
    homeController.CurrentRouter(),
    loginController.CurrentRouter(),
    logoutController.CurrentRouter(),
    registrationController.CurrentRouter()
]);


server.Listen();