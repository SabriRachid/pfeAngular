import { User } from './user';
import { Attachement } from './attachement';

export class Task {
  id: number;
  nomProjet: string;
  nomTache: string;
  etatTache: string;
  dateDebut: Date;
  dateEcheance: Date;
  description: string;
  utilisateur: User;
  dateAffectation: Date;
  attachement: Array<Attachement>;
}
