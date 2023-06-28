import session from "express-session";
import { User } from "../model/user";

declare module "express-session" {
  export interface SessionData {
    user: User | null;
    error?: string;

    NATION_ADD_EXIST?: string;
    PROFILE_UPDATE_ERROR?: string;
    PROFILE_UPDATE_SUCCESS?: string;
    
    REGISTER_ERROR?: string;
  }
}
