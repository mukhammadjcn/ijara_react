export interface university {
  id: number;
  name: string;
  directions: { id: number; name: string }[];
}
export interface language {
  id: number;
  name: string;
  types: { id: number; name: string }[];
}
export interface subject {
  ball: number;
  semester: number;
  subject: string;
}

export interface ILogin {
  all: any;
  phone: number;
  user: any;
  isApplied: boolean;
  openModal: boolean;
}
