export interface Job {
  id?: number;
  title: string;
  type: string;
  description?: string;
  location: string;
  salary: string;
  created_at?: string;
  company_id: number;
}
