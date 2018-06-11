import { User } from './user';
import { Task } from './task';

export class Commentaire {

  id: number;
  comment: string;
  dateComment: Date;
  utilisateur: User;
  tache: Task[];
}
