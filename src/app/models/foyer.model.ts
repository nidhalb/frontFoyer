import { Bloc } from "./bloc.model";
import { Universite } from "./universite.model";

export class Foyer {
  idFoyer: number;
  nomFoyer: string;
  region: string;
  capacityFoyer: number;
  universite: Universite;
  lattitude: number;
  longitude: number;
  numberBloc:number;
  blocs: Bloc[];
  rating: number;
}
