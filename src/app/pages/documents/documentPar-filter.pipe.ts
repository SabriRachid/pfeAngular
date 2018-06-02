import { PipeTransform, Pipe } from '@angular/core';
import { Document } from '../../document';

@Pipe({
  name: 'docFilter'
})
export class DocumentFilter implements PipeTransform {
transform(docs: Document[], motCle: string): Document[] {
if (!docs || !motCle ) {
  return docs;
}
return docs.filter(dc => dc.nomDocument.toLowerCase().indexOf(motCle.toLowerCase()) !== -1);
}
}
