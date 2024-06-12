import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PagePRnew } from "../interfaces/prnew/page-prnew";
import { QueryPagination } from "../interfaces/query-pagination";
import { ArticleService } from "../services/article.service";
import { insertArticle } from "../interfaces/prnew/insertArticle";
import { articleData } from "../interfaces/prnew/articleData";

@Injectable({providedIn: "root"})
export class ArticleState {
  articleList: BehaviorSubject<PagePRnew[]> = new BehaviorSubject<PagePRnew[]>([]);
  pageNumberTag: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalTag: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  searchTag?: QueryPagination;

  articleById: BehaviorSubject<articleData | null> = new BehaviorSubject<articleData | null>(null);

  constructor(private articleService:ArticleService){}

  getArticleList(){
    const myQuerySearch: QueryPagination = {
      page: this.pageNumberTag.value,
      size: 10,
    };
    this.articleService.getArticle(myQuerySearch).subscribe((res) => {
      console.log(res);
      this.articleList.next(res.data.content);
      this.totalTag.next(res.data.total);
    });
  }

  getArticleById(id: number) {
    this.articleService.getArticleById(id).subscribe((res) => {
      this.articleById.next(res.data);
    });
  }

  ArticleListAsObservable(){
    return this.articleList.asObservable();
  }

  ArticleByIdAsObservable() {
    return this.articleById.asObservable();
  }
}
