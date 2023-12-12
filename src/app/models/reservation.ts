import { User } from "./user.model";

export interface Reservation {

    idReservation: number,
    state: string,
    anneUniversitaire: string,
    userList: User[]
}
