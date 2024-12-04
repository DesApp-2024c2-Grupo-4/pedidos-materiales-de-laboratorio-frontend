export interface SolventRequest {
  name: string;
  description: string;
}

export interface ReactiveRequest {
  quantity: number;
  unitMeasure: string;
  quality: string;
  concentrationType: string;
  concentrationAmount: string;
  solvents: SolventRequest[];
  reactive: string;
}

export interface MaterialRequest {
  quantity: number;
  material: string;
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

export interface Request {
  _id: string;
  requestantUser: string;
  status: string;
  startDate: Date;
  endDate: Date;
  studentsAmount: number;
  groupsAmount: number;
  subject: string;
  tpNumber: number;
  description: string;
  equipments: EquipmentRequest[];
  reactives: ReactiveRequest[]; 
  materials: MaterialRequest[]; 
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}