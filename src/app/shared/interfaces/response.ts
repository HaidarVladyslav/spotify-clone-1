export interface Response<T> {
  href: string;
  items: T[];
  limit: number;
  offset: number;
  next: string | null;
  prev: string | null;
  total: number;
}