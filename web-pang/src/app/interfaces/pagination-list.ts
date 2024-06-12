export interface PaginationList<T> {
  total: number;
  page: number;
  size: number;
  content: T[];
}
