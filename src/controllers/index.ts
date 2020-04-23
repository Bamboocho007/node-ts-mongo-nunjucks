import { Router } from "express";

export interface CommonController {
    CurrentRouter(): Router
}