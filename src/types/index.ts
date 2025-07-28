export type Task = {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  description?: string;
  assignee_id?: string;
};

export type ColumnId = 'To Do' | 'In Progress' | 'Completed';

export type Column = {
  id: ColumnId;
  title: string;
  tasks: Task[];
};
