import { KanbanBoard } from '@/components/KanbanBoard';
import { supabase } from '@/lib/supabase';
import { Task, ColumnId } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw new Error(error.message);
  // This is a temporary fix to get some data. In a real app, you'd create an org for the user.
  if (data && data.length === 0) {
    const { data: orgData } = await supabase.from('organizations').select('id').limit(1);
    if (orgData && orgData.length > 0) {
        const sampleTasks = [
            { title: 'Review Firewall Rules', status: 'To Do', priority: 'High', organization_id: orgData[0].id },
            { title: 'Update Access Control Policy', status: 'In Progress', priority: 'Medium', organization_id: orgData[0].id },
            { title: 'Conduct Phishing Simulation', status: 'To Do', priority: 'Medium', organization_id: orgData[0].id },
            { title: 'Patch Production Servers', status: 'Completed', priority: 'High', organization_id: orgData[0].id },
        ];
        const { data: insertedTasks, error: insertError } = await supabase.from('tasks').insert(sampleTasks).select();
        if (insertError) console.error("Error inserting sample tasks:", insertError);
        return insertedTasks as Task[] || [];
    }
  }
  return data as Task[] || [];
};

const updateTaskStatus = async ({ taskId, status }: { taskId: string; status: ColumnId }) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', taskId)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task status updated!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleTaskStatusChange = (taskId: string, newStatus: ColumnId) => {
    mutation.mutate({ taskId, status: newStatus });
  };

  if (isLoading) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>
            <div className="flex gap-4">
                <Skeleton className="w-1/3 h-[500px]" />
                <Skeleton className="w-1/3 h-[500px]" />
                <Skeleton className="w-1/3 h-[500px]" />
            </div>
        </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      {tasks && <KanbanBoard initialTasks={tasks} onTaskStatusChange={handleTaskStatusChange} />}
    </div>
  );
};

export default Tasks;
