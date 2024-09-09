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

export interface Request {
  id: string;
  requestantUser: string;
  assignedUser: string;
  description: string;
  requestDate: Date;
  usageDate: Date;
  labNumber?: number;
  type: string;
  studentsNumber: number;
  building?: string;
  groupNumber: number;
  observations?: string;
  subject: string;
  tpNumber: number;
  messages: string[];
  equipments: string[];
  reactives: ReactiveRequest[];
  materials: MaterialRequest[];
}