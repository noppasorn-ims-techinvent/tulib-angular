import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ArticleState } from '../../../../states/articleState';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderTemplate1EditPrnewComponent } from './header-template1-edit-prnew/header-template1-edit-prnew.component';
import { SectionDetailTemplate1EditPrnewComponent } from './section-detail-template1-edit-prnew/section-detail-template1-edit-prnew.component';
import { SectionShowTemplate1EditPrnewComponent } from './section-show-template1-edit-prnew/section-show-template1-edit-prnew.component';
import { ArticleService } from '../../../../services/article.service';

@Component({
  selector: 'app-template1-edit-prnew',
  standalone: true,
  imports: [
    HeaderTemplate1EditPrnewComponent,
    SectionDetailTemplate1EditPrnewComponent,
    SectionShowTemplate1EditPrnewComponent,
  ],
  templateUrl: './template1-edit-prnew.component.html',
  styleUrl: './template1-edit-prnew.component.scss',
})
export class Template1EditPrnewComponent implements OnInit {
  articleService = inject(ArticleService);
  formEditPRNew!: FormGroup;
  articleId: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private articleState: ArticleState,
    private router: Router
  ) {
    this.formEditPRNew = this.formBuild.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      thumbnailImage: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      articleImage: new FormControl('', [Validators.required]),
      headerArticle: new FormControl('', [Validators.required]),
      detailArticle: new FormControl('', [Validators.required]),
      active: new FormControl(true, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.articleState.getArticleById(this.articleId);
        this.articleState.articleById.subscribe((article) => {
          if (article) {
            this.formEditPRNew.patchValue({
              title: article.title,
              description: article.description,
              url: article.url,
              thumbnailImage: article.thumbnailImage,
              author: article.author,
              tag: article.tagId,
              articleImage: article.articleContent.contentImage,
              headerArticle: article.articleContent.header,
              detailArticle: article.articleContent.content,
              active: article.active,
            });
          }
        });
      } else {
        console.error('Invalid articleId');
      }
    });
  }

  actionEditPRNew() {}

  actionBackToPagePRNew() {
    this.router.navigate(['/prnew']);
  }
}
