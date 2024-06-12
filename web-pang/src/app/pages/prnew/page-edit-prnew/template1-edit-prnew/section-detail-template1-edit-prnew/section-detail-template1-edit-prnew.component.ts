import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { InputComponent } from '../../../../../components/input-group/input/input.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleState } from '../../../../../states/articleState';

@Component({
  selector: 'app-section-detail-template1-edit-prnew',
  standalone: true,
  imports: [
    CKEditorModule,
    InputComponent,
    NgbCollapseModule,
    CommonModule,
    MatExpansionModule,
  ],
  templateUrl: './section-detail-template1-edit-prnew.component.html',
  styleUrl: './section-detail-template1-edit-prnew.component.scss',
})
export class SectionDetailTemplate1EditPrnewComponent {
  public isCollapsed = false;
  statusShowImg = false;
  previewImage: any;

  @Input() formEdit!: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private articleState: ArticleState
  ) {}

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
            'insertTable',
          ],
        },
      }
    )
      .then((editor) => {
        const toolbarContainer =
          this.elementRef.nativeElement.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        this.articleState.articleById.subscribe((article) => {
          if (article) {
            editor.setData(article.articleContent.content);
            this.formEdit.patchValue({
              detailArticle: article.articleContent.content,
            });
          }
        });

        editor.model.document.on('change:data', () => {
          const content = editor.getData();
          this.getFormEditControlByKey('detailArticle').setValue(content);

        });
      })
      .catch((error) => {
        console.error(error);
      });

      this.renderImg();
  }

  getFormEditControlByKey(key: string) {
    return this.formEdit.get(key) as FormControl;
  }

  uploadImg(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.statusShowImg = true;
        this.previewImage = e.target.result; // Set the previewImage to the base64 data URL
        this.getFormEditControlByKey('articleImage').setValue(
          e.target.result
        );
      };
      reader.readAsDataURL(file); // Read and convert the selected file to base64
    }
  }

  renderImg() {
    this.statusShowImg = true;
    this.articleState.articleById.subscribe((article) => {
      if (article) {
        this.previewImage = article.articleContent.contentImage;
      }
    });
  }
}
