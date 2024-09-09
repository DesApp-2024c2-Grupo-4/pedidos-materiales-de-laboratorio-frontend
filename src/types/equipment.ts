import { InUse } from "./in-use.schema";
import { SoftDelete } from "./soft-delete";

export type Equipment = SoftDelete & {
  id: string;
  type: string;
  description: string;
  stock: number;
  unitMeasure: string;
  inUse: InUse[];
  inRepair?: number;
  available: boolean;
}