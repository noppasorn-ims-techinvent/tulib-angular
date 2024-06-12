export interface Result<T> {
  success: boolean;
  message: string;
  traceId: string;
  data: T;
}
