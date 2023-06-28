import session from "express-session";
import { User } from "../model/user";

declare module "express-session" {
  export interface SessionData {
    login: string
  }
}
