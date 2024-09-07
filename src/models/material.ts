import { InUse } from "./in-use.schema";
import { SoftDelete } from "./soft-delete";

export type Material =  SoftDelete & {
  description: string;
  unitMeasure: string;
  type: string;
  stock: number;
  inUse: InUse[];
  inRepair?: number;
  isAvailable: boolean;
}