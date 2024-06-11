export interface Ticket {
  id?: number;
  title?: string;
  type: string;
  price: number;
  description: string;
  quantity: number;
  promotionId?: number;
}
