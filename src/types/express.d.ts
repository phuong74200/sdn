import { User as AppUser } from "../model/user";

declare global {
  namespace Express {
    interface User extends AppUser {
      _id: string;
    }
  }
}
