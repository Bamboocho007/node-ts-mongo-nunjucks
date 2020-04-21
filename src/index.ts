import express from "express";
import { Server } from "./server";
import controllers from "./controllers";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import "./dbConfig";
const app = express();
const server = new Server(app);

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
    ...controllers
]);

server.Listen();