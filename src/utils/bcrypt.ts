import bcrypt from "bcrypt";
import { env } from "../config/env";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const validatePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}