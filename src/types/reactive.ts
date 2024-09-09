import { InUse } from "./in-use.schema";
import { SoftDelete } from "./soft-delete";

export type Reactive  = SoftDelete & {
  description: string;
  cas: string;
  stock?: number;
  inUse: InUse[];
  isAvailable: boolean;
}