export interface TypeQuestion {
  question: string;
  options?: string[] | null;
  schedule_at: string;
  expire_in: number;
  channel: string;
}
