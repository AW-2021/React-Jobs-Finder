export interface Job {
  id?: number;
  title: string;
  type: string;
  description?: string;
  location: string;
  salary: string;
  created_at?: string;
}

export interface Company {
  id?: number;
  name: string;
  description?: string;
  contact_email: string;
  contact_phone?: string;
  created_at?: string;
}
