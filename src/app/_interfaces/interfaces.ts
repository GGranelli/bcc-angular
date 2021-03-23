export interface BranchInterface {
  id: number;
  nome: string;
  codice: number;
  cab: string;
}

export interface CustomerInterface {
  id: number;
  nag: string;
  cab: string;
  nome: string;
  dataNascita: Date;
  telefono: string;
  email: string;
  p1: boolean;
  p2: boolean;
  p3: boolean;
  p4: boolean;
  p5: boolean;
  p6: boolean;
  firma: boolean;
  codice: string;
  confermato: boolean;
  filiale: BranchInterface;
}
