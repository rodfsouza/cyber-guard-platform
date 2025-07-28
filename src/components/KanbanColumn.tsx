import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Column, Task } from '@/types';
import { useMemo } from 'react';
import { TaskCard } from './TaskCard';

type KanbanColumnProps = {
  column: Column;
};

export const KanbanColumn = ({ column }: KanbanColumnProps) => {
  const tasksIds = useMemo(() => column.tasks.map((task) => task.id), [column.tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div ref={setNodeRef} className="w-full md:w-1/3 flex flex-col">
      <div className="bg-secondary p-4 rounded-t-lg border-b-2 border-primary">
        <h2 className="text-lg font-semibold">{column.title} ({column.tasks.length})</h2>
      </div>
      <div className="bg-secondary/50 p-2 rounded-b-lg flex-grow">
        <SortableContext items={tasksIds}>
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
