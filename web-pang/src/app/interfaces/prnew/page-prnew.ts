import { ArticleSubTag } from "./article-sub-tag";

export interface PagePRnew {
  id:number;
  title:string;
  tagIg:ArticleSubTag[];
  modifiedDate:Date;
  active:boolean;
}
