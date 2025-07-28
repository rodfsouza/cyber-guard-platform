import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskCardProps = {
  task: Task;
};

const priorityVariant = {
  Low: 'secondary',
  Medium: 'default',
  High: 'destructive',
} as const;

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-2 bg-background/70 hover:bg-background">
        <CardHeader className="p-4">
          <CardTitle className="text-base">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
        </CardContent>
      </Card>
    </div>
  );
};
