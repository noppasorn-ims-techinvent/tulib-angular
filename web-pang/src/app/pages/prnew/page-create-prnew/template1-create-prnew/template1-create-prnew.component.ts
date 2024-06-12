import { Component } from '@angular/core';
import { HeaderCreatePrnewComponent } from './header-create-prnew/header-create-prnew.component';
import { SectionShowPrnewArticleComponent } from './section-show-prnew-article/section-show-prnew-article.component';
import { SectionDetailPrnewArticleComponent } from './section-detail-prnew-article/section-detail-prnew-article.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { insertArticle } from '../../../../interfaces/prnew/insertArticle';
import { ArticleService } from '../../../../services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template1-create-prnew',
  standalone: true,
  imports: [
    HeaderCreatePrnewComponent,
    SectionShowPrnewArticleComponent,
    SectionDetailPrnewArticleComponent,
  ],
  templateUrl: './template1-create-prnew.component.html',
  styleUrl: './template1-create-prnew.component.scss',
})
export class Template1CreatePrnewComponent {
  data = new FormControl();
  formCreatePRNew!: FormGroup;

  // @ViewChild('modalPreviewDesktop')
  // modalPreviewDesktop?: ModalPreviewDesktopComponent;
  formSubscription?: Subscription;

  constructor(
    private router: Router,
    private formBuild: FormBuilder,
    private articleService: ArticleService
  ) // private alertService: AlertService
  {
    // this.data.setValue(new Date(2023, 7, 16));
    this.formCreatePRNew = this.formBuild.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      thumbnailImage: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      articleImage: new FormControl('', [Validators.required]),
      headerArticle: new FormControl('', [Validators.required]),
      detailArticle: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  clickSave() {
    // const editorContent = document.getElementById('editor')?.innerHTML;
    // const preview = document.getElementById('previewShow');
    // if (preview) {
    //   preview.innerHTML = editorContent!;
    // }
  }

  actionBackToPagePRNew() {
    this.router.navigate(['/prnew']);
  }

  actionCreatePRNew() {
    console.log('actionCreate');
    sessionStorage.setItem(
      'IMG',
      this.formCreatePRNew.controls['thumbnailImage'].value
    );
    if (this.formCreatePRNew.valid) {
      const tagArray: any = [];

      if (this.formCreatePRNew.controls['tag'].valid) {
        this.formCreatePRNew.controls['tag'].value.forEach((element: any) => {
          tagArray.push(element.value.id);
        });
      }

      var newArticle: insertArticle = {
        title: this.formCreatePRNew.controls['title'].value,
        description: this.formCreatePRNew.controls['description'].value,
        url: this.formCreatePRNew.controls['url'].value,
        thumbnailImage: this.formCreatePRNew.controls['thumbnailImage'].value,
        author: this.formCreatePRNew.controls['author'].value,
        tagId: tagArray,
        articleContent: {
          contentImage : this.formCreatePRNew.controls['articleImage'].value,
          header : this.formCreatePRNew.controls['headerArticle'].value,
          content : this.formCreatePRNew.controls['detailArticle'].value,
        },
      };

      console.log(newArticle);

      this.articleService.insertArticle(newArticle).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Success!',
            text: 'create article succesfully',
            icon: 'success',
            confirmButtonText: 'Submit',
          }).then((result) => {
            if (result.isConfirmed) {
              this.actionBackToPagePRNew();
            }
          });
        }
      });
    }
  }
}
