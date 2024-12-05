import { User } from "./user";

export type AuthTokenInfo = Pick<User, "roles" | "name" | "lastName" | "email"> & { id: string };

export default AuthTokenInfo;
