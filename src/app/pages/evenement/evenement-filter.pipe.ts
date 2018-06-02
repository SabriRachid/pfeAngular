import { PipeTransform, Pipe } from '@angular/core';
import { Evenement } from '../../event';

@Pipe({
  name: 'eventFilter'
})
export class EventFilter implements PipeTransform {
transform(event: Evenement[], motCle: string): Evenement[] {
if (!event || !motCle ) {
  return event;
}
return event.filter(evt => evt.nomEvenement.toLowerCase().indexOf(motCle.toLowerCase()) !== -1);
}
}
