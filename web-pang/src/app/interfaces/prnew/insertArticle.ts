import { ArticleContentDto } from "./articleContent";

export interface insertArticle {
  title: string;
  description: string;
  url: string;
  thumbnailImage: string;
  author?: string | null;
  tagId: number[];
  articleContent : ArticleContentDto;
}
