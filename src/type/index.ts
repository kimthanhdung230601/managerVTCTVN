export interface IData {
  id: string;
  idclub: string;
  mode: string;
  name: string;
  sex: string;
  type: string;
  iduser: string;
  hoTen: string;
  tenClb: string;
  birthday: string;
  code: string;
  image: string | null;
}

export interface IPedingFighting2024 {
  id: string;
  idclub: string;
  mode: string;
  pending: string | number;
  image: string | null;
}
export interface IResponseFight2024 {
  status: string;
  pending: IPedingFighting2024[] | boolean;
  data: IData[];
}
