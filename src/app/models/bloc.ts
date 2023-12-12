import { Foyer } from "./Foyer";
import { chamber } from "./chambre";


export interface Bloc {
    idBloc: number,
    nomBloc: string,
    capaciteBloc: number,
    foyer: Foyer,
    chamberList: chamber[]
}
