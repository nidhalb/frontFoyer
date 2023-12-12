import { chamber } from "./chambre";
import { Foyer } from "./foyer.model";


export interface Bloc {
    idBloc: number,
    nomBloc: string,
    capaciteBloc: number,
    foyer: Foyer,
    chamberList: chamber[]
}
