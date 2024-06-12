import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { InputComponent } from '../../../../../components/input-group/input/input.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-section-detail-prnew-article',
  standalone: true,
  imports: [CKEditorModule,InputComponent,NgbCollapseModule,CommonModule,MatExpansionModule],
  templateUrl: './section-detail-prnew-article.component.html',
  styleUrl: './section-detail-prnew-article.component.scss'
})
export class SectionDetailPrnewArticleComponent implements OnInit{
  public isCollapsed = false;
  statusShowImg = false;
  previewImage: any;

  @Input() formCreate!: FormGroup;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {

    DecoupledEditor.create(
      this.elementRef.nativeElement.querySelector('#editor'),
      {
        fontSize: {
          options: [12, 14, 'default', 18, 20, 22],
        },
        toolbar: {
          items: [
            'selectAll',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'undo',
            'redo',
            '-',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'alignment',
            '|',
            'link',
            'blockQuote',
            'insertTable'
          ],
        },
      }
    )
      .then((editor) => {
        const toolbarContainer =
          this.elementRef.nativeElement.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);

        editor.model.document.on('change:data', () => {
          const content = editor.getData();
          this.getFormCreateControlByKey('detailArticle').setValue(content);

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getFormCreateControlByKey(key: string) {
    return this.formCreate.get(key) as FormControl;
  }

  uploadImg(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.statusShowImg = true;
        this.previewImage = e.target.result;
        this.getFormCreateControlByKey('articleImage').setValue(
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    }
  }
}
