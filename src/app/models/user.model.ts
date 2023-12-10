
export class User {
    idUser: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: Role;
    cin: number;
    ecole: string;
    dateNaissance: Date;
  }
  
  export enum Role {
    ETUDIANT = 'ETUDIANT',
    ADMIN = 'ADMIN',
    
  }
  