import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../../user';

@Pipe({
  name: 'parametrageUserFilter'
})
export class ParametrageUserFilter implements PipeTransform {
transform(user: User[], motCleUser: string): User[] {
if (!user || !motCleUser ) {
  return user;
}
return user.filter(usr => usr.nom.toLowerCase().indexOf(motCleUser.toLowerCase()) !== -1);
}
}
