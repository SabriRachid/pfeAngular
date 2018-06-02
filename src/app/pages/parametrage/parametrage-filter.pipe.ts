import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../../user';

@Pipe({
  name: 'parametrageManagerFilter'
})
export class ParametrageManagerFilter implements PipeTransform {
transform(manager: User[], motCle: string): User[] {
if (!manager || !motCle ) {
  return manager;
}
return manager.filter(man => man.nom.toLowerCase().indexOf(motCle.toLowerCase()) !== -1);
}
}
