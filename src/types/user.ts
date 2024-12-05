import { SoftDelete } from "./soft-delete";

export type User = SoftDelete & {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  dni: number;
  matricula?: number; // FIXME: Why do we need this? also let's pick a name for this attribute
  roles: string[];
};
