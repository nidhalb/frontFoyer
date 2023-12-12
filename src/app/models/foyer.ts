import { Bloc } from "./Bloc"

export interface Foyer {
    idFoyer: number,
    nomFoyer: string,
    capaciteFoyer: number,
    universite: null

    blocList: Bloc[]
}
