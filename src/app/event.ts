import { User } from './user';

export class Evenement {
     id: number;
     nomEvenement: string;
     lieu: string;
     dateEvenement: Date;
     heureEvenement: string;
     categorie: string;
     description: string;
     utilisateur: User;
     dateCreation: Date;
}
