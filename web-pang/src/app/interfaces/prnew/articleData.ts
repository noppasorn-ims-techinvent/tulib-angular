import { ArticleContentDto } from "./articleContent";

export interface articleData {
  title: string;
  description: string;
  url: string;
  thumbnailImage: string;
  author?: string | null;
  tagId: number[];
  active: boolean;
  articleContent : ArticleContentDto;
}
