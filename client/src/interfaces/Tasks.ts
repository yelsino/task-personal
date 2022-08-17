export interface Task {
  uid?: string;
  name: string;
  status: boolean;
  user: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
