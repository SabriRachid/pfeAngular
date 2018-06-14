import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../../user';
import { Profile } from '../../profile';

@Pipe({
  name: 'profileFilter'
})
export class ProfileFilter implements PipeTransform {
transform(profile: Profile[], motCle: string): Profile[] {
if (!profile || !motCle ) {
  return profile;
}
return profile.filter(pro => pro.utilisateur.nom.toLowerCase().indexOf(motCle.toLowerCase()) !== -1);
}
}
