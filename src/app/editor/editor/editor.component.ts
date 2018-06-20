import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  text: string;
  submited = false;
  @ViewChild('content') content: ElementRef;
  private editor = {
    titre : '',
    text: ''

  };
  constructor(private router: Router) { }

  ngOnInit() {
  }
  saveDocument() {
    console.log(this.editor.titre);
    console.log(this.editor.text);
    this.submited = true;
    this.router.navigate(['/editeur', this.editor]);
  }
 public genererPDF() {
  const doc = new jsPDF();
  const specialElementHandlers = {
    '#editor': function(element, renderer) {
      return true;
    }
  };

  const content = this.content.nativeElement;
  doc.fromHTML(content.innerHTML, 15, 15, {
    'width': 190,
    'elementHandlers': specialElementHandlers
  });
  doc.save(this.editor.titre);
  }
}
