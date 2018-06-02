import { User } from './user';

export class Task {
  id: number;
  nomTache: string;
  etatTache: string;
  dateDebut: Date;
  dateEcheance: Date;
  description: string;
  utilisateur: User;
  dateAffectation: Date;
}
