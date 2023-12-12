import { chamber } from "./chambre";

export class Bloc {
    idBloc: number;
    nomBloc: string;
    capaciteBloc: number;
    chamberList: chamber[]
  
    constructor(idBloc: number, nomBloc: string, capaciteBloc: number) {
      this.idBloc = idBloc;
      this.nomBloc = nomBloc;
      this.capaciteBloc = capaciteBloc;
    }
  }