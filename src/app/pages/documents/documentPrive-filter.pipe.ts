import { PipeTransform, Pipe } from '@angular/core';
import { Document } from '../../document';

@Pipe({
  name: 'docPriveFilter'
})
export class DocumentPriveFilter implements PipeTransform {
transform(docp: Document[], motClep: string): Document[] {
if (!docp || !motClep ) {
  return docp;
}
return docp.filter(dcm => dcm.nomDocument.toLowerCase().indexOf(motClep.toLowerCase()) !== -1);
}
}
