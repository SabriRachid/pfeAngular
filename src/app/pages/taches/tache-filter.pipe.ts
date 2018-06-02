import { PipeTransform, Pipe } from '@angular/core';
import { Task } from '../../task';

@Pipe({
  name: 'tacheFilter'
})
export class TacheFilter implements PipeTransform {
transform(task: Task[], motCle: string): Task[] {
if (!task || !motCle ) {
  return task;
}
return task.filter(tsk => tsk.nomTache.toLowerCase().indexOf(motCle.toLowerCase()) !== -1);
}
}
