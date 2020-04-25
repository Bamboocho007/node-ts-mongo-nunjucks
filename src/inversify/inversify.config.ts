import { Container } from "inversify";
import { TYPES } from "./types";
import { ConsoleLogger } from "../services/loggerService";
import { HomeController } from "../controllers/home";
import { LoginController } from "../controllers/login";
import { LogoutController } from "../controllers/logout";
import { RegistrationController } from "../controllers/registration";
import { StoreController } from "../controllers/store";
import { PassportConfig } from "../utils/passportConfig";

const iocContainer = new Container();
// classes
iocContainer.bind<HomeController>(TYPES.HomeController).to(HomeController).inSingletonScope();
iocContainer.bind<LoginController>(TYPES.LoginController).to(LoginController).inSingletonScope();
iocContainer.bind<LogoutController>(TYPES.LogoutController).to(LogoutController).inSingletonScope();
iocContainer.bind<RegistrationController>(TYPES.RegistrationController).to(RegistrationController).inSingletonScope();
iocContainer.bind<StoreController>(TYPES.StoreController).to(StoreController).inSingletonScope();
// services
iocContainer.bind<ConsoleLogger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();
iocContainer.bind<PassportConfig>(TYPES.PassportConfig).to(PassportConfig).inSingletonScope();

export { iocContainer };