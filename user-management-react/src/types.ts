export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  job?: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  job?:string;
}

export interface Credentials {
  email: string;
  password: string;
}
export interface RegisterData extends Credentials {
  name?: string; 
}

export interface ApiResponse<T> {
  data: T;
  total_pages?: number;
  page?: number;
}

export type UsersResponse = ApiResponse<User[]>;
