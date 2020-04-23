import { Container } from "inversify";
import { TYPES } from "./types";
import { ConsoleLogger } from "./loggerService";
import { HomeController } from "../controllers/home";
import { LoginController } from "../controllers/login";
import { LogoutController } from "../controllers/logout";
import { RegistrationController } from "../controllers/registration";

const iocContainer = new Container();
// classes
iocContainer.bind<HomeController>(TYPES.HomeController).to(HomeController).inSingletonScope();
iocContainer.bind<LoginController>(TYPES.LoginController).to(LoginController).inSingletonScope();
iocContainer.bind<LogoutController>(TYPES.LogoutController).to(LogoutController).inSingletonScope();
iocContainer.bind<RegistrationController>(TYPES.RegistrationController).to(RegistrationController).inSingletonScope();
// services
iocContainer.bind<ConsoleLogger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();

export { iocContainer };