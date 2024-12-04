

export type  SolventRequest  = {
  name: string;
  description: string;
}

export type  ReactiveRequest = {
  unitMeasure: string;
  quality: string;
  concentrationType: string;
  concentrationAmount: string;
  solvents: SolventRequest[];
  reactive: string;
  amount: number;
  missingAmount: number;
}

export type  MaterialRequest = {
  material: string;
  amount: number;
  missingAmount: number;

}

export type  EquipmentRequest = {
  material: string;
  amount: number;
  missingAmount: number;

}
export interface EquipmentRequest {
  amount: number;
  id: {
    _id: string;
    type: string;
    description: string;
    stock: number;
    inRepair: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  _id: string;
}

export type  Request = {
  _id:string;
  requestantUser: string;
  assignedUser: string;
  description: string;
  creationDate: Date;
  usageDate: Date;
  lab: string ;
  type: string;
  studentsNumber: number;
  building?: string;
  groupNumber: number;
  observations?: string;
  subject: string;
  tpNumber: number;
  messages: string;
  equipments: EquipmentRequest[];
  reactives: ReactiveRequest[];
  materials: MaterialRequest[];
  requestNumber: number;
  status: string;
  isCompleted: boolean;
  isRejected: boolean;
  isExpired: boolean;

}