import { User } from './user';

export class Task  {

  nomTache: string  ;
  etatTache: string ;
  dateDebut: Date ;
  dateEcheance: Date;
  description: string;
  utilisateur: User;
}
