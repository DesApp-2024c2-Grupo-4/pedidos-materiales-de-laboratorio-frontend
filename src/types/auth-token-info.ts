import { User } from "./user";

export type AuthTokenInfo = Pick<User, "role" | "name" | "lastName" | "email"> & { id: string };

export default AuthTokenInfo;
