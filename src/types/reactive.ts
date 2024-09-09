import { InUse } from "./in-use";
import { SoftDelete } from "./soft-delete";

export type Reactive = SoftDelete & {
  description: string;
  cas: string;
  stock?: number;
  inUse: InUse[];
  isAvailable: boolean;
};
